const Client = require('../models/clientModel')
const Article = require('../models/articleModel')
const ArticlePrice = require('../models/articlePriceModel')
const Transfer = require('../models/transferModel')
const TransferCalc = require('../models/transferCalcModel')
const Unit = require('../models/unitModel')
const {nanoid} = require('nanoid')
const mongoose = require('mongoose')
const Supply = require('../models/supplyModel')
const SupplyCalc = require('../models/supplyCalcModel')
const SalesCalc = require('../models/salesCalcModel')
const User = require('../models/userModel')

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
  if(err.message.includes('Cast to ObjectId failed for value "" (type string) at path "unit" because of "BSONError"')){
    errors.unit='Zgjedh njesin' 
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
module.exports.getTransfers=async(req,res)=>{
  try{
    const skip = parseInt(req.query.start)
     const limit = parseInt(req.query.length)
     const search = req.query.search.value
     const transfer = req.query.transfer
     const sort = {}
     let data =[]
     let total =0
     let total_sells =0
     let total_buys =0

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
      if(transfer){
        filter.transfer=transfer
        let transferOnDb = await Transfer.findById(transfer).select('unit unit_for')
   
    const transfers = await TransferCalc.find({transfer}).select('qty article')
    let articleIds=[]
    for(let i =0;i<transfers.length;i++){
      articleIds.push(transfers[i].article)
    }
    const lates_sale = await SalesCalc.aggregate([
      {
        $match: {
          unit: transferOnDb.unit_for,
          article: { $in: articleIds }, 
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: '$article',
          price_few: { $first: '$price_few' }, 
          price_many: { $first: '$price_many' }, 
          createdAt: { $first: '$createdAt' }, 
        },
      },
      {
        $project: {
          _id: 0, 
          article: '$_id', 
          price_few: { $ifNull: ['$price_few', ''] },
          price_many: { $ifNull: ['$price_many', ''] },
          createdAt: 1,
        },
      },
    ])
    const lates_supply = await SupplyCalc.aggregate([
      {
        $match: {
          total_price:{$gt:0},
          unit: transferOnDb.unit_for,
          article: { $in: articleIds }, 
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: '$article',
          price_few: { $first: '$price_few' }, 
          price_many: { $first: '$price_many' }, 
          createdAt: { $first: '$createdAt' }, 
        },
      },
      {
        $project: {
          _id: 0, 
          article: '$_id', 
          price_few: { $ifNull: ['$price_few', ''] },
          price_many: { $ifNull: ['$price_many', ''] },
          createdAt: 1,
        },
      },
    ])
    data = await TransferCalc.find(filter).skip(skip).limit(limit).populate('article','price_many barcode name').lean()
   for (var i = 0; i < data.length; i++) {
     data[i].nr = i + 1 + skip || 1* limit
   }
   for(let i =0;i<transfers.length;i++){
    let currentArticle = transfers[i].article
    console.log(lates_sale)
    const articleSales = lates_sale.find((sale) => sale.article.equals(currentArticle));
    const articleSupplies = lates_supply.find((supply) => supply.article.equals(currentArticle));
    if(articleSales){
      let sell_price=articleSales.price_few?articleSales.price_few:articleSales.price_many
      total_sells +=  sell_price *transfers[i].qty
    }
    if(articleSupplies){
      let buy_price=articleSupplies.price_few?articleSupplies.price_few:articleSupplies.price_many
      total_buys +=buy_price*transfers[i].qty
    } 
  }
    total = await TransferCalc.countDocuments(filter)
  }
   res.json({
     recordsTotal: total ? total : 0,
     recordsFiltered: total? total : 0,
     data,total_sells:parseFloat(total_sells).toFixed(2),total_buys:parseFloat(total_buys).toFixed(2)
   })
  }
  catch(e){
     console.log(e)
     res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri"})

  }
}

module.exports.deleteTransfer=async(req,res)=>{
  try{
        const id = req.body.id
    const transferOnDb = await Transfer.findByIdAndDelete(id)
    if(!transferOnDb){
    return res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri"})
    }
    await TransferCalc.deleteMany({Transfer:id})
    res.status(200).send({status:'success',message:'Levizja interne u fshi me sukses'})
  }
  catch(e){
      const errors = handleErrors(e)
      console.log(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}

module.exports.addTransfer=async(req,res)=>{
  try{
    const {date,unit,code,unit_for,transfer_type,comment} = req.body
     const transfer = await Transfer.create({date,unit,unit_for,code,transfer_type,comment,isOpen:true,incializer_user:req.user._id})
     res.status(201).send({status:'success',message:'Levizja interne  u shtua me sukses',transfer:transfer._id})
  }
  catch(e){
     const errors = handleErrors(e)
     res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}

module.exports.addTransferArticles=async(req,res)=>{
  const session = await mongoose.startSession()
  session.startTransaction()
  try{
     const {qty,article,barcode,transfer,tvsh} = req.body
     const transferOnDb = await Transfer.findById(transfer)
     if(!transferOnDb){
     return res.status(400).send({status:'fail',message:"Diqka shkoi gabim, klienti nuk u gjet"})
     }
     const checkDoubleArticle = await TransferCalc.countDocuments({transferOnDb,article})
     if(checkDoubleArticle.length>0){
     return res.status(400).send({status:'fail',message:"Ky artikull tashmë egziston në këtë ofert"})
     }
     const transferCalc = new TransferCalc({qty,article,barcode,transfer,unit:transferOnDb.unit,tvsh})
     await transferCalc.save({session})
     await session.commitTransaction()
     res.status(201).send({status:'success',message:'Levizja interne u shtua me sukses'})
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

module.exports.deleteTransferArticle=async(req,res)=>{
  try{
        const id = req.body.id
    const transferCalcOnDb = await TransferCalc.findById(id)
    if(!transferCalcOnDb){
    return res.status(400).send({status:'fail',message:"Ky artikull nuk egziston në ofert"})
    }
    const transfer = await Transfer.findOne({_id:transferCalcOnDb.transfer}).select('isOpen')
    if(!transfer||!transfer.isOpen){
    return res.status(400).send({status:'fail',message:"Ky artikull nuk mundë të fshihet sepse levizja interne e tij është mbyllur"})
    }
   await TransferCalc.findOneAndDelete({_id:id})
    res.status(200).send({status:'success',message:'Artikulli u fshi me sukses nga levizja interne'})
  }
  catch(e){
    console.log(e);
      const errors = handleErrors(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}
module.exports.closeTransfer=async(req,res)=>{
  try{
     let {id} = req.body
     const transfertOnDb = await Transfer.findById(id)
     if(!transfertOnDb||!transfertOnDb.isOpen){
     return res.status(400).send({status:'fail',message:"Diqka shkoi gabim, levizja interne nuk u gjet ose është i mbyllur"})
     }
     const transferCalc = await TransferCalc.find({transfer:transfertOnDb._id})
     if(!transferCalc||transferCalc.length<1){
      return res.status(400).send({status:'fail',message:"Levizja interne nuk mund të mbyllet pasi nuk ka asnjë artikull"})
     }
     
    await Transfer.findOneAndUpdate({_id:id},{$set:{isOpen:false,nr_producs:transferCalc.length,status:'waiting'},$push:{activity:{action:'closed',updatedBy:req.user._id,}}},{runValidators:true})
     res.status(201).send({status:'success',message:'Levizja interne  u shtua me sukses'})
  }
  catch(e){
    console.log(e)
     const errors = handleErrors(e)
     res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}

module.exports.rejectTransfer=async(req,res)=>{
  try{
    let {id,reason} = req.body
    const transfertOnDb = await Transfer.findById(id)
    if(!transfertOnDb||transfertOnDb.status !=='waiting'){
      return res.status(400).send({status:'fail',message:"Diqka shkoi gabim, levizja interne nuk u gjet ose është i mbyllur"})
      }
      await Transfer.findOneAndUpdate({_id:id},{$set:{status:'rejected',response_user:req.user._id,comment_rejected:reason},$push:{activity:{action:'rejected',updatedBy:req.user._id,}}},{runValidators:true})
      res.status(201).send({status:'success',message:'Levizja interne  u refuzua',})

  }
  catch(e){
    console.log(e)
    const errors = handleErrors(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}

module.exports.acceptTransfer=async(req,res)=>{
  const session = await mongoose.startSession()
  session.startTransaction()
  try{
    let {id} = req.body
    const transfertOnDb = await Transfer.findById(id)
    if(!transfertOnDb||transfertOnDb.status !=='waiting'){
      return res.status(400).send({status:'fail',message:"Diqka shkoi gabim, levizja interne nuk u gjet ose është i mbyllur"})
      }
      await Transfer.findOneAndUpdate({_id:id},{$set:{status:'completed'},$push:{activity:{action:'completed',updatedBy:req.user._id,response_user:req.user._id}}},{runValidators:true,session})
      // if(transfertOnDb.transfer_type==='request'){
        const transferCalc= await  TransferCalc.find({transfer:id})
        let nr_product_total =0
        for(let i=0;i<transferCalc.length;i++){
          nr_product_total+=transferCalc[i].qty
        }
        const supply = new Supply({unit:transfertOnDb.unit_for,date:transfertOnDb.date,supplier:transfertOnDb.unit,invoice:'Levizje interne',buy_type:'exchange',code:nanoid(12),isOpen:false, total_price:0,nr_producs:nr_product_total})
        await supply.save({session})
        const supplyNegative = new Supply({unit:transfertOnDb.unit,date:transfertOnDb.date,supplier:transfertOnDb.unit,invoice:'Levizje interne',buy_type:'exchange',code:nanoid(12),isOpen:false, total_price:0,nr_producs:nr_product_total})
        await supplyNegative.save({session})
        const SupplyCalcCreate=[]
        const SupplyCalcCreateNegative=[]
        for(let i =0;i<transferCalc.length;i++){
          SupplyCalcCreate.push({
            insertOne: {
              document: {
                supply:supply._id,
                barcode:transferCalc[i].barcode,
                price_many:0,
                price_few:0,
                mazh:0,
                price:0,
                qty:transferCalc[i].qty,
                rab_1:0,
                rab_2:0,
                discount:0,
                article:transferCalc[i].article,
                total_price:0,
                tvsh:0,
                unit:transfertOnDb.unit_for,
                isOpen:false
              },
            },
          })
          SupplyCalcCreateNegative.push({
            insertOne: {
              document: {
                supply:supplyNegative._id,
                barcode:transferCalc[i].barcode,
                price_many:0,
                price_few:0,
                mazh:0,
                price:0,
                qty:-transferCalc[i].qty,
                rab_1:0,
                rab_2:0,
                discount:0,
                article:transferCalc[i].article,
                total_price:0,
                tvsh:0,
                unit:transfertOnDb.unit,
                isOpen:false
              },
            },
          })
        }
         await SupplyCalc.bulkWrite(SupplyCalcCreate,{session})
         await SupplyCalc.bulkWrite(SupplyCalcCreateNegative,{session})
      //  }
      //  if(transfertOnDb.transfer_type==='transfer'){
      //   const transferCalc= await  TransferCalc.find({transfer:id})
      //   const supply = new Supply({unit:transfertOnDb.unit_for,date:transfertOnDb.date,supplier:transfertOnDb.unit,invoice:'Levizje interne',buy_type:'vendore',code:nanoid(12),isOpen:true})
      //   await supply.save({session})
      //   const supplyNegative = new Supply({unit:transfertOnDb.unit,date:transfertOnDb.date,supplier:transfertOnDb.unit,invoice:'Levizje interne',buy_type:'vendore',code:nanoid(12),isOpen:true})
      //   await supplyNegative.save({session})
      //   const SupplyCalcCreate=[]
      //   const SupplyCalcCreateNegative=[]
      //   for(let i =0;i<transferCalc.length;i++){
      //     SupplyCalcCreate.push({
      //       insertOne: {
      //         document: {
      //           supply:supply._id,
      //           barcode:transferCalc[i].barcode,
      //           price_many:0,
      //           price_few:0,
      //           mazh:0,
      //           price:0,
      //           qty:-transferCalc[i].qty,
      //           rab_1:0,
      //           rab_2:0,
      //           discount:0,
      //           article:transferCalc[i].article,
      //           total_price:0,
      //           tvsh:0,
      //           unit:transfertOnDb.unit_for
      //         },
      //       },
      //     })
      //     SupplyCalcCreateNegative.push({
      //       insertOne: {
      //         document: {
      //           supply:supplyNegative._id,
      //           barcode:transferCalc[i].barcode,
      //           price_many:0,
      //           price_few:0,
      //           mazh:0,
      //           price:0,
      //           qty:transferCalc[i].qty,
      //           rab_1:0,
      //           rab_2:0,
      //           discount:0,
      //           article:transferCalc[i].article,
      //           total_price:0,
      //           tvsh:0,
      //           unit:transfertOnDb.unit
      //         },
      //       },
      //     })
      //   }
      //    await SupplyCalc.bulkWrite(SupplyCalcCreate,{session})
      //    await SupplyCalc.bulkWrite(SupplyCalcCreateNegative,{session})
      //  }
       await session.commitTransaction()
      res.status(201).send({status:'success',message:'Levizja interne  u refuzua'})
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

module.exports.getTransferRequest=async(req,res)=>{
  try{
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
     const search = req.query.search.value
     let unit = req.query.unit
     const sort = {}
     let data =[]
     let total =0
     if (req.query.order[0].column === '0') {
       sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
     }
     if (req.query.order[0].column === '1') {
      sort['unit_name'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
     if (req.query.order[0].column === '2') {
        sort['name'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '3') {
        sort['nr_producs'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '3') {
        sort['total_price'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      let uniti = []
      if (req.user && req.user.role === 'managment') {
        uniti = await Unit.find({ _id: { $in: [req.user.units] } }).select('_id unit_name')
      }
      if (req.user && req.user.role === 'superadmin' || req.thana) {
        uniti = await Unit.find().select('_id unit_name')
      }
      const unitIds=[]
      for(let i =0;i<uniti.length;i++){
          unitIds.push(uniti[i]._id)
      }
      const filter={ isOpen:false,
          unit:{$in:unitIds},
          transfer_type:'request',
          status:'waiting'}
          let  requestTotal = await Transfer.countDocuments(filter)

      let filterArticle ={
        isOpen:false,
        unit,
        transfer_type:'request',
        status:'waiting'
      }
      if(search){
        // const unitIds=[]
        const userIds=[]
        // const units = await Unit.find({'unit_name': { $regex: search, $options: 'i' }}).select('_id')
        const users = await User.find({'full_name': { $regex: search, $options: 'i' },role:{$in:['superadmin','managment']}}).select('_id')
        // for(let i=0;i<units.length;i++){
        //   unitIds.push(units[i]._id)
        // }
        for(let i=0;i<users.length;i++){
          userIds.push(users[i]._id)
        }
        filterArticle.$or = [
          // { 'unit': { $in:unitIds}},
          { 'incializer_user':{ $in:userIds}},
          {'comment': { $regex: search, $options: 'i' }},
          {'date': { $regex: search, $options: 'i' }},
          {
            $expr: {
              $regexMatch: {
                input: { $toString: '$nr_producs' }, 
                regex: search.toString(),
                options: 'i'
              }
            }},
        ];
      }
      if(unit){
        data = await Transfer.find(filterArticle).lean().select('unit unit_name comment date nr_producs incializer_user full_name').populate('unit','unit_name').populate('incializer_user','full_name').skip(skip).limit(limit)
        total = await Transfer.countDocuments(filterArticle)
        for(let i =0;i<data.length;i++){
          data[i].nr=i+1+skip||1*limit
        }
      }
      res.json({
        recordsTotal: total ? total : 0,
        recordsFiltered: total? total : 0,
        data,
        requestTotal
      })
  }
  catch(e){
    console.log(e)
      const errors = handleErrors(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}
module.exports.getTransferTransfer=async(req,res)=>{
  try{
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
     const search = req.query.search.value
     let unit = req.query.unit
     const sort = {}
     let data =[]
     let total =0
     if (req.query.order[0].column === '0') {
       sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
     }
     if (req.query.order[0].column === '1') {
      sort['unit_name'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
     if (req.query.order[0].column === '2') {
        sort['name'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '3') {
        sort['nr_producs'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '3') {
        sort['total_price'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      let uniti = []
      if (req.user && req.user.role === 'managment') {
        uniti = await Unit.find({ _id: { $in: [req.user.units] } }).select('_id unit_name')
      }
      if (req.user && req.user.role === 'superadmin' || req.thana) {
        uniti = await Unit.find().select('_id unit_name')
      }
      const unitIds=[]
      for(let i =0;i<uniti.length;i++){
          unitIds.push(uniti[i]._id)
      }
      const filter={ isOpen:false,
          unit:{$in:unitIds},
          transfer_type:'transfer',
          status:'waiting'}
          let  transferTotal = await Transfer.countDocuments(filter)

      let filterArticle ={
        isOpen:false,
        unit,
        transfer_type:'transfer',
        status:'waiting'
      }
      if(search){
        // const unitIds=[]
        const userIds=[]
        // const units = await Unit.find({'unit_name': { $regex: search, $options: 'i' }}).select('_id')
        const users = await User.find({'full_name': { $regex: search, $options: 'i' },role:{$in:['superadmin','managment']}}).select('_id')
        // for(let i=0;i<units.length;i++){
        //   unitIds.push(units[i]._id)
        // }
        for(let i=0;i<users.length;i++){
          userIds.push(users[i]._id)
        }
        filterArticle.$or = [
          // { 'unit': { $in:unitIds}},
          { 'incializer_user':{ $in:userIds}},
          {'code': { $regex: search, $options: 'i' }},
          {'comment': { $regex: search, $options: 'i' }},
          {'date': { $regex: search, $options: 'i' }},
          {
            $expr: {
              $regexMatch: {
                input: { $toString: '$nr_producs' }, 
                regex: search.toString(),
                options: 'i'
              }
            }},
        ];
      }
      if(unit){
        data = await Transfer.find(filterArticle).lean().select('unit unit_name comment date nr_producs incializer_user full_name code').populate('unit','unit_name').populate('incializer_user','full_name').skip(skip).limit(limit)
        total = await Transfer.countDocuments(filterArticle)
        for(let i =0;i<data.length;i++){
          data[i].nr=i+1+skip||1*limit
        }
      }
      res.json({
        recordsTotal: total ? total : 0,
        recordsFiltered: total? total : 0,
        data,
        transferTotal
      })
  }
  catch(e){
    console.log(e)
      const errors = handleErrors(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}

module.exports.getTransferCompleted=async(req,res)=>{
  try{
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
     const search = req.query.search.value
     let unit = req.query.unit
     const sort = {}
     let data =[]
     let total =0
     if (req.query.order[0].column === '0') {
       sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
     }
     if (req.query.order[0].column === '1') {
      sort['unit_name'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
     if (req.query.order[0].column === '2') {
        sort['name'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '3') {
        sort['nr_producs'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '3') {
        sort['total_price'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      let uniti = []
      if (req.user && req.user.role === 'managment') {
        uniti = await Unit.find({ _id: { $in: [req.user.units] } }).select('_id unit_name')
      }
      if (req.user && req.user.role === 'superadmin' || req.thana) {
        uniti = await Unit.find().select('_id unit_name')
      }
      const unitIds=[]
      for(let i =0;i<uniti.length;i++){
          unitIds.push(uniti[i]._id)
      }
      let filterArticle ={
        isOpen:false,
        status:'completed',
        $or: [
          { unit },
          { unit_for: unit },
        ],
      }
      if(search){
        const unitIds=[]
        const userIds=[]
        const units = await Unit.find({'unit_name': { $regex: search, $options: 'i' }}).select('_id')
        const users = await User.find({'full_name': { $regex: search, $options: 'i' },role:{$in:['superadmin','managment']}}).select('_id')
        for(let i=0;i<units.length;i++){
          unitIds.push(units[i]._id)
        }
        for(let i=0;i<users.length;i++){
          userIds.push(users[i]._id)
        }
        filterArticle.$or.push({ 'unit': { $in:unitIds}},
        { 'unit_for': { $in:unitIds}},
        { 'incializer_user':{ $in:userIds}},
        { 'response_user':{ $in:userIds}},
        {'code': { $regex: search, $options: 'i' }},
        {'comment': { $regex: search, $options: 'i' }},
        {'date': { $regex: search, $options: 'i' }},
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$nr_producs' }, 
              regex: search.toString(),
              options: 'i'
            }
          }},)
          
        ;
      }
      if(unit){
        data = await Transfer.find(filterArticle).lean().select('unit unit_name comment date nr_producs incializer_user full_name unit_for response_user code').populate('unit','unit_name').populate('unit_for','unit_name').populate('incializer_user','full_name').populate('response_user','full_name').skip(skip).limit(limit)
        total = await Transfer.countDocuments(filterArticle)
        for(let i =0;i<data.length;i++){
          data[i].nr=i+1+skip||1*limit
        }
      }
      res.json({
        recordsTotal: total ? total : 0,
        recordsFiltered: total? total : 0,
        data
      })
  }
  catch(e){
    console.log(e)
      const errors = handleErrors(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}

module.exports.getTransferReject=async(req,res)=>{
  try{
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
     const search = req.query.search.value
     let unit = req.query.unit
     const sort = {}
     let data =[]
     let total =0
     if (req.query.order[0].column === '0') {
       sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
     }
     if (req.query.order[0].column === '1') {
      sort['unit_name'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
     if (req.query.order[0].column === '2') {
        sort['name'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '3') {
        sort['nr_producs'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '3') {
        sort['total_price'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      let uniti = []
      if (req.user && req.user.role === 'managment') {
        uniti = await Unit.find({ _id: { $in: [req.user.units] } }).select('_id unit_name')
      }
      if (req.user && req.user.role === 'superadmin' || req.thana) {
        uniti = await Unit.find().select('_id unit_name')
      }
      const unitIds=[]
      for(let i =0;i<uniti.length;i++){
          unitIds.push(uniti[i]._id)
      }
      let filterArticle ={
        isOpen:false,
        status:'rejected',
        $or: [
          { unit },
          { unit_for: unit },
        ],
      }
      if(search){
        const unitIds=[]
        const userIds=[]
        const units = await Unit.find({'unit_name': { $regex: search, $options: 'i' }}).select('_id')
        const users = await User.find({'full_name': { $regex: search, $options: 'i' },role:{$in:['superadmin','managment']}}).select('_id')
        for(let i=0;i<units.length;i++){
          unitIds.push(units[i]._id)
        }
        for(let i=0;i<users.length;i++){
          userIds.push(users[i]._id)
        }
        filterArticle.$or.push({ 'unit': { $in:unitIds}},
        { 'unit_for': { $in:unitIds}},
        { 'incializer_user':{ $in:userIds}},
        { 'response_user':{ $in:userIds}},
        {'code': { $regex: search, $options: 'i' }},
        {'comment': { $regex: search, $options: 'i' }},
        {'comment_rejected': { $regex: search, $options: 'i' }},
        {'date': { $regex: search, $options: 'i' }},
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$nr_producs' }, 
              regex: search.toString(),
              options: 'i'
            }
          }},)
          
        ;
      }
      if(unit){
        data = await Transfer.find(filterArticle).lean().select('comment date nr_producs incializer_user full_name response_user code').populate('incializer_user','full_name').populate('response_user','full_name').skip(skip).limit(limit)
        total = await Transfer.countDocuments(filterArticle)
        for(let i =0;i<data.length;i++){
          data[i].nr=i+1+skip||1*limit
        }
      }
      res.json({
        recordsTotal: total ? total : 0,
        recordsFiltered: total? total : 0,
        data
      })
  }
  catch(e){
    console.log(e)
      const errors = handleErrors(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}