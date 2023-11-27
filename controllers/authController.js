const User = require('../models/userModel')
const Thanadev = require('../models/thanadevModel')
const Authorization = require('../models/authorizationModel')
const Politics = require('../models/politicsModel')

const maxAge = 3 * 24 * 60 * 60
const jwt = require('jsonwebtoken')
const Company = require('../models/companyModel')
const Unit = require('../models/unitModel')
const ArticlePrice = require('../models/articlePriceModel')
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge,
  })
}
// const { uploadFile, getFileStream, deleteImage } = require('../aws')

const handleErrors = (err) => {
  let errors = {}
  // incorrect email in login form
  if (err.message === 'incorrect username') {
    errors.error = 'Emri i përdoruesit ose fjalëkalimi është gabim'
    return errors
  }
  if (err.message === 'incorrect email') {
    errors.error = 'Adresa elektronike ose fjalëkalimi është gabim'
    return errors
  }
  if (err.message === 'access') {
    errors.error = 'Ju nuk keni autorizim për tu kyqur'
    return errors
  }
  if (err.message === 'expire abonim') {
    errors.error = 'Pakoja juaj ka skadur'
    return errors
  }
  // incorrect password in login form
  if (err.message === 'incorrect password') {
    errors.error = 'Adresa elektronike ose fjalëkalimi është gabim'
    return errors
  }
  if (err.message === 'incorrect password username') {
    errors.error = 'Emri i përdoruesit ose fjalëkalimi është gabim'
    return errors
  }
  if (err.message === 'invalid file') {
    errors.image = 'Fotoja nuk është në formatin e duhur'
    return errors
  }
  if(err.message ==='Cast to ObjectId failed for value "" (type string) at path "_id" for model "Authorization"'){
    errors.token='Autorizimi është i zbrazët'
  }
  if(err.message ==='Cast to ObjectId failed for value "" (type string) at path "_id" for model "Unit"'){
    errors.unit='Njesia është e zbrazët'
  }
  if(err.message=== 'no prices'){
    errors.unit_price ='Kjo njësi nuk ka qmime'
  }
  //duplicate email error
  if (err.code === 11000) {
    if (err.message.includes('email_1')) {
      errors.email = 'Kjo adresë elektronike tashmë egziston'
    }
    if (err.message.includes('username_1')) {
      errors.username = 'Ky emër i përdoruesit tashmë egziston'
    }
    return errors
  }

  //errors in register form checking for errors from userModel

  for (var key in err.errors) {
    if (err.errors[key]) {
      errors[key] = err.errors[key].message
    }
  }
  return errors
}
module.exports.login = async (req, res) => {
    const { username, password } = req.body
    try {  
      const user = await User.login(username, password)
      if (user.isActive !== false) {
        if(user.role ==='pos'){
          const unit = await Unit.countDocuments({_id:user.unit,status:true})
          if(unit<1){
        throw Error('access')
          }
        }
        if(user.role=='managment'){
          const unit = await Unit.countDocuments({_id:{$in:user.units},status:true})
          if(unit<1){
            throw Error('expire abonim')
              }
        }
        if(user.role=='superadmin'){
          const unit = await Unit.countDocuments({status:true})
          if(unit<1){
            throw Error('expire abonim')
              }
        }
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.send({ data: { user } })
      } else {
        throw Error('access')
      }
    } catch (e) {
      console.log(e)
      const errors = handleErrors(e)
      res.status(400).json({ errors })
    }
  }
  module.exports.loginThana = async (req, res) => {
    const { username, password } = req.body
    try {  
      const user = await Thanadev.login(username, password)
      if (user.isActive !== false) {
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.send({ data: { user } })
      } else {
        throw Error('access')
      }
    } catch (e) {
      console.log(e)
      const errors = handleErrors(e)
      res.status(400).json({ errors })
    }
  }

