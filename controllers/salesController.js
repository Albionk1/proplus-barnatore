const Client = require('../models/clientModel')
const Article = require('../models/articleModel')
const ArticlePrice = require('../models/articlePriceModel')
const Sales = require('../models/salesModel')
const SalesCalc = require('../models/salesCalcModel')
const {nanoid} = require('nanoid')
const mongoose = require('mongoose')
const Offert = require('../models/offerModel')
const OffertCalc = require('../models/offertCalcModel')
const Arc = require('../models/arcModel')
const ExpenseCategory = require('../models/expenseCategoryModel')
const Expense = require('../models/expenseModel')
const DeleteSalesCalc = require('../models/deletedSaleCalcModel')
const LoyaltyCard = require('../models/loyaltyCardModel')
const SupplyCalc = require('../models/supplyCalcModel')

const moment = require('moment')


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
  if(err.message.includes('Cast to Boolean failed for value "" (type string) at path "paid_status" because of "CastError"')){
    errors.paid_status='Statusi i pagesës është i zbrazët' 
  }
  if(err.message.includes('Cast to Boolean failed for value "" (type string) at path "sale_status" because of "CastError"')){
    errors.sale_status='Fatura është e zbrazët' 
  }
  return errors
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
module.exports.getSales=async(req,res)=>{
  try{
    const skip = parseInt(req.query.start)
     const limit = parseInt(req.query.length)
     const search = req.query.search.value
     const sale = req.query.sale
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
      if(sale){
        filter.sale=sale
    
    data = await SalesCalc.find(filter).skip(skip).limit(limit).populate('article','price_many barcode name').lean()
   for (var i = 0; i < data.length; i++) {
     data[i].nr = i + 1 + skip || 1* limit
   }
    total = await SalesCalc.countDocuments(filter)
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

module.exports.deleteSale=async(req,res)=>{
  try{
        const id = req.body.id
    const offertOnDb = await Sales.findByIdAndDelete(id)
    if(!offertOnDb){
    return res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri"})
    }
    await SalesCalc.deleteMany({offert:id})
    res.status(200).send({status:'success',message:'Klienti  u fshi me sukses'})
  }
  catch(e){
      const errors = handleErrors(e)
      console.log(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}

module.exports.addSaleMany=async(req,res)=>{
  try{
    const {unit,date,client,invoice,sell_type,offert} = req.body
     const sale = await Sales.create({unit,date,client,invoice,sell_type,isOpen:true,category_sell:'many'})
     if(offert){
      await Offert.findByIdAndDelete(offert)
      let offertOnDb = await  Offert.countDocuments({_id:offert,isOpen:false})
      if(offertOnDb>0){
       return res.status(400).send({status:'fail',message:"Kjo ofert është ende e hapur"})
      }
      const offertCalc= await  OffertCalc.find({offert:offert})
      const saleCreate=[]
      for(let i =0;i<offertCalc.length;i++){
        saleCreate.push({
          insertOne: {
            document: {
              sale:sale._id,
              barcode:offertCalc[i].barcode,
              unit:offertCalc[i]._id,
              price_many:offertCalc[i].price_many,
              qty:offertCalc[i].qty,
              rab_1:offertCalc[i].rab_1,
              rab_2:offertCalc[i].rab_2,
              discount:offertCalc[i].discount,
              article:offertCalc[i].article,
              total_price:offertCalc[i].total_price,
              tvsh:offertCalc[i].tvsh,
              unit
            },
          },
        })
      }
      
       await SalesCalc.bulkWrite(saleCreate)
      await OffertCalc.deleteMany({offert:offert})
     }
     res.status(201).send({status:'success',message:'SHitja  u hapë me sukses',sale:sale._id})
  }
  catch(e){
     const errors = handleErrors(e)
     res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}

module.exports.addSaleArticles=async(req,res)=>{
  const session = await mongoose.startSession()
  session.startTransaction()
  try{
     const {qty,rab_1,rab_2,discount,price_many,article,barcode,offert,total_price,sale,tvsh} = req.body
     const saleOnDb = await Sales.findById(sale)
     if(!saleOnDb){
     return res.status(400).send({status:'fail',message:"Diqka shkoi gabim, klienti nuk u gjet"})
     }
     const checkDoubleArticle = await SalesCalc.countDocuments({sale:saleOnDb,article})
     if(checkDoubleArticle.length>0){
     return res.status(400).send({status:'fail',message:"Ky artikull tashmë egziston në këtë ofert"})
     }
     const saleOnDbCalc = new SalesCalc({qty,rab_1,rab_2,discount,price_many,article,barcode,offert,unit:saleOnDb.unit,total_price,tvsh,sale,category_sell:'many'})
     await saleOnDbCalc.save({session})
     await session.commitTransaction()
     res.status(201).send({status:'success',message:'Artikulli u shtua me sukses'})
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

module.exports.deleteArticleSale=async(req,res)=>{
  try{
        const id = req.body.id
    const saleCalcOnDb = await SalesCalc.findById(id)
    if(!saleCalcOnDb){
    return res.status(400).send({status:'fail',message:"Ky artikull nuk egziston në shitje"})
    }
    const sale = await Sales.findOne({_id:saleCalcOnDb.sale}).select('isOpen category_sell invoice')
    if(!sale||!sale.isOpen){
    return res.status(400).send({status:'fail',message:"Ky artikull nuk mundë të fshihet sepse oferta i tij është mbyllur"})
    }
    if(sale.category_sell === 'many'){
      await SalesCalc.findOneAndDelete({_id:id})
    }
   if(sale.category_sell === 'few'){
    const arcOnDb = await Arc.findOne({isOpen:true,seller:req.user._id}).select('_id')
      if(!arcOnDb){
        return res.send({status:'fail',message:'Hapeni arkën për të fshir artikullin nga shitja'})
      }
   await SalesCalc.findOneAndDelete({_id:id})
    await DeleteSalesCalc.create({arc:arcOnDb._id,invoice:sale.invoice,sale:sale._id,article:saleCalcOnDb.article,barcode:saleCalcOnDb.barcode,qty:saleCalcOnDb.qty,price_few:saleCalcOnDb.price_few,total_price:saleCalcOnDb.total_price,tvsh:saleCalcOnDb.tvsh,discount:saleCalcOnDb.discount,category_sell:'few',cashier:req.user._id})
   }
    res.status(200).send({status:'success',message:'Artikulli u fshi me sukses nga shitja'})
  }
  catch(e){
    console.log(e);
      const errors = handleErrors(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}
module.exports.closeSale=async(req,res)=>{
  try{
     let {id,paid_status,sale_status} = req.body
     const saleOnDb = await Sales.findById(id)
     if(!saleOnDb||!saleOnDb.isOpen){
     return res.status(400).send({status:'fail',message:"Diqka shkoi gabim, furnizimi nuk u gjet ose është i mbyllur"})
     }
     const salecalc = await SalesCalc.find({sale:saleOnDb._id})
     if(!salecalc||salecalc.length<1){
      return res.status(400).send({status:'fail',message:"Oferta nuk mund të mbyllet pasi nuk ka asnjë artikull"})
     }
     let total_price=0
     let total_price_Without_Discount=0
    for(let i =0;i<salecalc.length;i++){
      total_price = total_price+salecalc[i].total_price
      total_price_Without_Discount = total_price_Without_Discount+salecalc[i].price_many*salecalc[i].qty
    }
    if(sale_status==='primary'){
      sale_status=true
    }
    if(sale_status==='secondary'){
      sale_status=false
    }
    await Sales.findOneAndUpdate({_id:id},{$set:{isOpen:false,total_price:parseFloat(total_price).toFixed(2),nr_producs:salecalc.length,total_price_Without_Discount:parseFloat(total_price_Without_Discount).toFixed(2),paid_status,sale_status},$push:{activity:{action:'closed',updatedBy:req.user._id,}}},{runValidators:true})
    await SalesCalc.updateMany({sale:saleOnDb._id},{isOpen:false})
     res.status(201).send({status:'success',message:'Shitja u përfundua me sukses',})
  }
  catch(e){
    console.log(e);
     const errors = handleErrors(e)
     res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}
module.exports.getArticlePos=async(req,res)=>{
  try{
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
    const search = req.query.search.value
    const searchType = req.query.searchType
    const unit = req.user.unit
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
   }
  }
  const total = data? data.length:0
  res.json({
    recordsTotal: total ? total : 0,
    recordsFiltered: total? total : 0,
    data:data?[data]:[],
  })
  }
  catch(e){
     console.log(e)
     res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri"})

  }
}

module.exports.getSalesPos=async(req,res)=>{
  try{
     const search = req.query.search.value
     const colon = req.query.colon
     const unit = req.query.unit
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
      const sale = await Sales.findOne({colon,  unit:unit?unit:req.user.unit,isOpen:true,cashier:req.user._id }).select('_id').sort({createdAt:-1})
      let filter ={
        $or: [
          { 'article.name': { $regex: search, $options: 'i' }},
          { 'barcode': { $regex: search, $options: 'i' }},
              {
                $expr: {
                  $regexMatch: {
                    input: { $toString: '$price_few' }, // Convert min_qty to a string
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

      if(sale){
        filter.sale=sale._id
    data = await SalesCalc.find(filter).populate('article','price_many barcode name').lean()
   for (var i = 0; i < data.length; i++) {
     data[i].nr = i + 1 
   }
    total = await SalesCalc.countDocuments(filter)
  }
   res.json({
     recordsTotal: total ? total : 0,
     recordsFiltered: total? total : 0,
     data,
     sale:sale?sale._id:''
   })
  }
  catch(e){
     console.log(e)
     res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri"})

  }
}
module.exports.addSalePos=async(req,res)=>{
  const session = await mongoose.startSession()
  session.startTransaction()
  try{
    const {unit,colon,article,barcode,qty,price_few,total_price,tvsh,discount} = req.body
    const arcOnDb = await Arc.findOne({isOpen:true,seller:req.user._id})
      if(!arcOnDb){
        return res.send({status:'fail',message:'Hapeni arkën për të bërë shitje'})
      }
     const saleOnDb = await Sales.findOne({colon,unit:unit?unit:req.user.unit,isOpen:true,cashier:req.user._id}).sort({createdAt:-1})
     if(!saleOnDb){
     const sale = new Sales({unit:unit?unit:req.user.unit,date:moment().format("YYYY-MM-DD"),invoice:nanoid(12),sell_type:'sell',isOpen:true,category_sell:'few',colon,cashier:req.user._id})
     const saleCalc = new SalesCalc({sale:sale._id,article,barcode,qty,price_few,total_price,tvsh,discount,category_sell:'few',unit:unit?unit:req.user.unit})
      await sale.save({session})
      await saleCalc.save({session})

    }
    if(saleOnDb){
      const saleCalc = await SalesCalc.create({sale:saleOnDb._id,article,barcode,qty,price_few,total_price,tvsh,discount,category_sell:'few',unit:saleOnDb.unit})
      await saleCalc.save({session})
    }
     await session.commitTransaction()
     res.status(201).send({status:'success',message:'Shitja  u hapë me sukses'})
  }
  catch(e){
    console.log(e)
    await session.abortTransaction()
     const errors = handleErrors(e)
     res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
  finally {
    session.endSession()
  }
}
module.exports.getArticlesPos = async (req, res) => {
  try {
    const unit = req.user.unit;
    const filterPrice = unit ? { unit: unit } : {};
    const page = parseInt(req.query.page) || 1;
    const totalArticles = await Article.countDocuments({});
    const pageSize = Math.ceil(totalArticles / 6); // Calculate pageSize to cover all articles in 3 pages
    
    // Calculate the number of documents to skip based on the current page
    const skip = (page - 1) * pageSize;
    const articles = await Article.find({}).skip(skip)
    .limit(pageSize).select('_id name barcode code tvsh').lean();

    if (articles.length === 0) {
      return res.json({ data: [] });
    }

    const articleIds = articles.map(article => article._id);

   filterPrice.article={ $in: articleIds } 
    const articlePrices = await ArticlePrice.find(filterPrice).select('article price_few discount_date_few price_few_discount target_few').lean();

    for (const article of articles) {
      for (const price of articlePrices) {
        if (article._id.toString() === price.article.toString()) {
          article.price_few = price.price_few;
          if (price.price_few_discount) {
            article.price_few_discount = price.price_few_discount;
            article.discount_date_few = price.discount_date_few;
            article.target_few = price.target_few;
          }
        }
      }
    }

    res.json({ data: articles });
  } catch (e) {
    console.log(e);
    res.status(400).json({ status: 'fail', message: 'Diqka shkoi gabim provoni përsëri' });
  }
};

module.exports.editSaleArticleQty=async(req,res)=>{
  try{
        const id = req.body.id
        const qty = req.body.qty
    const saleCalcOnDb = await SalesCalc.findById(id)
    if(!saleCalcOnDb){
    return res.status(400).send({status:'fail',message:"Ky artikull nuk egziston në ofert"})
    }
    const sale = await Sales.findOne({_id:saleCalcOnDb.sale}).select('isOpen')
    if(!sale||!sale.isOpen){
    return res.status(400).send({status:'fail',message:"Ky artikull nuk mundë të përditsohet sepse shitja e  tij është mbyllur"})
    }
    let price = parseFloat(saleCalcOnDb.total_price/saleCalcOnDb.qty).toFixed(2)
    let discount = parseFloat(saleCalcOnDb.discount/saleCalcOnDb.qty).toFixed(2)
   await SalesCalc.findOneAndUpdate({_id:id},{qty,total_price:parseFloat(price*qty).toFixed(2),discount:parseFloat(discount*qty).toFixed(2)},{runValidators:true})
    res.status(200).send({status:'success',message:'Artikulli u përditsua me sukses'})
  }
  catch(e){
    console.log(e);
      const errors = handleErrors(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}


module.exports.closeSaleFew=async(req,res)=>{
  try{
     let {sale_status,payment_type,colon,bank,cardUser} = req.body
     const unit = req.user.unit
     const arcOnDb = await Arc.findOne({isOpen:true,seller:req.user._id})
      if(!arcOnDb){
        return res.send({status:'fail',message:'Hapeni arkën për të bërë shitje'})
      }
     const saleOnDb = await Sales.findOne({colon,  unit:unit?unit:req.user.unit,isOpen:true,cashier:req.user._id})
     if(!saleOnDb||!saleOnDb.isOpen){
     return res.status(400).send({status:'fail',message:"Diqka shkoi gabim, shitja nuk u gjet ose është i mbyllur"})
     }
     const salecalc = await SalesCalc.find({sale:saleOnDb._id})
     if(!salecalc||salecalc.length<1){
      return res.status(400).send({status:'fail',message:"Shitja nuk mund të mbyllet pasi nuk ka asnjë artikull"})
     }
     let total_price=0
     let total_price_Without_Discount=0
    for(let i =0;i<salecalc.length;i++){
      total_price += salecalc[i].total_price
      total_price_Without_Discount += salecalc[i].price_few*salecalc[i].qty
    }
    total_price=total_price.toFixed(2)
    total_price_Without_Discount=total_price_Without_Discount.toFixed(2)
    if(sale_status==='primary'){
      sale_status=true
    }
    if(sale_status==='secondary'){
      sale_status=false
    }
    await Sales.findOneAndUpdate({_id:saleOnDb._id},{$set:{isOpen:false,total_price,nr_producs:salecalc.length,total_price_Without_Discount,paid_status:true,sale_status,payment_type,bank,arc:arcOnDb._id,cardUser},$push:{activity:{action:'closed',updatedBy:req.user._id,}}},{runValidators:true})
    await SalesCalc.updateMany({sale:saleOnDb._id},{isOpen:false})
     res.status(201).send({status:'success',message:'Shitja u krye me sukses',})
  }
  catch(e){
    console.log(e);
     const errors = handleErrors(e)
     res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}

module.exports.deleteAllArticle=async(req,res)=>{
  try{
     const id = req.body.id
     const arcOnDb = await Arc.findOne({isOpen:true,seller:req.user._id}).select('_id')
     const createDeleteArticles = []
     if(!arcOnDb){
      return res.send({status:'fail',message:'Hape arkën për ti fshir artikuj në shitje'})
     }
    const saleOnDb = await Sales.findById(id).select('isOpen invoice')
    if(!saleOnDb || saleOnDb.isOpen === false){
      return res.send({status:'fail',message:'Shitja nuk egziston ose është mbyllur'})
    }
    const salesCalc = await SalesCalc.find({sale:id})
    if(salesCalc.length ===0){
      return res.send({status:'fail',message:'Nuk keni asnjë artikull për shitje'})
    }
    for(let i=0;i<salesCalc.length;i++){
      createDeleteArticles.push({
        insertOne: {
          document: {
            arc:arcOnDb._id,
            invoice:saleOnDb.invoice,
            sale:saleOnDb._id,
            article:salesCalc[i].article,
            barcode:salesCalc[i].barcode,
            qty:salesCalc[i].qty,
            price_few:salesCalc[i].price_few,
            total_price:salesCalc[i].total_price,
            tvsh:salesCalc[i].tvsh,
            discount:salesCalc[i].discount,
            category_sell:'few',
            cashier:req.user._id
          },
        },
      })
     }
     await DeleteSalesCalc.bulkWrite(createDeleteArticles)
     await SalesCalc.deleteMany({sale:id})
     res.send({status:'success',message:'Të gjitha artikujt u fshinë nga shitja'})
  }
  catch(e){
    console.log(e);
    const errors = handleErrors(e)
    return res.send({status:'fail',message:'Diqka shkoi gabim provoni përseri',errors})
  }
}

module.exports.openArc=async(req,res)=>{
  try{
     let {startCount} = req.body
    const arcOnDb = await Arc.findOne({isOpen:true,seller:req.user._id})
    if(arcOnDb){
      return res.send({status:'fail',message:'Tashmë një ark është e hapur'})
    }
    const arc = await Arc.create({startCount,seller:req.user._id,date:moment().format('YYYY-MM-D'),unit:req.user.unit})
     res.status(201).send({status:'success',message:'Arka u hapë me sukses',})
  }
  catch(e){
    console.log(e)
     const errors = handleErrors(e)
     res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}

module.exports.addExpenseCategory=async(req,res)=>{
  try{
    let {name} = req.body
const  expenseCategory = await ExpenseCategory.create({name,unit:req.user.unit,user:req.user.full_name,activity:[{action:'add',updatedBy:req.user._id}]})
res.send({status:'success',message:'Kategoria e shpenzimit u shtua me sukses',id:expenseCategory._id})
  }
  catch(e){
    const errors = handleErrors(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}
module.exports.addExpense=async(req,res)=>{
  try{
    let {category,amount,comment} = req.body
    const arcOnDb = await Arc.findOne({isOpen:true,seller:req.user._id})
    if(!arcOnDb){
      return res.send({status:'fail',message:'Hapeni arkën për të shtuar shpenzime'})
    }
    const categoryOnDb=  await ExpenseCategory.findById(category)
    if(!categoryOnDb){
      return res.send({status:'fail',message:'Kjo kategori e shpenzimit nuk egziston'})
    }
const  expense= await Expense.create({category,category_name:categoryOnDb.name,amount,comment,unit:req.user.unit,user:req.user._id,arc:arcOnDb._id,activity:[{action:'add',updatedBy:req.user._id}]})
res.send({status:'success',message:'Shpenzimi u shtua me sukses'})
  }
  catch(e){
    const errors = handleErrors(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}

module.exports.removeExpense=async(req,res)=>{
  try{
    let {id} = req.body
const  expense= await Expense.findByIdAndDelete(id)
res.send({status:'success',message:'Shpenzimi u fshi me sukses'})
  }
  catch(e){
    const errors = handleErrors(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}

module.exports.getExpenses=async(req,res)=>{
  try{
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
     const search = req.query.search.value
     const sort = {}
     let data =[]
     let total =0

     if (req.query.order[0].column === '0') {
       sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
     }
     if (req.query.order[0].column === '1') {
      sort['category_name'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
     if (req.query.order[0].column === '2') {
        sort['amount'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '3') {
        sort['comment'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      let filter ={
        $or: [
          { 'category_name': { $regex: search, $options: 'i' }},
          { 'comment': { $regex: search, $options: 'i' }},
              {
                $expr: {
                  $regexMatch: {
                    input: { $toString: '$amount' }, // Convert min_qty to a string
                    regex: search.toString(),
                    options: 'i'
                  }
                }},
        ],
        unit:req.user.unit,isOpen:true,user:req.user._id
      }
      const expenses = await Expense.find(filter).sort({createdAt:-1}).skip(skip).limit(limit).lean()
      for(let i=0;i<expenses.length;i++){
        expenses[i].nr=i+1+skip*limit
      }

      if(expenses){
        data=expenses
       total = await Expense.countDocuments(filter)
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

module.exports.getSalesArc=async(req,res)=>{
  try{
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
     const search = req.query.search.value
     const sort = {}
     let data =[]
     let total =0
     const arcOnDb = await Arc.findOne({isOpen:true,seller:req.user._id}).select('_id')
     if (req.query.order[0].column === '0') {
       sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
     }
     if (req.query.order[0].column === '1') {
      sort['invoice'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
     if (req.query.order[0].column === '2') {
        sort['updatedAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '3') {
        sort['nr_producs'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '3') {
        sort['total_price'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      let filter ={
        $or: [
          { 'invoice': { $regex: search, $options: 'i' }},
              {
                $expr: {
                  $regexMatch: {
                    input: { $toString: '$nr_producs' }, 
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
        ],
        arc:arcOnDb?arcOnDb._id:''
      }
      const sales = await Sales.find(filter).sort(sort).skip(skip).limit(limit).lean()
      for(let i=0;i<sales.length;i++){
        sales[i].nr=i+1+skip*limit
      }

      if(sales){
        data=sales
       total = await Sales.countDocuments(filter)
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

module.exports.getDeletedArticle = async(req,res)=>{
  try{
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
     const search = req.query.search.value
     const sort = {}
     let data =[]
     let total =0
     const arcOnDb = await Arc.findOne({isOpen:true,seller:req.user._id}).select('_id')
     if (req.query.order[0].column === '0') {
       sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
     }
     if (req.query.order[0].column === '1') {
      sort['invoice'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
     if (req.query.order[0].column === '2') {
        sort['updatedAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '3') {
        sort['nr_producs'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '3') {
        sort['total_price'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      let filter ={
        $or: [
          { 'invoice': { $regex: search, $options: 'i' }},
              {
                $expr: {
                  $regexMatch: {
                    input: { $toString: '$nr_producs' }, 
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
        ],
        arc:arcOnDb?arcOnDb._id:''
      }
      const deleteSalesCalc = await DeleteSalesCalc.find(filter).sort(sort).skip(skip).limit(limit).lean()
      for(let i=0;i<deleteSalesCalc.length;i++){
        deleteSalesCalc[i].nr= i + 1 + skip || 1* limit
      }

      if(deleteSalesCalc){
        data=deleteSalesCalc
       total = await DeleteSalesCalc.countDocuments(filter)
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
module.exports.findLoyaltyCardUsers=async(req,res)=>{
  try{
       const search = req.query.search
       const buyer=await LoyaltyCard.find({$or:[{name: { $regex: search, $options: 'i' }},{phone_number: { $regex: search, $options: 'i' }}]}).limit(5)
       res.send(buyer)
  }
  catch(e){
    console.log(e)
     res.send({status:'fail',message:"Something went wrong try it later"})
  }
}
module.exports.updateArticlePrices=async(req,res)=>{
  try{
    const colon=req.body.colon
    const unit = req.user.unit
    const sale = await Sales.findOne({colon, unit:unit?unit:req.user.unit,isOpen:true,cashier:req.user._id }).select('_id').sort({createdAt:-1})
    if(!sale){
      return res.send({status:'fail',message:'Ju nuk keni hapur shitje'})
    }
    const salesCalc = await SalesCalc.find({sale:sale._id}).select('article qty price_few')
    const articleIds=[]
         for(let i =0 ;i<salesCalc.length;i++){
           articleIds.push(salesCalc[i].article)
         }
         const updates=[]
        const currentDate = new Date();
    const articlePrice = await ArticlePrice.find({unit:req.user.unit,article:{$in:articleIds},price_few_discount: { $ne: null },target_few:'card',discount_date_few_start: { $lte: currentDate },
    discount_date_few: { $gte: currentDate }}).select('article price_few  price_few_discount target_few')
    for(let i =0;i<articlePrice.length;i++){
      for(let a =0;a<salesCalc.length;a++){
      if(salesCalc[a].article.toString()===articlePrice[i].article.toString())  {
        updates.push({
          updateOne: {
            filter: { _id:salesCalc[a]._id },
            update: {
              $set: {
                total_price:parseFloat(articlePrice[i].price_few_discount * salesCalc[a].qty).toFixed(2),
                price_few:articlePrice[i].price_few_discount,
                discount:parseFloat((salesCalc[a].price_few - articlePrice[i].price_few_discount) * salesCalc[a].qty).toFixed(2)
              },
            },
          },
        })
      }
      }
    }
    await SalesCalc.bulkWrite(updates)
    res.send({status:'success',message:'Qmimet u përditsuan'})
  }
  catch(e){
    console.log(e)
     res.send({status:'fail',message:"Something went wrong try it later"})
  }
}
