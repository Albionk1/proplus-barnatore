
const Arc = require('../models/arcModel')
const Expense = require('../models/expenseModel')
const Sales = require('../models/salesModel')
const SaleCals = require('../models/salesCalcModel')
const DeleteSalesCalc = require('../models/deletedSaleCalcModel')


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


module.exports.adminGetArc=async(req,res)=>{
    try{
        const skip = parseInt(req.query.start)
        const limit = parseInt(req.query.length)
         const search = req.query.search.value
         const date = req.query.date
         const unit = req.query.unit
         const sort = {}
         let data =[]
         let total =0
         let arcIds=[]
         targetDate = moment()
 nextDate = targetDate.clone().add(1, 'days')
 if (req.query.order[0].column === '0') {
  sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
}
if (req.query.order[0].column === '1') {
 sort['seller.full_name'] = req.query.order[0].dir === 'asc' ? 1 : -1
}
if (req.query.order[0].column === '2') {
   sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
 }
 if (req.query.order[0].column === '3') {
   sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
 }
 if (req.query.order[0].column === '4') {
   sort['startCount'] = req.query.order[0].dir === 'asc' ? 1 : -1
 }
 
 if (req.query.order[0].column === '9') {
   sort['isOpen'] = req.query.order[0].dir === 'asc' ? 1 : -1
 }

 let filter ={
  $or: [
    {
      $expr: {
        $regexMatch: {
          input: { $toString: '$startCount' }, 
          regex: search.toString(),
          options: 'i'
        }
      }},
      {'seller.full_name': { $regex: search, $options: 'i' }},

  ],
}
         if(date && unit){
          targetDate = moment(date, 'YYYY-MM-DD');
 nextDate = targetDate.clone().add(1, 'days')
          filter.createdAt= {
            $gte: targetDate.toDate(),
            $lt: nextDate.toDate(),
          }
          filter.unit=unit
          data = await Arc.find(filter)
          .populate('seller', 'full_name')
          .lean() // Use .lean() to convert to plain JavaScript objects
          .skip(skip)
          .limit(limit)
          .sort(sort);
      total=await Arc.countDocuments(filter)
         }
         if(!date && unit){
          data = await Arc.find({isOpen:true,unit})
          .populate('seller', 'full_name')
          .lean() // Use .lean() to convert to plain JavaScript objects
          .skip(skip)
          .limit(limit)
          .sort(sort);
      total=await Arc.countDocuments({isOpen:true,unit})
         }
for(let i =0;i<data.length;i++){
    data[i].nr = i + 1 + skip || 1* limit
    arcIds.push(data[i]._id)
}
const sales = await Sales.find({arc:{$in:arcIds}})
const expences = await Expense.find({arc:{$in:arcIds}}).select('amount arc')
for(let i=0;i<data.length;i++){
    let sells_cash = 0
    let sells_bank = 0
    for(let a = 0;a<sales.length;a++){
        if (sales[a].arc.toString() === data[i]._id.toString()) {
            if (sales[a].payment_type === 'cash') {
                sells_cash+=sales[a].total_price
            }else if (sales[a].payment_type === 'bank') {
                sells_bank += sales[a].total_price;
              }
        }
    }
    data[i].sells_cash = parseFloat(sells_cash).toFixed(2);
    data[i].sells_bank = parseFloat(sells_bank).toFixed(2);
}
for(let i=0;i<data.length;i++){
    let expense = 0
    for(let a = 0;a<expences.length;a++){
        if (expences[a].arc.toString() === data[i]._id.toString()) {
            expense+=expences[a].amount
        }
    }
    data[i].expenses = parseFloat(expense).toFixed(2);
}
let activeArc =0
if(unit){
  activeArc =await Arc.countDocuments({
    // createdAt: {
    //   $gte: targetDate.toDate(),
    //   $lt: nextDate.toDate(),
    // }
    isOpen:true,unit})
}

         res.json({
            recordsTotal: total ? total : 0,
            recordsFiltered: total? total : 0,
            data,
            activeArc
          })
    }
    catch(e){
        console.log(e)
        res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri"})
    }
}

