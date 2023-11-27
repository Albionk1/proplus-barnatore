const Action = require('../models/actionModel')
const ActionCalc = require('../models/actionCalcModel')
const Article = require('../models/articleModel')
const ArticlePrice = require('../models/articlePriceModel')
// const ArticlePriceModel = require('../models/articlePriceModel')
const SupplyCalc = require('../models/supplyCalcModel')
const SalesCalc = require('../models/salesCalcModel')
const mongoose = require('mongoose')
const { nanoid } = require('nanoid')
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
  if(err.message.includes('Cast to ObjectId failed for value "" (type string) at path "unit" because of "BSONError"')){
    errors.unit='Njësia është i zbrazët' 
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
module.exports.getActionArticle=async(req,res)=>{
  try{
     const skip = parseInt(req.query.start)
     const limit = parseInt(req.query.length)
     const search = req.query.search.value
     const action = req.query.action
     const sort = {}

     if (req.query.order[0].column === '0') {
       sort['article.name'] = req.query.order[0].dir === 'asc' ? 1 : -1
     }
      if (req.query.order[0].column === '3') {
        sort['percent'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
   
      const currentDate = new Date(Date.now());
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const day = currentDate.getDate().toString().padStart(2, "0");
       formattedDate = `${year}-${month}-${day}`;
      let filter ={
        $or: [
          { 'article.name': { $regex: search, $options: 'i' }},
          {
            $expr: {
              $regexMatch: {
                input: { $toString: '$price_now_many' }, 
                regex: search.toString(),
                options: 'i'
              }
            }},
            {
                $expr: {
                  $regexMatch: {
                    input: { $toString: '$price_action_many' }, 
                    regex: search.toString(),
                    options: 'i'
                  }
                }},
                {
                  $expr: {
                    $regexMatch: {
                      input: { $toString: '$price_now_few' }, 
                      regex: search.toString(),
                      options: 'i'
                    }
                  }},
                  {
                      $expr: {
                        $regexMatch: {
                          input: { $toString: '$price_action_few' }, 
                          regex: search.toString(),
                          options: 'i'
                        }
                      }},
                {
                    $expr: {
                      $regexMatch: {
                        input: { $toString: '$percent' }, 
                        regex: search.toString(),
                        options: 'i'
                      }
                    }},

        ],
      }
      if(action){
        filter.action=action
      }

   const data = await ActionCalc.find(filter).skip(skip).limit(limit).lean().populate('article','name')
   for (var i = 0; i < data.length; i++) {
     data[i].nr = i + 1 + skip || 1* limit
   }
   const total = await ActionCalc.countDocuments(filter)
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

module.exports.getAction=async(req,res)=>{
  try{
     const skip = parseInt(req.query.start)
     const limit = parseInt(req.query.length)
     const search = req.query.search.value
     const active = req.query.active 
     const unit = req.query.unit 
     const sort = {}

    //  if (req.query.order[0].column === '0') {
    //    sort['article.name'] = req.query.order[0].dir === 'asc' ? 1 : -1
    //  }
    //   if (req.query.order[0].column === '3') {
    //     sort['percent'] = req.query.order[0].dir === 'asc' ? 1 : -1
    //   }
   
      const currentDate = new Date(Date.now());
    
      let filter ={
        $or: [
          { 'article.name': { $regex: search, $options: 'i' }},
          {
            $expr: {
              $regexMatch: {
                input: { $toString: '$price_now_many' }, 
                regex: search.toString(),
                options: 'i'
              }
            }},
            {
                $expr: {
                  $regexMatch: {
                    input: { $toString: '$price_action_many' }, 
                    regex: search.toString(),
                    options: 'i'
                  }
                }},
                {
                  $expr: {
                    $regexMatch: {
                      input: { $toString: '$price_now_few' }, 
                      regex: search.toString(),
                      options: 'i'
                    }
                  }},
                  {
                      $expr: {
                        $regexMatch: {
                          input: { $toString: '$price_action_few' }, 
                          regex: search.toString(),
                          options: 'i'
                        }
                      }},
                {
                    $expr: {
                      $regexMatch: {
                        input: { $toString: '$percent' }, 
                        regex: search.toString(),
                        options: 'i'
                      }
                    }},

        ],
      }
      if(active === 'true'){
        filter.end_time={$gte:currentDate}
      }
      if(active === 'false'){
        
        filter.end_time={$lt:currentDate}
      }
      if(unit && unit !== 'all'){
        filter.unit=unit
      }
   const data = await Action.find(filter).skip(skip).limit(limit).lean().populate()
   for (var i = 0; i < data.length; i++) {
     data[i].nr = i + 1 + skip || 1* limit
   }
   const total = await Action.countDocuments(filter)
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

module.exports.addAction=async(req,res)=>{
  try{
     let {start_time,end_time,unit, beneficiaries} = req.body
     if(start_time) start_time = new Date(start_time)
     if(end_time) end_time = new Date(end_time)
     const action = await Action.create({code:nanoid(12),start_time,end_time,unit, beneficiaries})
     res.status(201).send({status:'success',message:'Aksioni  u shtua me sukses',action:action._id})
  }
  catch(e){
    // console.log(e);
     const errors = handleErrors(e)
     res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}
module.exports.deleteActionArticle=async(req,res)=>{
  try{
        const id = req.body.id
    const actionArticleOnDb = await ActionCalc.findById(id)
    if(!actionArticleOnDb){
    return res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri"})
    }
    let action = await Action.findById(actionArticleOnDb.action).select('active')
     if(action && action.active){
     return res.status(400).send({status:'fail',message:"Artikulli nuk mund të fshihet pasi që aksioni është aktiv"})
     }
    await actionArticleOnDb.deleteOne()
    res.status(200).send({status:'success',message:'Aksioni  u fshi me sukses'})
  }
  catch(e){
      const errors = handleErrors(e)
      console.log(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}

module.exports.activeAction = async(req,res)=>{
  const session = await mongoose.startSession()
  session.startTransaction()
  try{
    const id = req.body.id
    const actionArticleOnDb = await ActionCalc.find({action:id})
    if(actionArticleOnDb.length<1){
    return res.status(400).send({status:'fail',message:"Ky aksion nuk mund të aktivizohet sepse nuk ka asnjë artikull për aksion "})
    }
let price_total =0
let price_action = 0
    for(let i =0;i<actionArticleOnDb.length;i++){
      price_total+=actionArticleOnDb[i].price_now_few?actionArticleOnDb[i].price_now_few:actionArticleOnDb[i].price_now_many
      price_action+=actionArticleOnDb[i].price_action_few?actionArticleOnDb[i].price_action_few:actionArticleOnDb[i].price_action_many
    }
    let percent = ((price_total - price_action) / price_total).toFixed(2) * 100
    const action = await Action.findByIdAndUpdate(id,{$set:{active:true,price_total,price_action,percent,nr_articles:actionArticleOnDb.length},$push:{activity:{action:'aktivizim',updatedBy:req.user._id,}}},{runValidators:true})
    let updates = []
    for(let i =0;i<actionArticleOnDb.length;i++){
      const update={
      }
      if(actionArticleOnDb[i].price_now_few) update.price_few=actionArticleOnDb[i].price_now_few
      if(actionArticleOnDb[i].price_now_many) update.price_many=actionArticleOnDb[i].price_now_many
      if(actionArticleOnDb[i].price_action_few) update.price_few_discount=actionArticleOnDb[i].price_action_few
      if(actionArticleOnDb[i].price_action_many) update.price_many_discount=actionArticleOnDb[i].price_action_many
      if(actionArticleOnDb[i].price_for ==='few') update.discount_date_few_start = action.start_time
      if(actionArticleOnDb[i].price_for ==='many') update.discount_date_many_start = action.start_time
      if(actionArticleOnDb[i].price_for ==='few') update.discount_date_few = action.end_time
      if(actionArticleOnDb[i].price_for ==='many') update.discount_date_many = action.end_time
      if(actionArticleOnDb[i].price_for ==='few') update.target_few = action.beneficiaries
      if(actionArticleOnDb[i].price_for ==='many') update.target_many = action.beneficiaries
      updates.push({
        updateOne: {
          filter: { article: actionArticleOnDb[i].article,unit:action.unit },
          update: {
            $set: update,
          },
        },
      })
    }
    await ArticlePrice.bulkWrite(updates, { session })
    await session.commitTransaction()
    res.status(200).send({status:'success',message:'Aksioni u aktivizua me sukses'})
  }
  catch(e){
    await session.abortTransaction()
    const errors = handleErrors(e)
    console.log(e)
  res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
  finally {
    session.endSession()
  }
}

module.exports.editAction=async(req,res)=>{
  try{
     const {id,start_time,end_time,unit, beneficiaries} = req.body
     const actionOnDb = await Action.findById(id)
     if(!actionOnDb){
      return res.status(400).send({status:'fail',message:'Aksioni nuk egziston'})
     }
     const action = await Action.findByIdAndUpdate(id,{$set:{start_time,end_time,unit, beneficiaries},$push:{activity:{action:'update',updatedBy:req.user._id,}}},{runValidators:true})
     res.status(201).send({status:'success',message:'Aksioni  u përditsua me sukses'})
  }
  catch(e){
     const errors = handleErrors(e)
     res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}

module.exports.deleteAction=async(req,res)=>{
  try{
        const id = req.body.id
      const currentDate = new Date(Date.now());
        let actionCalc
    const actionOnDb = await Action.findByIdAndDelete(id)
    if(!actionOnDb){
    return res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri"})
    }
    const x = currentDate;
const start_time = new Date(actionOnDb.start_time);
const end_time = new Date(actionOnDb.end_time);
    if(actionOnDb.active === true && x >= start_time && x <= end_time){
       actionCalc = await ActionCalc.find({action:id})
    }
    await ActionCalc.deleteMany({action:id})
    if(actionCalc){
   
      let updates =[]
      for(let i =0;i<actionCalc.length;i++){
        let update = {}
        if(actionCalc[i].price_for ==='few') update.price_few_discount ='',update.discount_date_few='',update.target_few=''
        if(actionCalc[i].price_for ==='many') update.price_many_discount ='',update.discount_date_many='',update.target_many=''
     

        updates.push({
          updateOne: {
            filter: { article: actionCalc[i].article,unit:actionOnDb.unit },
            update: {
              $set: update,
            },
          },
        })
      }
    
    await ArticlePrice.bulkWrite(updates)

    }
    res.status(200).send({status:'success',message:'Aksioni  u fshi me sukses'})
  }
  catch(e){
      const errors = handleErrors(e)
      console.log(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}

module.exports.addActionArticle=async(req,res)=>{
  try{
     const {action,barcode,article, price_now_few,price_now_many,price_action_few,price_action_many,percent,price_for} = req.body
     const actionOnDb = await Action.findOne({_id:action,active:false}).select('unit')
if(!actionOnDb){
  return   res.status(200).send({status:'fail',message:'Aksioni nuk egziston ose është aktivizuar'})
}
let articleIds=[]
const actionsOnDb = await Action.find({unit:actionOnDb.unit,start_time:{$gte:actionOnDb.start_time},end_time:{$lte:actionOnDb.end_time}}).select('_id')
for(let i =0;i<actionsOnDb.length;i++){
  articleIds.push(actionsOnDb[i]._id)
}
     const actionCalcOnDb = await ActionCalc.findOne({unit:action.unit,article,price_for,action:{$in:articleIds}})
     if(actionCalcOnDb){
      return   res.status(200).send({status:'fail',message:'Ky artikull tashm ka aksion aktiv për këtë njësi'})
     }
     const actionCalc = await ActionCalc.create({action,barcode,article, price_now_few,price_now_many,price_action_few,price_action_many,percent,price_for})
     res.status(201).send({status:'success',message:'Artikulli u shtua në aksion   me sukses'})
  }
  catch(e){
    // console.log(e);
     const errors = handleErrors(e)
     res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}