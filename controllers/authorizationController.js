const { nanoid } = require('nanoid')
const Authorization = require('../models/authorizationModel')
const Unit = require('../models/unitModel')
const moment =require('moment')
const handleErrors = (err) => {
  let errors = {}

  for (var key in err.errors) {
    if (err.errors[key]) {
      errors[key] = err.errors[key].message
    }
  }
  return errors
}

module.exports.getAuthorization=async(req,res)=>{
   try{
      const skip = parseInt(req.query.start)
      const limit = parseInt(req.query.length)
      const search = req.query.search.value
      const sort = {}

      if (req.query.order[0].column === '0') {
        sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '1') {
         sort['token'] = req.query.order[0].dir === 'asc' ? 1 : -1
       }
       if (req.query.order[0].column === '2') {
         sort['start_time'] = req.query.order[0].dir === 'asc' ? 1 : -1
       }
       if (req.query.order[0].column === '3') {
         sort['end_time'] = req.query.order[0].dir === 'asc' ? 1 : -1
       }
       if (req.query.order[0].column === '4') {
         sort['is_active'] = req.query.order[0].dir === 'asc' ? 1 : -1
       }
       if (req.query.order[0].column === '5') {
         sort['comment'] = req.query.order[0].dir === 'asc' ? 1 : -1
       }
       let filter ={
            token: { $regex: search, $options: 'i' },
       }
    const data = await Authorization.find(filter).skip(skip).limit(limit).lean()
    for (var i = 0; i < data.length; i++) {
      data[i].nr = i + 1 + skip || 1* limit
    }
    const total = await Authorization.countDocuments(filter)
    res.json({
      recordsTotal: total ? total : 0,
      recordsFiltered: total? total : 0,
      data,
    })
   }
   catch(e){
      console.log(e)
      res.status(400).send({status:'fail',message:"Something went wrong try it later"})

   }
 }

 module.exports.addAuthorizationCompany=async(req,res)=>{
   try{
      const {start_time,end_time,comment} = req.body
      let start_time_date
      let end_time_date
      if(start_time){
        start_time_date=moment(start_time,'YYYY-MM-DD').toDate()
      }
      if(end_time){
        end_time_date=moment(end_time,'YYYY-MM-DD').toDate()
      }
      const authorization = await Authorization.create({start_time,end_time,comment,token:nanoid(12),start_time_date,end_time_date})
      res.status(201).send({status:'success',message:'Autorizimi u shtua me sukses'})
   }
   catch(e){
      const errors = handleErrors(e)
      res.status(400).send({status:'fail',message:"Something went wrong try it later",errors})
   }
 }
//  module.exports.addAuthorizationUnit=async(req,res)=>{
//   try{
//      const {start_time,end_time,comment} = req.body
//      const authorization = await Authorization.create({start_time,end_time,comment,token:nanoid(12),category:'unit'})
//      res.status(201).send({status:'success',message:'Autorizimi u shtua me sukses'})

//   }
//   catch(e){
//      const errors = handleErrors(e)
//       res.status(400).send({status:'fail',message:"Something went wrong try it later",errors})
//   }
// }

module.exports.deleteAuthorization=async(req,res)=>{
  try{
    const id = req.body.id
    const authorization = await Authorization.findById(id)
    if(!authorization){
     return res.status(400).send({status:'fail',message:'Ky autorizim nuk egziston.'})
    }
    const unit = await Unit.findOne({token:id})

    if(unit){
     return res.status(400).send({status:'fail',message:'Ky autorizim nuk fshihet sepse është në përdorim.'})
    }
    await Authorization.findByIdAndDelete(id)
    res.status(200).send({status:'success',message:'Autorizimi me kod'+authorization.token+'u fshi me sukses'})
  }
  catch(e){
     console.log(e)
     res.status(400).send({status:'fail',message:'Something went wrong'})
  }
}

module.exports.editAuthorization=async(req,res)=>{
  try{
    const{ id,end_time,isActive,comment} = req.body
    const authorization = await Authorization.findById(id)
    if(!authorization){
     return res.status(400).send({status:'fail',message:'Something went wrong'})
    }
    let end_time_date
    if(end_time){
      end_time_date=moment(end_time,'YYYY-MM-DD').toDate()
    }
    await Authorization.findByIdAndUpdate(id,{end_time,isActive,comment,end_time_date},{runValidators:true})
    const unit = await Unit.findOne({token:id})
    if(unit){
      await Unit.findOneAndUpdate({token:id},{status:isActive})
    }
    res.status(200).send({status:'success',message:'Autorizimi me kod'+authorization.token+'u përditsua  me sukses'})
  }
  catch(e){
     console.log(e)
     res.status(400).send({status:'fail',message:'Something went wrong'})
  }
}