module.exports.getArcSales=async(req,res)=>{
  try{
      const skip = parseInt(req.query.start)
      const limit = parseInt(req.query.length)
       const search = req.query.search.value
       const arc = req.query.arc
       const sort = {}
       let data =[]
       let total =0
       if (req.query.order[0].column === '0') {
        sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
      if (req.query.order[0].column === '1') {
       sort['invoice'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }if (req.query.order[0].column === '3') {
        sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
       if (req.query.order[0].column === '4') {
         sort['total_price'] = req.query.order[0].dir === 'asc' ? 1 : -1
       }
      
       let filter ={
        $or: [
          {
            $expr: {
              $regexMatch: {
                input: { $toString: '$total_price' }, 
                regex: search.toString(),
                options: 'i'
              }
            }},
            {'invoice': { $regex: search, $options: 'i' }},
        ],
      }
       if(arc){
      filter.arc=arc
    data = await Sales.find(filter).lean().skip(skip).limit(limit).sort(sort)
    total = await Sales.countDocuments(filter)
       }
       const salesIds=[]
for(let i =0;i<data.length;i++){
  data[i].nr = i + 1 + skip || 1* limit
  salesIds.push(data[i]._id)
}
const saleCals= await SaleCals.aggregate([
  {
    $match: { sale: { $in: salesIds } }
  },
  {
    $group: {
      _id: "$sale",
      totalSum: { $sum: 1 }
    }
  }
])
for(let i =0;i<data.length;i++){
  for(let a =0;a<saleCals.length;a++){
    if(data[i]._id.toString()===saleCals[a]._id.toString()){
      data[i].articles=saleCals[a].totalSum
    }
  }
 

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

module.exports.getArcExpenses=async(req,res)=>{
  try{
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
     const search = req.query.search.value
     const arc = req.query.arc
     const sort = {}
     let data =[]
     let total =0
     if (req.query.order[0].column === '0') {
      sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '1') {
     sort['category_name'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }if (req.query.order[0].column === '3') {
      sort['amount'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '0') {
      sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
     if (req.query.order[0].column === '4') {
       sort['comment'] = req.query.order[0].dir === 'asc' ? 1 : -1
     }

     let filter ={
      $or: [
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$amount' }, 
              regex: search.toString(),
              options: 'i'
            }
          }},
          {'category_name': { $regex: search, $options: 'i' }},
          {'comment': { $regex: search, $options: 'i' }},
      ],
    }
     if(arc){
      filter.arc=arc
      data = await Expense.find(filter).lean().skip(skip).limit(limit).sort(sort)
      total = await Expense.countDocuments(filter)
     }
     for(let i =0;i<data.length;i++){
      data[i].nr = i + 1 + skip || 1* limit
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

module.exports.getArcDeleteSales=async(req,res)=>{
  try{
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
     const search = req.query.search.value
     const arc = req.query.arc
     const sort = {}
     let data =[]
     let total =0
     if (req.query.order[0].column === '0') {
      sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '1') {
     sort['invoice'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }if (req.query.order[0].column === '3') {
      sort['article.name'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '0') {
      sort['qty'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
     if (req.query.order[0].column === '4') {
       sort['total_price'] = req.query.order[0].dir === 'asc' ? 1 : -1
     }

     let filter ={
      $or: [
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
                input: { $toString: '$qty' }, 
                regex: search.toString(),
                options: 'i'
              }
            }},
          {'invoice': { $regex: search, $options: 'i' }},
          {'article.name': { $regex: search, $options: 'i' }},
      ],
    }
     if(arc){
      filter.arc=arc
      data = await DeleteSalesCalc.find(filter).populate('article','name').lean().skip(skip).limit(limit).sort(sort)
      total = await DeleteSalesCalc.countDocuments(filter)
     }
     for(let i =0;i<data.length;i++){
      data[i].nr = i + 1 + skip || 1* limit
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

module.exports.getArcDetailsForClose=async(req,res)=>{
  try{
    const arc = req.body.arc
    let amount_expense =0
    let total_sells =0

    const arcOnDb = await Arc.findOne({_id:arc}).select('startCount isOpen')

    if(!arcOnDb){
      return res.send({status:'fail',message:'Arka nuk egziston'})
    }
    if(arcOnDb.isOpen){
      const expenseDb = await Expense.find({arc:arcOnDb._id}).select('amount')
      const sales = await Sales.find({arc:arcOnDb._id}).select('total_price')
      for(let i =0;i<expenseDb.length;i++){
          amount_expense+=expenseDb[i].amount
      }
      for(let i =0;i<sales.length;i++){
        total_sells+=sales[i].total_price
      }
    }
      res.send({startCount:arcOnDb.startCount,total_sells,amount_expense,equal:parseFloat(arcOnDb.startCount+total_sells-amount_expense).toFixed(2)})
  }
  catch(e){
    console.log(e);
    const errors = handleErrors(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}
module.exports.arcEditStart=async(req,res)=>{
  try{
    const{arc,startCount}=req.body
    const arcOnDb = await Arc.findOne({_id:arc}).select('startCount isOpen')
    if(!arcOnDb){
      return res.send({status:'fail',message:'Arka nuk egziston'})
    }
    if(!arcOnDb.isOpen){
      return res.send({status:'fail',message:'Arka është e mbyllur'})
    }
   await Arc.findOneAndUpdate({_id:arc},{$set:{startCount},$push:{activity:{action:'update startCount',updatedBy:req.user._id,}}},{runValidators:true})
   res.send({status:'success',message:'Arka u përditsua me sukses'})
  }
  catch(e){
    console.log(e)
    const errors = handleErrors(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}
module.exports.closeArc=async(req,res)=>{
  try{
    const{arc,count,comment}=req.body
    const arcOnDb = await Arc.findOne({_id:arc}).select('startCount isOpen')
    let amount_expense =0
    let total_sells =0
    let debt
    if(!arcOnDb){
      return res.send({status:'fail',message:'Arka nuk egziston'})
    }
    if(arcOnDb.isOpen){
      const expenseDb = await Expense.find({arc:arcOnDb._id}).select('amount')
      const sales = await Sales.find({arc:arcOnDb._id}).select('total_price')
      for(let i =0;i<expenseDb.length;i++){
          amount_expense+=expenseDb[i].amount
      }
      for(let i =0;i<sales.length;i++){
        total_sells+=sales[i].total_price
      }
    }else{
      return res.send({status:'fail',message:'Arka është e mbyllur'})
    }

    const closeCount=parseFloat(arcOnDb.startCount+total_sells-amount_expense).toFixed(2)
    debt = parseFloat(closeCount -count).toFixed(2) *-1
   await Arc.findOneAndUpdate({_id:arc},{$set:{isOpen:false,closeCount,debt,count,comment},$push:{activity:{action:'close arc',updatedBy:req.user._id,}}},{runValidators:true})
   res.send({status:'success',message:'Arka u mbyll me sukses'})
  }
  catch(e){
    console.log(e)
    const errors = handleErrors(e)
    res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
  }
}