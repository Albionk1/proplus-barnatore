const Client = require('../models/clientModel')
const Article = require('../models/articleModel')
const ArticlePrice = require('../models/articlePriceModel')
const Offert = require('../models/offerModel')
const OffertCalc = require('../models/offertCalcModel')
const {nanoid} = require('nanoid')
const mongoose = require('mongoose')
const Sales = require('../models/salesModel')
const SalesCalc = require('../models/salesCalcModel')
const SupplyCalc = require('../models/supplyCalcModel')




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
  if(err.message.includes('Cast to ObjectId failed for value \"\" (type string) at path \"client\" because of \"BSONError\"')){
    errors.client='Zgjedh klientin' 
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


module.exports.getClients=async(req,res)=>{
  try{
     const skip = parseInt(req.query.start)
     const limit = parseInt(req.query.length)
     const search = req.query.search.value
     const sort = {}

     if (req.query.order[0].column === '0') {
       sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
     }
     if (req.query.order[0].column === '1') {
        sort['name'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '2') {
        sort['arbk'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '3') {
        sort['address'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '4') {
        sort['email'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '5') {
        sort['phone_number'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      let filter ={
        $or: [
          { name: { $regex: search, $options: 'i' }},
          { 'arbk': { $regex: search, $options: 'i' } },
          { 'address': { $regex: search, $options: 'i' } },
          { 'email': { $regex: search, $options: 'i' } },
          { 'phone_number': { $regex: search, $options: 'i' } },
        ],
          
      }
   const data = await Client.find(filter).skip(skip).limit(limit).lean()
   for (var i = 0; i < data.length; i++) {
     data[i].nr = i + 1 + skip || 1* limit
   }
   const total = await Client.countDocuments(filter)
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

module.exports.addClient=async(req,res)=>{
  try{
     const {name,arbk,address, email, phone_number} = req.body
     const client = await Client.create({name,arbk,address, email, phone_number})
     res.status(201).send({status:'success',message:'Klienti  u shtua me sukses'})
  }
  catch(e){
     const errors = handleErrors(e)
     res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}
module.exports.editClient=async(req,res)=>{
  try{
     const {id,name,arbk,address, email, phone_number} = req.body
     const clientOnDb = await Client.findById(id)
     if(!clientOnDb){
      return res.status(400).send({status:'fail',message:'Klienti nuk egziston'})
     }
     const article = await Client.findByIdAndUpdate(id,{$set:{name,arbk,address, email, phone_number},$push:{activity:{action:'update',updatedBy:req.user._id,}}},{runValidators:true})
     res.status(201).send({status:'success',message:'Klienti  u përditsua me sukses'})
  }
  catch(e){
     const errors = handleErrors(e)
     res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}

module.exports.deleteClient=async(req,res)=>{
  try{
        const id = req.body.id
    const clientOnDb = await Client.findByIdAndDelete(id)
    if(!clientOnDb){
    return res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri"})
    }
    res.status(200).send({status:'success',message:'Klienti  u fshi me sukses'})
  }
  catch(e){
      const errors = handleErrors(e)
      console.log(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}
module.exports.getArticle=async(req,res)=>{
  try{
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
    const search = req.query.search.value
    const searchType = req.query.searchType
    const unit = req.query.unit
     let filter ={ }
     let filterPrice ={ }
     if(searchType==='barcode'){
        filter ={ 'barcode': { $regex: search, $options: 'i' }}
     }
     if(searchType==='name'){
         filter ={ 'name': { $regex: search, $options: 'i' }}
      }
      if(searchType==='code'){
         filter ={ 'code': { $regex: search, $options: 'i' }}
      }
      if(unit){
       filterPrice.unit= unit
      }
  const data = await Article.findOne(filter).lean()
  if(data){
   filterPrice.article=data._id
   const articlePrice = await ArticlePrice.findOne(filterPrice)
   if(articlePrice){
     data.price_few =articlePrice.price_few
     data.price_many =articlePrice.price_many
   }
  }
  if(data && unit){
    let articleSales= await SalesCalc.find({isOpen:false,unit,article:data._id}).select('qty')
    let articleSupplies= await SupplyCalc.find({isOpen:false,unit,article:data._id}).select('qty')
    let sale_qty = 0;
    let supply_qty = 0;
    articleSupplies.forEach((supply) => {
      supply_qty += supply.qty;
    });
    articleSales.forEach((sale) => {
      sale_qty += sale.qty;
    });
    data.qty =supply_qty- sale_qty
  }
  const total = data.length
  res.json({
    recordsTotal: total ? total : 0,
    recordsFiltered: total? total : 0,
    data:[data],
  })
  }
  catch(e){
     console.log(e)
     res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri"})

  }
}
module.exports.getOfferts=async(req,res)=>{
  try{
    const skip = parseInt(req.query.start)
     const limit = parseInt(req.query.length)
     const search = req.query.search.value
     const offert = req.query.offert
     const sort = {}
     let data =[]
     let total =0

     if (req.query.order[0].column === '0') {
       sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
     }
     if (req.query.order[0].column === '1') {
      sort['article.barcode'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
     if (req.query.order[0].column === '2') {
        sort['article.name'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '3') {
        sort['article.price_many'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '4') {
        sort['qty'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      
      if (req.query.order[0].column === '6') {
        sort['rab_1'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '7') {
        sort['rab_2'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '9') {
        sort['discount'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '10') {
        sort['price'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      let filter ={
        $or: [
          {
            $expr: {
              $regexMatch: {
                input: { $toString: '$article.barcode' }, 
                regex: search.toString(),
                options: 'i'
              }
            }},
            {
              $expr: {
                $regexMatch: {
                  input: { $toString: '$article.name' }, // Convert min_qty to a string
                  regex: search.toString(),
                  options: 'i'
                }
              }},
              {
                $expr: {
                  $regexMatch: {
                    input: { $toString: '$article.price_many' }, // Convert min_qty to a string
                    regex: search.toString(),
                    options: 'i'
                  }
                }},
                {
                  $expr: {
                    $regexMatch: {
                      input: { $toString: '$qty' }, // Convert min_qty to a string
                      regex: search.toString(),
                      options: 'i'
                    }
                  }},
        ],
          
      }
      if(offert){
        filter.offert=offert
    
    data = await OffertCalc.find(filter).skip(skip).limit(limit).populate('article','price_many barcode name').lean()
   for (var i = 0; i < data.length; i++) {
     data[i].nr = i + 1 + skip || 1* limit
   }
    total = await OffertCalc.countDocuments(filter)
  }
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

module.exports.deleteOffert=async(req,res)=>{
  try{
        const id = req.body.id
    const offertOnDb = await Offert.findByIdAndDelete(id)
    if(!offertOnDb){
    return res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri"})
    }
    await OffertCalc.deleteMany({offert:id})
    res.status(200).send({status:'success',message:'Klienti  u fshi me sukses'})
  }
  catch(e){
      const errors = handleErrors(e)
      console.log(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}

module.exports.addOffert=async(req,res)=>{
  try{
    const {unit,date,client,invoice,sell_type} = req.body
     const offert = await Offert.create({unit,date,client,invoice,sell_type,isOpen:true})
     res.status(201).send({status:'success',message:'Oferta  u shtua me sukses',offert:offert._id})
  }
  catch(e){
     const errors = handleErrors(e)
     res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}

module.exports.addOffertArticles=async(req,res)=>{
  const session = await mongoose.startSession()
  session.startTransaction()
  try{
     const {qty,rab_1,rab_2,discount,price_many,article,barcode,offert,total_price,tvsh} = req.body
     const offertOnDb = await Offert.findById(offert)
     if(!offertOnDb){
     return res.status(400).send({status:'fail',message:"Diqka shkoi gabim, klienti nuk u gjet"})
     }
     const checkDoubleArticle = await OffertCalc.countDocuments({offert,article})
     if(checkDoubleArticle.length>0){
     return res.status(400).send({status:'fail',message:"Ky artikull tashmë egziston në këtë ofert"})
     }
     const offertCalc = new OffertCalc({qty,rab_1,rab_2,discount,price_many,article,barcode,offert,unit:offertOnDb.unit,total_price,tvsh})
     await offertCalc.save({session})
     await session.commitTransaction()
     res.status(201).send({status:'success',message:'Oferta u shtua me sukses'})
  }
  catch(e){
    console.log(e);
    await session.abortTransaction()
     const errors = handleErrors(e)
     res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
  finally {
    session.endSession()
  }
}

module.exports.deleteOfferArticle=async(req,res)=>{
  try{
        const id = req.body.id
    const offertCalcOnDb = await OffertCalc.findById(id)
    if(!offertCalcOnDb){
    return res.status(400).send({status:'fail',message:"Ky artikull nuk egziston në ofert"})
    }
    const offert = await Offert.findOne({_id:offertCalcOnDb.offert}).select('isOpen')
    if(!offert||!offert.isOpen){
    return res.status(400).send({status:'fail',message:"Ky artikull nuk mundë të fshihet sepse oferta i tij është mbyllur"})
    }
   await OffertCalc.findOneAndDelete({_id:id})
    res.status(200).send({status:'success',message:'Artikulli u fshi me sukses nga oferta'})
  }
  catch(e){
    console.log(e);
      const errors = handleErrors(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}
module.exports.closeOffert=async(req,res)=>{
  try{
     let {id} = req.body
     const offertOnDb = await Offert.findById(id)
     if(!offertOnDb||!offertOnDb.isOpen){
     return res.status(400).send({status:'fail',message:"Diqka shkoi gabim, furnizimi nuk u gjet ose është i mbyllur"})
     }
     const offertcalc = await OffertCalc.find({offert:offertOnDb._id})
     if(!offertcalc||offertcalc.length<1){
      return res.status(400).send({status:'fail',message:"Oferta nuk mund të mbyllet pasi nuk ka asnjë artikull"})
     }
     let total_price=0
     let total_price_Without_Discount=0
    for(let i =0;i<offertcalc.length;i++){
      total_price = parseFloat(total_price+offertcalc[i].total_price).toFixed(2)
      total_price_Without_Discount = parseFloat(total_price_Without_Discount+offertcalc[i].price_many*offertcalc[i].qty).toFixed(2)
    }
    await Offert.findOneAndUpdate({_id:id},{$set:{isOpen:false,total_price,nr_producs:offertcalc.length,total_price_Without_Discount},$push:{activity:{action:'closed',updatedBy:req.user._id,}}},{runValidators:true})
     res.status(201).send({status:'success',message:'Arikulli  u shtua me sukses në furnizim',})
  }
  catch(e){
    console.log(e)
     const errors = handleErrors(e)
     res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}
module.exports.getArbk=async(req,res)=>{
  try{
    const axios = require('axios');
    const arbk = req.body.arbk
    const url = `https://kerko.com/_next/data/Hh3rwKAWLpvXmP0dQaBgb/rezultate/${arbk}.json?action=rezultate&term=${arbk}`;
    
    axios.get(url)
      .then((response) => {
        // console.log(response); // This will contain the response data from the URL
        res.send(response.data.pageProps.data.business)
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
      });
  }
  catch(e){
    const errors = handleErrors(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }

}
module.exports.getOffertsMain=async(req,res)=>{
  try{
     const skip = parseInt(req.query.start)
     const limit = parseInt(req.query.length)
     const search = req.query.search.value
     const sort = {}
     const unit = req.query.unit
     const date = req.query.date


     if (req.query.order[0].column === '0') {
       sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
     }
     if (req.query.order[0].column === '1') {
      sort['code'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
     if (req.query.order[0].column === '2') {
        sort['client.name'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '3') {
        sort['date'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '4') {
        sort['qty'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      
      if (req.query.order[0].column === '6') {
        sort['discount'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '7') {
        sort['price'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      let filter ={
        $or: [
          {
            $expr: {
              $regexMatch: {
                input: { $toString: '$qty' }, 
                regex: search.toString(),
                options: 'i'
              }
            }},
          { 'code': { $regex: search, $options: 'i' } },
          { 'client.name': { $regex: search, $options: 'i' } },
          { 'date': { $regex: search, $options: 'i' } },
        ],
          
      }
      if(unit &&unit !=='all'){
        filter.unit=unit
      }
      if(date){
        filter.date=date
      }
   const data = await Offert.find(filter).skip(skip).limit(limit).populate('client','name').lean()
   for (var i = 0; i < data.length; i++) {
     data[i].nr = i + 1 + skip || 1* limit
   }
   const total = await Offert.countDocuments(filter)
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

module.exports.offerForSale=async(req,res)=>{
  try{
    const {id} = req.body
    const offertOnDb = await Offert.findById(id)
    if(!offertOnDb){
     return res.status(400).send({status:'fail',message:'Offerta nuk egziston'})
    }
    const offert = await Offert.findByIdAndUpdate(id,{$set:{for_sale:true},$push:{activity:{action:'update',updatedBy:req.user._id,}}},{runValidators:true})
    res.status(201).send({status:'success',message:'Oferta  u vendos për shitje'})
  }
  catch(e){
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri"})
  }
}

module.exports.getOffertsClientHistory=async(req,res)=>{
  try{
     const skip = parseInt(req.query.start)
     const limit = parseInt(req.query.length)
     const search = req.query.search.value
     const sort = {}
     const paid_status = req.query.paid_status
     const client = req.query.client


     if (req.query.order[0].column === '0') {
       sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
     }
     if (req.query.order[0].column === '1') {
      sort['invoice'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
     if (req.query.order[0].column === '2') {
        sort['date'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '3') {
        sort['nr_producs'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '4') {
        sort['total_price_Without_Discount'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      
      if (req.query.order[0].column === '6') {
        sort['total_price_Without_Discount'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '7') {
        sort['total_price'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      let filter ={
        $or: [
          {
            $expr: {
              $regexMatch: {
                input: { $toString: '$total_price_Without_Discount' }, 
                regex: search.toString(),
                options: 'i'
              }
            }},
            {
              $expr: {
                $regexMatch: {
                  input: { $toString: '$total_price' }, 
                  regex: search.toString(),
                  options: 'i'
                }
              }},
              {
                $expr: {
                  $regexMatch: {
                    input: { $toString: '$nr_producs' }, 
                    regex: search.toString(),
                    options: 'i'
                  }
                }},
          { 'invoice': { $regex: search, $options: 'i' } },
          { 'date': { $regex: search, $options: 'i' } },
        ],
          
      }
      
      if(paid_status){
        filter.paid_status=paid_status
      }
      if(client){
        filter.client=client
      }
      let sale = 0;
      let debt = 0;
   const data = await Sales.find(filter).skip(skip).limit(limit).select('date invoice paid_status nr_producs total_price total_price_Without_Discount').lean()
   const sales  = await Sales.find({client}).select('total_price paid_status')
   for (let i = 0; i < data.length; i++) {
     data[i].nr = i + 1 + skip || 1* limit
   }

   for(let i =0;i<sales.length;i++){
    if(sales[i].paid_status===true){
      sale +=sales[i].total_price
    }
    if(sales[i].paid_status===false){
      debt +=sales[i].total_price
    }
   }
   const total = await Sales.countDocuments(filter)
   res.json({
     recordsTotal: total ? total : 0,
     recordsFiltered: total? total : 0,
     data,
     sale:parseFloat(sale).toFixed(2),
     debt:parseFloat(debt).toFixed(2)
   })
  }
  catch(e){
     console.log(e)
     res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri"})

  }
}

module.exports.payClientSale=async(req,res)=>{
  try{
     const id = req.body.id
     const sale = await Sale.findOne({_id:id,paid_status:false,category_sell:"many"})
     if(!sale){
    return res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri"})
     }
     await Sale.findOneAndUpdate({_id:id,paid_status:false,category_sell:"many"},{paid_status:true},{runValidators:true})
  }
  catch(e){
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri"})

  }
}