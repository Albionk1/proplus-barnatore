const LoyaltyCard = require('../models/loyaltyCardModel')




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




module.exports.addLoyaltyCard=async(req,res)=>{
  try{
     const {code,name,email,phone_number} = req.body
     const loyaltyCard = await LoyaltyCard.create({code,name,email,phone_number,cashier:req.user._id})
     res.status(201).send({status:'success',message:'Karta e lojalitetit  u shtua me sukses'})
  }
  catch(e){
    // console.log(e);
     const errors = handleErrors(e)
     res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}

module.exports.getLoyaltyCard=async(req,res)=>{
  try{
     const skip = parseInt(req.query.start)
     const limit = parseInt(req.query.length)
     const search = req.query.search.value
     const sort = {}

     if (req.query.order[0].column === '0') {
       sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
     }
     if (req.query.order[0].column === '1') {
        sort['code'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '2') {
        sort['name'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '3') {
        sort['email'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '4') {
        sort['phone_number'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      let filter ={
        $or: [
          { 'code': { $regex: search, $options: 'i' }},
          { 'name': { $regex: search, $options: 'i' }},
          { 'email': { $regex: search, $options: 'i' }},
          { 'phone_number': { $regex: search, $options: 'i' }},
        ],
      }
   const data = await LoyaltyCard.find(filter).skip(skip).limit(limit).lean()
   for (var i = 0; i < data.length; i++) {
     data[i].nr = i + 1 + skip || 1* limit
   }
   const total = await LoyaltyCard.countDocuments(filter)
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

module.exports.deleteLoyaltyCard=async(req,res)=>{
  try{
        const id = req.body.id
    const loyaltyCardOnDb = await LoyaltyCard.findByI(id)
    if(!loyaltyCardOnDb){
    return res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri"})
    }
    const loyaltyCard = await LoyaltyCard.findByIdAndDelete(id)
    res.status(200).send({status:'success',message:'Klienti  u fshi me sukses'})
  }
  catch(e){
      const errors = handleErrors(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}