module.exports.updateCompany=async(req,res) =>{
  try{
    const {company_name,address,arbk,phone_number,email,fb,tw,ig,mission_vision} = req.body
    const comp = await Company.findOneAndUpdate({},{company_name,address,arbk,phone_number,email,fb,tw,ig,mission_vision},{runValidators:true})
    res.status(200).send({status:'success',message:'Kompania u përditsua'})
  }
  catch(e){
    const errors = handleErrors(e)
      res.status(400).json({status:'fail', errors })
  }
}

  module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/login')
  }
  module.exports.createUser=async(req,res)=>{
    try{
      const api=Date.now().toString(36) +
      Date.now().toString(36).slice(6, 8) +
      Math.random().toString(36).substr(2, 7)
        const {username,password,businessName,phoneNumber} = req.body
        const user = await User.create({username,password,businessName,phoneNumber,api_key:businessName?businessName.replace(/ /g, '_')+'_'+api:''})
        res.send({status:'success'})
    }
    catch(e){
        const errors = handleErrors(e)
        res.send({errors})
    }
  }

  module.exports.getUnits=async(req,res)=>{
    try{
      try{
        const skip = parseInt(req.query.start)
        const limit = parseInt(req.query.length)
        const search = req.query.search.value
        const sort = {}
  
        if (req.query.order[0].column === '0') {
          sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
        }
        if (req.query.order[0].column === '1') {
           sort['company_name'] = req.query.order[0].dir === 'asc' ? 1 : -1
         }
         if (req.query.order[0].column === '2') {
           sort['unit_name'] = req.query.order[0].dir === 'asc' ? 1 : -1
         }
         if (req.query.order[0].column === '3') {
           sort['address'] = req.query.order[0].dir === 'asc' ? 1 : -1
         }
         let filter ={$or:[
          {unit_name: { $regex: search, $options: 'i' }},
          {address: { $regex: search, $options: 'i' }},
         ]
          
         }
         const comp = await Company.findOne()
      const data = await Unit.find(filter).skip(skip).limit(limit).lean().populate('token','token')
      for (var i = 0; i < data.length; i++) {
        data[i].nr = i + 1 + skip || 1* limit
        data[i].company_name = comp.company_name
      }
      const total = await Unit.countDocuments(filter)
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
    catch(e){
      const errors = handleErrors(e)
      res.status(400).json({status:'fail', errors })
    }
  }

  module.exports.addUnit=async(req,res)=>{
    try{
       const {unit_name,address,token,unit_price}=req.body
       const authorization = await Authorization.findOne({_id:token,isActive:true,used:false})
       let prices
       if(unit_price){
        prices = await ArticlePrice.find({unit:unit_price})
      if(!prices){
        throw Error('no prices')
      }
      }
       if(!authorization){
        return  res.status(400).json({status:'fail', message:'Kjo licenc nuk egziston' })
       }
       const comp = await Company.findOne()
       let status = false
       const currentDate = new Date(Date.now());
       if (authorization.start_time_date<=currentDate &&currentDate <= authorization.end_time_date) {
        status = true
      }
       const unit = await Unit.create({unit_name,address,token,company:comp._id,status})
       const politics= await Politics.create({unit:unit._id,message_few:'empty',message_many:'empty',printer:'empty',message_bill:'empty'})
       await Authorization.findOneAndUpdate({_id:token},{used:true})
       if(unit_price){
        const articlepriceCreate = []
     for(let i=0;i<prices.length;i++){
      articlepriceCreate.push({
        insertOne: {
          document: {
            article:prices[i].article,
            barcode:prices[i].barcode,
            unit:unit._id,
            price_few:prices[i].price_few,
            price_many:prices[i].price_many,
          },
        },
      })
     }
     await ArticlePrice.bulkWrite(articlepriceCreate)
       }
       res.status(201).send({status:'success',message:'Njesia u shtua me sukses'})
    }
    catch(e){
      console.log(e)
      const errors = handleErrors(e)
      res.status(400).json({status:'fail', errors })
    }
  }

  module.exports.editUnit=async(req,res)=>{
    try{
         const {id,unit_name,address}=req.body
         const unitOnDb = await Unit.findById(id)
         if(!unitOnDb){
          return  res.status(400).json({status:'fail', message:'Ky unit nuk egziston' })
         }
       const unit = await Unit.findByIdAndUpdate(id,{unit_name,address})
       res.status(201).send({status:'success',message:'Njesia u përditësua me sukses'})
    }
    catch(e){
      const errors = handleErrors(e)
      res.status(400).json({status:'fail', errors })
    }
  }

  module.exports.addWorker=async(req,res)=>{
    try{
         const {full_name,unit,username,password,role, access,date,phone_number, bank,salary_neto,salary_bruto,regular,comment}=req.body
         if(role !== 'managment') {
         const unitOnDb = await Unit.findById(unit)
         if(!unitOnDb){
          return  res.status(400).json({status:'fail', message:'Ky unit nuk egziston' })
         }
         const worker = await User.create({full_name,unit,username,password,role, access,date,phone_number, bank,salary_neto,salary_bruto,regular,comment})
        
        }else{
          let units = unit.join(',')
         const worker = await User.create({full_name,units,username,password,role, access,date,phone_number, bank,salary_neto,salary_bruto,regular,comment})
        }
       res.status(201).send({status:'success',message:'Puntori u shtua me sukses'})
    }
    catch(e){
      const errors = handleErrors(e)
      res.status(400).json({status:'fail', errors })
    }
  }

  module.exports.editWorker=async(req,res)=>{
    try{
         const {id,full_name,unit,username,password,role, access,date,phone_number, bank,salary_neto,salary_bruto,comment}=req.body
         const user = await User.findById(id)
         if(!user){
          return  res.status(400).json({status:'fail', message:'Ky puntor nuk egziston' })
         }
         if(role !== 'managment') {
         const unitOnDb = await Unit.findById(unit)
         if(!unitOnDb){
          return  res.status(400).json({status:'fail', message:'Ky unit nuk egziston' })
         }
         const worker = await User.findByIdAndUpdate(id,{full_name,unit,username,role, access,date,phone_number, bank,salary_neto,salary_bruto,comment},{runValidators:true})
         if(password){
          worker.password=password
          await worker.save()
         }
        }else{
          let units = unit.join(',')
         const worker = await User.findByIdAndUpdate(id,{full_name,units,username,password,role, access,date,phone_number, bank,salary_neto,salary_bruto,comment},{runValidators:true})
         if(password){
          worker.password=password
          await worker.save()
         }
        }
       res.status(201).send({status:'success',message:'Puntori u përditsua me sukses'})
    }
    catch(e){
      console.log(e)
      const errors = handleErrors(e)
      res.status(400).json({status:'fail', errors })
    }
  }
  //politic controller
  module.exports.getPolitics=async(req,res)=>{
      try{
        const skip = parseInt(req.query.start)
        const limit = parseInt(req.query.length)
        const search = req.query.search.value
        const sort = {}
  
        if (req.query.order[0].column === '0') {
          sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
        }
        if (req.query.order[0].column === '1') {
           sort['keyboard'] = req.query.order[0].dir === 'asc' ? 1 : -1
         }
         if (req.query.order[0].column === '2') {
           sort['message_few'] = req.query.order[0].dir === 'asc' ? 1 : -1
         }
         if (req.query.order[0].column === '3') {
           sort['message_many'] = req.query.order[0].dir === 'asc' ? 1 : -1
         }
         if (req.query.order[0].column === '3') {
          sort['sales_minus'] = req.query.order[0].dir === 'asc' ? 1 : -1
        }
        if (req.query.order[0].column === '3') {
          sort['printer'] = req.query.order[0].dir === 'asc' ? 1 : -1
        }
        if (req.query.order[0].column === '3') {
          sort['message_bill'] = req.query.order[0].dir === 'asc' ? 1 : -1
        }
         let filter ={$or:[
         
          {message_few: { $regex: search, $options: 'i' }},
           {message_many: { $regex: search, $options: 'i' }},
           {printer: { $regex: search, $options: 'i' }},
           {message_bill: { $regex: search, $options: 'i' }},
         ]
          
         }
      const data = await Politics.find(filter).skip(skip).limit(limit).lean().populate('unit','unit_name')
      for (var i = 0; i < data.length; i++) {
        data[i].nr = i + 1 + skip || 1* limit
      }
      const total = await Politics.countDocuments(filter)
      res.json({
        recordsTotal: total ? total : 0,
        recordsFiltered: total? total : 0,
        data,
      })
     }
     catch(e){
        console.log(e)
        res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri"})
     }
   
  }

 
  module.exports.editPolitic=async(req,res)=>{
    try{
         const {id,keyboard,message_few,message_many,sales_minus,printer,message_bill}=req.body
         const politicsOnDb = await Politics.findById(id)
         if(!politicsOnDb){
          return  res.status(400).json({status:'fail', message:'Ky politik nuk egziston' })
         }
       const politics = await Politics.findByIdAndUpdate(id,{$set:{keyboard,message_few,message_many,sales_minus,printer,message_bill},$push:{activity:{action:'update',updatedBy:req.user._id,}}})
       res.status(201).send({status:'success',message:'Politkat u përditësua me sukses'})
    }
    catch(e){
      console.log(e);
      const errors = handleErrors(e)
      res.status(400).json({status:'fail', errors })
    }
  }

  module.exports.getWorkers=async(req,res)=>{
    try{
       const skip = parseInt(req.query.start)
       const limit = parseInt(req.query.length)
       const search = req.query.search.value
       const unit = req.query.unit
       const sort = {}
  
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
        
        let filter ={
          deleted:false,
          role:{$ne:'counter'},
          $or: [
            {full_name: { $regex: search, $options: 'i' }},
            {date: { $regex: search, $options: 'i' }},
            {role: { $regex: search, $options: 'i' }},
            {
              $expr: {
                $regexMatch: {
                  input: { $toString: '$salary_bruto' }, 
                  regex: search.toString(),
                  options: 'i'
                }
              }},
              {
                $expr: {
                  $regexMatch: {
                    input: { $toString: '$salary_neto' }, 
                    regex: search.toString(),
                    options: 'i'
                  }
                }}
                
              ]
        }
        if(unit && unit!=='all'){
          filter.unit=unit
        }
     const data = await User.find(filter).skip(skip).limit(limit).lean().select('full_name role access salary_neto salary_bruto date')
     for (var i = 0; i < data.length; i++) {
       data[i].nr = i + 1 + skip || 1* limit
     }
     const total = await User.countDocuments(filter)
     res.json({
       recordsTotal: total ? total : 0,
       recordsFiltered: total? total : 0,
       data,
     })
    }
    catch(e){
       console.log(e)
       res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri"})
  
    }
  }
  module.exports.getWorkersCount=async(req,res)=>{
    try{
       const skip = parseInt(req.query.start)
       const limit = parseInt(req.query.length)
       const search = req.query.search.value
  
       const sort = {}
  
       if (req.query.order[0].column === '0') {
         sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
       }
       if (req.query.order[0].column === '1') {
          sort['full_name'] = req.query.order[0].dir === 'asc' ? 1 : -1
        }
        if (req.query.order[0].column === '2') {
          sort['username'] = req.query.order[0].dir === 'asc' ? 1 : -1
        }
        if (req.query.order[0].column === '3') {
          sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
        }
        let filter ={
          deleted:false,
          role:'counter',
          $or: [
            {full_name: { $regex: search, $options: 'i' }},
            {username: { $regex: search, $options: 'i' }},   
              ]
        }
     const data = await User.find(filter).skip(skip).limit(limit).lean().sort(sort).select('full_name username createdAt')
     for (var i = 0; i < data.length; i++) {
       data[i].nr = i + 1 + skip || 1* limit
     }
     const total = await User.countDocuments(filter)
     res.json({
       recordsTotal: total ? total : 0,
       recordsFiltered: total? total : 0,
       data,
     })
    }
    catch(e){
       console.log(e)
       res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri"})
  
    }
  }

  module.exports.deleteWorker = async(req,res)=>{
    try{
       const id = req.body.id
       const user = await User.findById(id).select('_id')
       if(!user){
        return res.status(400).send({status:'fail',message:"Ky user nuk egziston ose është fshir më heret"})
       }
       await User.findByIdAndUpdate(id,{$set:{isActive:false,deleted:true},$push:{activity:{action:'delete',updatedBy:req.user._id,}}})
       res.send({status:'success',message:'Puntori u fshi me sukses'})
    }
    catch(e){
      res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri"})
    }
  }