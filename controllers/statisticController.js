const { nanoid } = require('nanoid')
const Group = require('../models/groupModel')
const SubGroup = require('../models/subGroupModel')
const Zone = require('../models/zoneModel')
const Manufacturer = require('../models/manufacturerModel')
const Article = require('../models/articleModel')
const Unit = require('../models/unitModel')
const SupplyCalc = require('../models/supplyCalcModel')
const moment = require('moment')
const SalesCalc = require('../models/salesCalcModel')
const Supply = require('../models/supplyModel')
const Sales = require('../models/salesModel')
const OwnerInvestment = require('../models/ownerInvestmentModel')
const StrategicInvestment = require('../models/strategicInvestmentModel')
const mongoose = require('mongoose')
const { validMongoId } = require('../utils')
const CategoryOutcome = require('../models/categoryOutcomeModel')

const handleErrors = (err) => {
  let errors = {}

  for (var key in err.errors) {
    if (err.errors[key]) {
      errors[key] = err.errors[key].message
    }
  }
  if(err.message.includes('Cast to ObjectId failed for value "" (type string) at path "category" because of "BSONError')){
    errors.category='Kategoria është e zbrazët' 
  }
  if(err.message.includes('Cast to ObjectId failed for value "" (type string) at path "unit" because of "BSONError')){
    errors.unit='Njesia është e zbrazët' 
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



module.exports.getBuysByMonth=async (req,res)=>{
    try{
      moment.locale('sq')
      if (!req.body.year) {
        return res.status(400).send({ status: 'fail', message: 'Year is empty' })
      }
      if (req.body.year == 'NaN') {
        return res.status(400).send({ status: 'fail', message: 'NaN' })
      }
      let data=[]
      const getMonthlyOutcome = async (year) => {
        let monthlOutcome = []
  
        const promises = []
  
        for (let i = 1; i <= 12; i++) {
          let startDate = moment(`${year}-${i}-01`, 'YYYY-MM-DD')
          let endDate = moment(startDate).add(1, 'months')
          let matchObj = {
            isOpen:false,
  unit:new mongoose.Types.ObjectId(req.body.unit),
  updatedAt: {
              $gte: startDate.toDate(),
              $lt: endDate.toDate(),
            }
          }
          const promise = Promise.all([
            Supply.aggregate([
              {
                $match: matchObj,
              },
              {
                $group: {
                  _id: null,
                  total:  { $sum: '$total_price' }
                },
              },
            ]).exec(),
          ])
          promises.push(promise)
        }
  
        const results = await Promise.all(promises)
  
        for (let i = 0; i < results.length; i++) {
          const resultoutcome = results[i][0]
          let outcomeAmount = resultoutcome[0] ? resultoutcome[0].total : 0
          monthlOutcome.push({
            month: moment().month(i).format('MMMM'),
            profit: outcomeAmount,
          })
        }
  
        return monthlOutcome
      }
        if(req.body.unit){
          data = await getMonthlyOutcome(req.body.year)
        }
  
      res.send({
        data,
      })
    }
    catch(e){
      console.log(e)
      const errors = handleErrors(e)
      res.send({errors})
    }
   }

module.exports.getSalesBuysProfitByMonth=async (req,res)=>{
    try{
      moment.locale('sq')
      if (!req.body.year) {
        return res.status(400).send({ status: 'fail', message: 'Year is empty' })
      }
      if (req.body.year == 'NaN') {
        return res.status(400).send({ status: 'fail', message: 'NaN' })
      }
      let data=[]
      const getMonthlyOutcome = async (year) => {
        let monthlOutcome = []
  
        const promises = []
  
        for (let i = 1; i <= 12; i++) {
          let startDate = moment(`${year}-${i}-01`, 'YYYY-MM-DD')
          let endDate = moment(startDate).add(1, 'months')
          let matchObj = {
            isOpen:false,
  unit:new mongoose.Types.ObjectId(req.body.unit),
  updatedAt: {
              $gte: startDate.toDate(),
              $lt: endDate.toDate(),
            }
          }
          const promise = Promise.all([
            Supply.aggregate([
              {
                $match: matchObj,
              },
              {
                $group: {
                  _id: null,
                  total:  { $sum: '$total_price' }
                },
              },
            ]).exec(),
            Sales.aggregate([
              {
                $match: matchObj,
              },
              {
                $group: {
                  _id: null,
                  total:  { $sum: '$total_price' }
                },
              },
            ]).exec(),
          ])
          promises.push(promise)
        }
  
        const results = await Promise.all(promises)
        for (let i = 0; i < results.length; i++) {
          const resultoutcome = results[i][0]
          const resultoutcome1 = results[i][1]

          let outcomeAmount = resultoutcome[0] ? resultoutcome[0].total : 0
          let outcomeAmount1 = resultoutcome1[0] ? resultoutcome1[0].total : 0
          monthlOutcome.push({
            month: moment().month(i).format('MMMM'),
            supply: outcomeAmount,
            buys: outcomeAmount1,
            // profit: 1,
          })
        }
  
        return monthlOutcome
      }
      if(req.body.unit){
       data = await getMonthlyOutcome(req.body.year)
      }
      res.send({
        data,
      })
    }
    catch(e){
      console.log(e)
      const errors = handleErrors(e)
      res.send({errors})
    }
   }

   module.exports.getSellsByDayAverage = async (req, res) => {
    try {
      moment.locale('sq');
      if (!req.body.year) {
        return res.status(400).send({ status: 'fail', message: 'Year is empty' });
      }
      if (req.body.year == 'NaN') {
        return res.status(400).send({ status: 'fail', message: 'NaN' });
      }
  
      let data = [];
  
      const getAverageSalesByDayOfWeek = async (year) => {
        const startDate = moment(`${year}-01-01`, 'YYYY-MM-DD');
        const endDate = moment(startDate).add(1, 'years');
  
        const matchObj = {
          isOpen: false,
          unit: new mongoose.Types.ObjectId(req.body.unit),
          updatedAt: {
            $gte: startDate.toDate(),
            $lt: endDate.toDate(),
          }
        };
  
        // Aggregate sales data by day of the week
        const result = await Supply.aggregate([
          {
            $match: matchObj,
          },
          {
            $group: {
              _id: { $dayOfWeek: '$updatedAt' }, // Group by day of the week
              total: { $avg: '$total_price' } // Calculate the average of total_price
            },
          },
        ]).exec();
  
        // Create an object to map day of the week to its average sales
        const dayOfWeekToAverageSales = {};
        result.forEach((entry) => {
          const dayOfWeek = entry._id;
          dayOfWeekToAverageSales[dayOfWeek] = entry.total;
        });
  
        // Define the names of the days of the week
        const daysOfWeek = ['E diel', 'E hënë', 'E martë', 'E mërkurë', 'E enjte', 'E premte', 'E shtunë'];
  
        // Create the response data in the desired format
        const averageSalesByDayOfWeek = daysOfWeek.map((day, index) => {
          const averageSales = dayOfWeekToAverageSales[index] || 0;
          return { day, sells: averageSales };
        });
  
        return averageSalesByDayOfWeek;
      };
  
      if (req.body.unit) {
        data = await getAverageSalesByDayOfWeek(req.body.year);
      }
  
      res.send({data});
    } catch (e) {
      console.log(e);
      const errors = handleErrors(e);
      res.send({ errors });
    }
  };

  module.exports.getMostSaledArticles=async(req,res)=>{
    try{
       let unit = req.query.unit
       let year = req.query.year
       let data =[]
       let total =0
        const startDate = moment(`${year}-01-01`, 'YYYY-MM-DD');
        const endDate = moment(startDate).add(1, 'years');       
        if(unit){
          const matchObj = {
            isOpen: false,
            unit: new mongoose.Types.ObjectId(unit),
            updatedAt: {
              $gte: startDate.toDate(),
              $lt: endDate.toDate(),
            }
          };
          data = await SalesCalc.aggregate([
            { $match: matchObj },
            {
              $group: {
                _id: '$article', // Group by article_id
                qty: { $sum: '$qty' }, // Calculate the sum of qty
              },
            },
            { $sort: { qty: -1 } }, // Sort in ascending order to get the least sold first
            { $limit: 10 } // Limit the result to 10 articles
          ]).exec();
          total =data?data.length:0
           let articlesId=[]
           if(data){
          for (var i = 0; i < data.length; i++) {
            articlesId.push(data[i]._id)
            data[i].nr = i + 1 + 1 || 1* 10
          }
          let article = await Article.find({_id:{$in:articlesId}}).select('_id name')
          for(let i =0;i<article.length;i++){
            for(let a =0;a<data.length;a++){
              if(article[i]._id.toString()===data[a]._id.toString()){
            data[i].name = article[i].name
              }
            }
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
        const errors = handleErrors(e)
      res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
    }
  }
  module.exports.getLeastSaledArticles=async(req,res)=>{
    try{
       let unit = req.query.unit
       let year = req.query.year
       let data =[]
       let total =0
        const startDate = moment(`${year}-01-01`, 'YYYY-MM-DD');
        const endDate = moment(startDate).add(1, 'years');       
        if(unit){
          const matchObj = {
            isOpen: false,
            unit: new mongoose.Types.ObjectId(unit),
            updatedAt: {
              $gte: startDate.toDate(),
              $lt: endDate.toDate(),
            }
          };
          data = await SalesCalc.aggregate([
            { $match: matchObj },
            {
              $group: {
                _id: '$article', // Group by article_id
                qty: { $sum: '$qty' }, // Calculate the sum of qty
              },
            },
            { $sort: { qty: 1 } }, // Sort in ascending order to get the least sold first
            { $limit: 10 } // Limit the result to 10 articles
          ]).exec();
          total =data?data.length:0
           let articlesId=[]
           if(data){
          for (var i = 0; i < data.length; i++) {
            articlesId.push(data[i]._id)
            data[i].nr = i + 1 + 1 || 1* 10
          }
          let article = await Article.find({_id:{$in:articlesId}}).select('_id name')
          for(let i =0;i<article.length;i++){
            for(let a =0;a<data.length;a++){
              if(article[i]._id.toString()===data[a]._id.toString()){
            data[i].name = article[i].name
              }
            }
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
        const errors = handleErrors(e)
      res.status(400).send({status:'fail',message:"Diqka shkoi gabim provoni përsëri",errors})
    }
  }


module.exports.createOwnerInvestment = async (req, res) => {
  try {
    const {amount,year,unit} = req.body
    await OwnerInvestment.create({
      amount,
      year,
      unit,
      user: req.user._id,
    })

    res
      .status(201)
      .json({ status: 'success', message: 'Owner investment created' })
  } catch (error) {
    const errors = handleErrors(error)
    res.status(400).send({
      status: 'fail',
      message: 'Bad Request',errors
    })
  }
}

module.exports.getOwnerInvestment = async (req, res) => {
  try{
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
     let unit = req.query.unit
     let year = req.query.year

     const sort = {}
     let data =[]
     let total =0
     if (req.query.order[0].column === '0') {
       sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
     }
     if (req.query.order[0].column === '1') {
      sort['amount'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
     if (req.query.order[0].column === '2') {
        sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
    
      if(unit && year){
        let filter ={
       unit,
       year
        }
        data = await OwnerInvestment.find(filter).lean().select('amount createdAt').skip(skip).limit(limit)
        total = await OwnerInvestment.countDocuments(filter)
        for(let i =0;i<data.length;i++){
          data[i].nr=i+1+skip||1*limit
        }  
      }
      res.json({
        recordsTotal: total ? total : 0,
        recordsFiltered: total? total : 0,
        data,
      })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      status: 'fail',
      message: 'Bad Request',
    })
  }
}

module.exports.editOwnerInvestment = async (req, res) => {
  try {
    if (!validMongoId(req.body.id)) {
      return res
        .status(400)
        .send({ status: 'fail', message: 'Diqka shkoi gabim' })
    }
    const ownerInvestmentToUpdate = await OwnerInvestment.findById(
      req.body.id
    )

    if (!ownerInvestmentToUpdate) {
      return res
        .status(404)
        .send({ status: 'fail', message: 'Investimi i pronarit nuk u gjet' })
    }

    ownerInvestmentToUpdate.amount = req.body.amount
    await ownerInvestmentToUpdate.save()

    res.json({ status: 'success', message: 'Investimi i pronarit u përditsua me sukses' })
  } catch (error) {
    const errors = handleErrors(error)
    res.status(400).send({
      status: 'fail',
      message: 'Bad Request',errors
    })
  }
}

module.exports.deleteOwnerInvestment = async (req, res) => {
  try {
    if (!validMongoId(req.body.id)) {
      return res
        .status(400)
        .send({ status: 'fail', message: 'Diqka shkoi gabim' })
    }
    const ownerInvestmentToDelete = await OwnerInvestment.findById(
      req.body.id
    )

    if (!ownerInvestmentToDelete) {
      return res
        .status(404)
        .send({ status: 'fail', message: 'Investimi nuk u gjet' })
    }
    await ownerInvestmentToDelete.deleteOne()
    res.json({ status: 'success', message: 'Investimi i pronarit u fshi me sukses' })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      status: 'fail',
      message: 'Bad Request',
    })
  }
}

module.exports.createCategory = async(req,res)=>{
  try{
      const {name,type}=req.body
      const categoryOutcome = await CategoryOutcome.create({name,type})
      res.send({status:'success',message:'Kategoria u shtua me sukses',id:categoryOutcome._id})
  }
  catch(e){
    const errors = handleErrors(e)
    res.status(400).send({
      status: 'fail',
      message: 'Bad Request',errors
    })
  }
}
module.exports.getCategory = async (req, res) => {
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
      sort['name'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '2') {
      sort['type'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
     if (req.query.order[0].column === '3') {
        sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
        let filter ={
           'name': { $regex: search, $options: 'i' },
           deleted:false
        }
        data = await CategoryOutcome.find(filter).lean().select('name type createdAt').skip(skip).limit(limit)
        total = await CategoryOutcome.countDocuments(filter)
        for(let i =0;i<data.length;i++){
          data[i].nr=i+1+skip||1*limit
        }  
      
      res.json({
        recordsTotal: total ? total : 0,
        recordsFiltered: total? total : 0,
        data,
      })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      status: 'fail',
      message: 'Bad Request',
    })
  }
}

module.exports.editCategory = async (req, res) => {
  try {
    if (!validMongoId(req.body.id)) {
      return res
        .status(400)
        .send({ status: 'fail', message: 'Diqka shkoi gabim' })
    }
    const categoryOutcome = await CategoryOutcome.findById(
      req.body.id
    )

    if (!categoryOutcome) {
      return res
        .status(404)
        .send({ status: 'fail', message: 'Kategoria nuk u gjet' })
    }

    categoryOutcome.name = req.body.name
    await categoryOutcome.save()

    res.json({ status: 'success', message: 'Kategoria u përditsua me sukses' })
  } catch (error) {
    const errors = handleErrors(error)
    res.status(400).send({
      status: 'fail',
      message: 'Bad Request',errors
    })
  }
}
module.exports.deleteCategory = async (req, res) => {
  try {
    if (!validMongoId(req.body.id)) {
      return res
        .status(400)
        .send({ status: 'fail', message: 'Diqka shkoi gabim' })
    }
    const categoryOutcome = await CategoryOutcome.findById(
      req.body.id
    )

    if (!categoryOutcome) {
      return res
        .status(404)
        .send({ status: 'fail', message: 'Kategoria nuk u gjet' })
    }

    categoryOutcome.deleted = true
    await categoryOutcome.save()

    res.json({ status: 'success', message: 'Kategoria u fshi me sukses' })
  } catch (error) {
    const errors = handleErrors(error)
    res.status(400).send({
      status: 'fail',
      message: 'Bad Request',errors
    })
  }
}

module.exports.addStrategicInvestment = async (req, res) => {
  try {
    const {amount,year,unit,category,note} = req.body
    await StrategicInvestment.create({amount,year,unit,category,note,user: req.user._id})

    res.status(201).json({ status: 'success', message: 'Investimi strategjik u shtua me sukses' })
  } catch (error) {
    const errors = handleErrors(error)
    res.status(400).send({
      status: 'fail',
      message: 'Bad Request',errors
    })
  }}

  module.exports.getStrategicInvestment = async (req, res) => {
    try{
      const skip = parseInt(req.query.start)
      const limit = parseInt(req.query.length)
       let unit = req.query.unit
       let year = req.query.year
  
       const sort = {}
       let data =[]
       let total =0
       if (req.query.order[0].column === '0') {
         sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
       }
       if (req.query.order[0].column === '1') {
        sort['category'] = req.query.order[0].dir === 'asc' ? 1 : -1
      }
       if (req.query.order[0].column === '2') {
          sort['amount'] = req.query.order[0].dir === 'asc' ? 1 : -1
        }
        if (req.query.order[0].column === '3') {
          sort['note'] = req.query.order[0].dir === 'asc' ? 1 : -1
        }if (req.query.order[0].column === '4') {
          sort['user'] = req.query.order[0].dir === 'asc' ? 1 : -1
        }
        if (req.query.order[0].column === '5') {
          sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
        }if (req.query.order[0].column === '6') {
          sort['updatedAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
        }
      
        if(unit && year){
          let filter ={
         unit,
         year
          }
          data = await StrategicInvestment.find(filter).lean().select('amount note user category createdAt updatedAt').populate('user','full_name').populate('category','name').skip(skip).limit(limit)
          total = await StrategicInvestment.countDocuments(filter)
          for(let i =0;i<data.length;i++){
            data[i].nr=i+1+skip||1*limit
          }  
        }
        res.json({
          recordsTotal: total ? total : 0,
          recordsFiltered: total? total : 0,
          data,
        })
    } catch (error) {
      console.log(error)
      res.status(400).send({
        status: 'fail',
        message: 'Bad Request',
      })
    }
  }
  module.exports.editStrategicInvestment = async (req, res) => {
    try {
      if (!validMongoId(req.body.id)) {
        return res
          .status(400)
          .send({ status: 'fail', message: 'Diqka shkoi gabim' })
      }
      const strategicInvestment = await StrategicInvestment.findById(
        req.body.id
      )
  
      if (!strategicInvestment) {
        return res
          .status(404)
          .send({ status: 'fail', message: 'Investimi i pronarit nuk u gjet' })
      }
  
      strategicInvestment.amount = req.body.amount
      await strategicInvestment.save()
  
      res.json({ status: 'success', message: 'Investimi i strategjik u përditsua me sukses' })
    } catch (error) {
      const errors = handleErrors(error)
      res.status(400).send({
        status: 'fail',
        message: 'Bad Request',errors
      })
    }
  }

  module.exports.deleteStrategicInvestment = async (req, res) => {
    try {
      if (!validMongoId(req.body.id)) {
        return res
          .status(400)
          .send({ status: 'fail', message: 'Diqka shkoi gabim' })
      }
      const strategicInvestment = await StrategicInvestment.findById(
        req.body.id
      )
  
      if (!strategicInvestment) {
        return res
          .status(404)
          .send({ status: 'fail', message: 'Investimi strategjik nuk u gjet' })
      }
  
      strategicInvestment.deleted = true
      await strategicInvestment.save()
  
      res.json({ status: 'success', message: 'Investimi strategjik u fshi me sukses' })
    } catch (error) {
      const errors = handleErrors(error)
      res.status(400).send({
        status: 'fail',
        message: 'Bad Request',errors
      })
    }
  }

  module.exports.addOutcome = async (req, res) => {
    try {
      const {amount,year,unit,category} = req.body
      await StrategicInvestment.create({amount,year,unit,category,user: req.user._id})
      res.status(201).json({ status: 'success', message: 'Dalja u shtua me sukses' })
    } catch (error) {
      const errors = handleErrors(error)
      res.status(400).send({
        status: 'fail',
        message: 'Bad Request',errors
      })
    }}

    module.exports.getChartData = async (req, res) => {
      try {
        const {year,unit} = req.body
        const outcomeAggregation = await Outcome.aggregate([
          {
            $match: {
             year,unit
            },
          },
          {
            $lookup: {
              from: 'categories',
              localField: 'category',
              foreignField: '_id',
              as: 'category',
            },
          },
          {
            $unwind: {
              path: '$category',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $group: {
              _id: '$category.name',
              amount: {
                $sum: '$amount',
              },
            },
          },
          {
            $project: {
              _id: {
                $ifNull: ['$_id', 'Pagat e punëtorëve'],
              },
              amount: 1,
            },
          },
          {
            $sort: {
              amount: -1,
            },
          },
        ])
    
        const strategicInvestmentAggregation = await StrategicInvestment.aggregate([
          {
            $match: {
             year,unit
            },
          },
          {
            $lookup: {
              from: 'categories',
              localField: 'category',
              foreignField: '_id',
              as: 'category',
            },
          },
          {
            $unwind: {
              path: '$category',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $group: {
              _id: '$category.name',
              amount: {
                $sum: '$amount',
              },
            },
          },
          {
            $project: {
              _id: {
                $ifNull: ['$_id', 'Pagat e punëtorëve'],
              },
              amount: 1,
            },
          },
          {
            $sort: {
              amount: -1,
            },
          },
        ])
    
        let chartData = [...strategicInvestmentAggregation, ...outcomeAggregation]
        chartData.sort((a, b) => b.amount - a.amount)
    
        res.json({
          data: chartData,
        })
      } catch (e) {
        console.log(e)
    
        res.status(400).json({
          status: 'fail',
          message: 'Bad request',
        })
      }
    }