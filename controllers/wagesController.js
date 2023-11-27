const { nanoid } = require('nanoid')
const Month = require('../models/monthWageModal')
const moment = require('moment')
const mongoose = require('mongoose')
const User = require('../models/userModel')
const Wage = require('../models/WageModal')
const Arc = require('../models/arcModel')


const handleErrors = (err) => {
  let errors = {}

  for (var key in err.errors) {
    if (err.errors[key]) {
      errors[key] = err.errors[key].message
    }
  }
  if(err.message.includes('Cast to ObjectId failed for value "" (type string) at path "group" because of "BSONError')){
    errors.group='Grupi është i zbrazët' 
  }
  if(err.message.includes('Cast to ObjectId failed for value "" (type string) at path "subgroup" because of "BSONError"')){
    errors.subgroup='Nën grupi është i zbrazët' 
  }
  if(err.message.includes('Cast to ObjectId failed for value "" (type string) at path "zone" because of "BSONError"')){
    errors.zone='Zona është e zbrazët' 
  }
  if(err.message.includes('Cast to ObjectId failed for value "" (type string) at path "manufacturer" because of "BSONError"')){
    errors.manufacturer='Prodhuesi është i zbrazët' 
  }
  return errors
}




module.exports.openMonth=async(req,res)=>{
    try{
      const {month,year} = req.body
      const monthy = await Month.findOne({month,year}) 
      if(monthy){
        return res.status(400).json({status:'fail', message:'Ky muaj tashmë është i hapur' })
      }
      await Month.create({month,year})
      res.status(400).json({status:'success', message:'Muaji u hapë me sukses' })
    }
    catch(e){
        const errors = handleErrors(e)
        res.status(400).json({status:'fail', errors })
    }
}
module.exports.getWorkersForWages=async(req,res)=>{
  try{
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
     const search = req.query.search.value
     let unit = req.query.unit
     let year = req.query.year
     let month = req.query.month


     const sort = {}
     let data =[]
     let total =0
     if (req.query.order[0].column === '0') {
       sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
     }
     if (req.query.order[0].column === '1') {
      sort['full_name'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
     if (req.query.order[0].column === '2') {
        sort['role'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '3') {
        sort['access'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '4') {
        sort['salary_neto'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '5') {
        sort['salary_bruto'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '5') {
        sort['date'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if(unit&&year&&month){
            const worker = await User.find({$or:[{unit},{units: { $regex: unit, $options: 'i' }}],role:{$ne:'counter'},deleted:false }).select('_id')
       let workersId = []
       for(let i =0;i<worker.length;i++){
        workersId.push(worker[i]._id)
       }
       const workerWage=[]
       const wages = await Wage.find({worker:{$in:workersId},month,year}).select('worker')
       for(let i =0;i<wages.length;i++){
        workerWage.push(wages[i].worker)
       }
       data=await User.find({
        $and: [
          {
            $or: [{ unit }, { units: { $regex: unit, $options: 'i' } }],
            $or: [
              { 'full_name': { $regex: search, $options: 'i' }},
              { 'role': { $regex: search, $options: 'i' }},
              { 'access': { $regex: search, $options: 'i' }},
            ],
            role:{$ne:'counter'},
            deleted: false,
          },
          {
            _id: { $nin: workerWage },
          },
        ],}).skip(skip).limit(limit).lean()

        for(let i =0;i<data.length;i++){
          data[i].nr = i +1+skip||1*limit
        }
        total= await User.countDocuments({
          $and: [
            {
              $or: [{ unit }, { units: { $regex: unit, $options: 'i' } }],
              $or: [
                { 'full_name': { $regex: search, $options: 'i' }},
                { 'role': { $regex: search, $options: 'i' }},
                { 'access': { $regex: search, $options: 'i' }},
              ],
            role:{$ne:'counter'},
              deleted: false,
            },
            {
              _id: { $nin: workerWage },
            },
          ]})
      }
      res.json({
        recordsTotal: total ? total : 0,
        recordsFiltered: total? total : 0,
        data,
      })
  }
  catch(e){
    console.log(e)
      const errors = handleErrors(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}

module.exports.getWorkersDetails=async(req,res)=>{
  try{
    const {id,year,month} = req.body
    const  worker = await User.findById(id)
    if(!worker){
      return res.send({status:'fail',message:'Gabim ky puntor nuk egziston'})
    }
    let debt =0;
    let debt_payed=0
    const arc = await Arc.find({seller:id,isOpen:false}).select('debt')
    const wages = await Wage.find({worker:id,}).select('debt_payed')
    for(let i =0;i<arc.length;i++){
      debt+=arc[i].debt
    }
    for(let i =0;i<wages.length;i++){
      debt_payed+=wages[i].debt_payed
    }
    let total =debt+debt_payed
   res.send({status:'success',debt:parseFloat(total).toFixed(2)})

  }
  catch(e){
    const errors = handleErrors(e)
    res.status(400).json({status:'fail', errors,message:'Diqka shkoi gabim' })
  }
}

module.exports.payWorker=async(req,res)=>{
  try{
     const {month,year,worker,salary,comment } = req.body
     const monthOnDb = await Month.findOne({year,month})
     if(!monthOnDb){
      return res.send({status:'fail',message:'Nuk keni muaj të hapur'})
     }
    const  workerOnDb = await User.findById(worker).select('salary_neto')
    if(!worker){
      return res.send({status:'fail',message:'Gabim ky puntor nuk egziston'})
    }
    let debt =0;
    let debt_payed=0
    const arc = await Arc.find({seller:worker,isOpen:false}).select('debt')
    const wages = await Wage.find({worker}).select('debt_payed')
    for(let i =0;i<arc.length;i++){
      debt+=arc[i].debt
    }
    for(let i =0;i<wages.length;i++){
      debt_payed+=wages[i].debt_payed
    }
    let total =debt+debt_payed
    let salary_after_debt =parseFloat(workerOnDb.salary_neto- total*-1).toFixed(2)
    const wage = await Wage.create({salary,salary_after_debt,month,year,month_ref:monthOnDb._id,comment,worker,debt_payed:parseFloat(workerOnDb.salary_neto-salary).toFixed(2)})
    res.send({status:'success',message:'Pagesa u krye me sukses'})
  }
  catch(e){
    const errors = handleErrors(e)
    res.status(400).json({status:'fail', errors })
  }
}

module.exports.getWagesDetails=async(req,res)=>{
  try{
    let {unit,year,month} = req.body
    if(unit&&year&&month){
      const worker = await User.find({$or:[{unit},{units: { $regex: unit, $options: 'i' }}],role:{$ne:'counter'},deleted:false}).select('_id')
      let workersId = []
      for(let i =0;i<worker.length;i++){
       workersId.push(worker[i]._id)
      }
      const workerWage=[]
      const wages = await Wage.find({worker:{$in:workersId},month,year}).select('worker salary')
      for(let i =0;i<wages.length;i++){
       workerWage.push(wages[i].worker)
      }
      let user=await User.find({
       $and: [
         {
           $or: [{ unit }, { units: { $regex: unit, $options: 'i' } }],
           deleted: false,
           role:{$ne:'counter'},
         },
         {
           _id: { $nin: workerWage },
         },
       ]}).select('salary_neto regular')
         let total = 0
         let total_regular = 0
         let total_unregular = 0
         let total_given =0
        for(let i =0;i<user.length;i++){
          total += user[i].salary_neto
          if(user[i].regular){
            total_regular += user[i].salary_neto
          }else{
            total_unregular += user[i].salary_neto
          }
        }
        for(let i =0;i<wages.length;i++){
          total_given+=wages[i].salary
        }
      res.send({status:"success",total,total_regular,total_unregular,total_given})
     }else{
      res.send({total:0,total_regular:0,total_unregular:0})
     }
  }
  catch(e){
    const errors = handleErrors(e)
    res.status(400).json({status:'fail', errors })
  }
}