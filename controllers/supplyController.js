const Supplier = require('../models/supplierModel')
const Article = require('../models/articleModel')
const Supply = require('../models/supplyModel')
const SupplyCalc = require('../models/supplyCalcModel')
const SalesCalc = require('../models/salesCalcModel')
const WorkerCount = require('../models/workerCountModel')
const ArticlePrice = require('../models/articlePriceModel')
const { nanoid } = require('nanoid')
const mongoose = require('mongoose')
const { parse } = require('dotenv')



const handleErrors = (err) => {
  let errors = {}

  for (var key in err.errors) {
    if (err.errors[key]) {
      errors[key] = err.errors[key].message
    }
  }
  if (err.message.includes('Cast to ObjectId failed for value "" (type string) at path "unit" because of "BSONError')) {
    errors.unit = 'Zgjedh njesin'
  }
  if (err.message.includes('Cast to ObjectId failed for value "" (type string) at path "group" because of "BSONError')) {
    errors.group = 'Grupi është i zbrazët'
  }
  if (err.message.includes('Cast to ObjectId failed for value "" (type string) at path "subgroup" because of "BSONError"')) {
    errors.subgroup = 'Nën grupi është i zbrazët'
  }
  if (err.message.includes('Cast to ObjectId failed for value "" (type string) at path "zone" because of "BSONError"')) {
    errors.zone = 'Zona është e zbrazët'
  }

  if (err.message.includes('Cast to ObjectId failed for value "" (type string) at path "manufacturer" because of "BSONError"')) {
    errors.manufacturer = 'Prodhuesi është i zbrazët'
  }
  if (err.message.includes('Cast to ObjectId failed for value "" (type string) at path "supplier" because of "BSONError"')) {
    errors.supplier = 'Furnitori është i zbrazët'
  }
  return errors
}


module.exports.getSuppliers = async (req, res) => {
  try {
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
    let filter = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { 'arbk': { $regex: search, $options: 'i' } },
        { 'address': { $regex: search, $options: 'i' } },
        { 'email': { $regex: search, $options: 'i' } },
        { 'phone_number': { $regex: search, $options: 'i' } },
      ],

    }
    const data = await Supplier.find(filter).skip(skip).limit(limit).lean()
    for (var i = 0; i < data.length; i++) {
      data[i].nr = i + 1 + skip || 1 * limit
    }
    const total = await Supplier.countDocuments(filter)
    res.json({
      recordsTotal: total ? total : 0,
      recordsFiltered: total ? total : 0,
      data,
    })
  }
  catch (e) {
    console.log(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri" })

  }
}

module.exports.addSupplier = async (req, res) => {
  try {
    const { name, arbk, address, email, phone_number } = req.body
    const supplier = await Supplier.create({ name, arbk, address, email, phone_number })
    res.status(201).send({ status: 'success', message: 'Furnitori  u shtua me sukses' })
  }
  catch (e) {
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}
module.exports.editSupplier = async (req, res) => {
  try {
    const { id, name, arbk, address, email, phone_number } = req.body
    const supplierOnDb = await Supplier.findById(id)
    if (!supplierOnDb) {
      return res.status(400).send({ status: 'fail', message: 'Artikulli nuk egziston' })
    }
    const article = await Supplier.findByIdAndUpdate(id, { name, arbk, address, email, phone_number }, { runValidators: true })
    res.status(201).send({ status: 'success', message: 'Furnitori  u përditsua me sukses' })
  }
  catch (e) {
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.deleteSupplier = async (req, res) => {
  try {
    const id = req.body.id
    const supplierOnDb = await Supplier.findByIdAndDelete(id)
    if (!supplierOnDb) {
      return res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri" })
    }
    res.status(200).send({ status: 'success', message: 'Furnitori  u fshi me sukses' })
  }
  catch (e) {
    const errors = handleErrors(e)
    console.log(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}
module.exports.getArticle = async (req, res) => {
  try {
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
    const search = req.query.search.value
    const searchType = req.query.searchType
    const unit = req.query.unit
    let filter = {}
    let filterPrice = {}
    let data
    if (searchType === 'barcode') {
      filter = { 'barcode': { $regex: search, $options: 'i' } }
    }
    if (searchType === 'name') {
      filter = { 'name': { $regex: search, $options: 'i' } }
    }
    if (searchType === 'code') {
      filter = { 'code': { $regex: search, $options: 'i' } }
    }
    if (unit) {
      filterPrice.unit = unit
    }
    let articleIds=[]
     data = await Article.find(filter).lean().limit(limit)
    for(let i =0;i<data.length;i++){
      articleIds.push(data[i]._id)
    }
    if (data.length>0) {
      filterPrice.article = {$in:articleIds}
      const articlePrice = await ArticlePrice.find(filterPrice)
      for(let i =0;i<data.length;i++){
         for(let a =0;a<articlePrice.length;a++){
          if(data[i]._id.toString()===articlePrice[a].article.toString()){
            data[i].price_few=articlePrice[a].price_few
        data[i].price_many = articlePrice[a].price_many
          }
         }
      }
    }
    if (data && unit) {
      let sales = await SalesCalc.find({ isOpen: false, unit, article: {$in:articleIds}}).select('article qty')
      let supply = await SupplyCalc.find({ isOpen: false, unit, article: {$in:articleIds} }).select('article qty')
      for (let i = 0; i < data.length; i++) {
        const currentArticleId = data[i]._id
        const articleSales = sales.filter((sale) => sale.article.equals(currentArticleId));
        const articleSupplies = supply.filter((supply) => supply.article.equals(currentArticleId));
        let sale_qty = 0;
        let supply_qty = 0;
        articleSupplies.forEach((supply) => {
          supply_qty += supply.qty;
        });
        articleSales.forEach((sale) => {
          sale_qty += sale.qty
        });
        data[i].qty = supply_qty - sale_qty
      }
    }
    const total = data.length
    res.json({
      recordsTotal: total ? total : 0,
      recordsFiltered: total ? total : 0,
      data
    })
  }
  catch (e) {
    console.log(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri" })

  }
}
module.exports.getSupplies = async (req, res) => {
  try {
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
    const search = req.query.search.value
    const supply = req.query.supply
    const sort = {}
    let data = []
    let total = 0

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
    if (req.query.order[0].column === '8') {
      sort['percent'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '9') {
      sort['discount'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '10') {
      sort['price'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    let filter = {
      $or: [
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$article.barcode' },
              regex: search.toString(),
              options: 'i'
            }
          }
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$article.name' }, // Convert min_qty to a string
              regex: search.toString(),
              options: 'i'
            }
          }
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$article.price_many' }, // Convert min_qty to a string
              regex: search.toString(),
              options: 'i'
            }
          }
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$qty' }, // Convert min_qty to a string
              regex: search.toString(),
              options: 'i'
            }
          }
        },
        { 'address': { $regex: search, $options: 'i' } },
        { 'email': { $regex: search, $options: 'i' } },
        { 'phone_number': { $regex: search, $options: 'i' } },
      ],

    }
    if (supply) {
      filter.supply = supply

      data = await SupplyCalc.find(filter).skip(skip).limit(limit).populate('article', 'price_many barcode name').lean()
      for (var i = 0; i < data.length; i++) {
        data[i].nr = i + 1 + skip || 1 * limit
      }
      total = await SupplyCalc.countDocuments(filter)
    }
    res.json({
      recordsTotal: total ? total : 0,
      recordsFiltered: total ? total : 0,
      data,
    })
  }
  catch (e) {
    console.log(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri" })

  }
}

module.exports.deleteSupply = async (req, res) => {
  try {
    const id = req.body.id
    const supply = await Supply.findById(id).select('isOpen')
    if (!supply || !supply.isOpen) {
      return res.status(400).send({ status: 'fail', message: "Ky artikull nuk mundë të fshihet sepse furnizimi i tij është mbyllur" })
    }
    await Supply.findByIdAndDelete(id)
    await SupplyCalc.deleteMany({ supply: id })
    res.status(200).send({ status: 'success', message: 'Furnizimi  u fshi me sukses' })
  }
  catch (e) {
    console.log(e)
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.addSupply = async (req, res) => {
  try {
    const { unit, date, supplier, invoice, buy_type } = req.body
    //  const createSupplierCalc = []
    const supply = await Supply.create({ unit, date, supplier, invoice, buy_type, code: nanoid(12), isOpen: true })
    //  for(let i=0;i<products.length;i++){
    //   products[i].supply=supply._id
    //   products[i].invoice=invoice
    //   createSupplierCalc.push({
    //     insertOne: {
    //       document: products[i],
    //     },
    //   })
    //  }
    //  await SupplyCalc.bulkWrite(createSupplierCalc, { session })
    res.status(201).send({ status: 'success', message: 'Furnizimi  u shtua me sukses', supply: supply._id })
  }
  catch (e) {
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.editSupply = async (req, res) => {
  try {
    const { id, date, invoice } = req.body
    const supply = await Supply.findByIdAndUpdate(id, { $set: { date, invoice }, $push: { activity: { action: 'update date and invoice', updatedBy: req.user._id, } } }, { runValidators: true })
    if (!supply) {
      return res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim, furnizimi nuk u gjet" })
    }
    res.status(201).send({ status: 'success', message: 'Furnizimi  u përditsua me sukses' })
  }
  catch (e) {
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.addSupplyArticles = async (req, res) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const { qty, price, rab_1, rab_2, mazh, price_few, price_many, article, barcode, supply } = req.body
    let total_price = 0
    const subpplyOnDb = await Supply.findById(supply)
    if (!subpplyOnDb) {
      return res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim, furnizimi nuk u gjet" })
    }
    if (qty && price) {
      total_price = parseFloat(qty * price).toFixed(2)
      if (rab_1 && !isNaN(parseFloat(rab_1))) {
        total_price = total_price - parseFloat((rab_1 / 100) * total_price).toFixed(2)
      }
      if (rab_2 && !isNaN(parseFloat(rab_2))) {
        total_price = total_price - parseFloat((rab_2 / 100) * total_price).toFixed(2)
      }
    }
    const supplycalc = new SupplyCalc({ qty, price, rab_1, rab_2, mazh, price_few, price_many, article, barcode, supply, unit: subpplyOnDb.unit, total_price, unit: subpplyOnDb.unit })
    await supplycalc.save({ session })
    //  const articlePrice= await ArticlePrice.findOneAndUpdate({unit:subpplyOnDb.unit,article},{$set:{price_few,price_many},$push:{activity:{action:'update',updatedBy:req.user._id,}}},{runValidators:true,session})
    await session.commitTransaction()
    res.status(201).send({ status: 'success', message: 'Arikulli  u shtua me sukses në furnizim', })
  }
  catch (e) {
    console.log(e);
    await session.abortTransaction()
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
  finally {
    session.endSession()
  }
}

module.exports.deleteSupplyArticle = async (req, res) => {
  try {
    const id = req.body.id
    const supplycalcOnDb = await SupplyCalc.findById(id)
    if (!supplycalcOnDb) {
      return res.status(400).send({ status: 'fail', message: "Ky artikull nuk egziston në furnizim" })
    }
    const supply = await Supply.findOne({ _id: supplycalcOnDb.supply }).select('isOpen')
    if (!supply || !supply.isOpen) {
      return res.status(400).send({ status: 'fail', message: "Ky artikull nuk mundë të fshihet sepse furnizimi i tij është mbyllur" })
    }
    await SupplyCalc.findOneAndDelete({ _id: id })
    res.status(200).send({ status: 'success', message: 'Artikulli u fshi me sukses nga furnizimi' })
  }
  catch (e) {
    console.log(e);
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.closeSupply = async (req, res) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    let { id, paid_status, supply_status } = req.body
    const supplyOnDb = await Supply.findById(id)
    if (!supplyOnDb || !supplyOnDb.isOpen) {
      return res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim, furnizimi nuk u gjet ose është i mbyllur" })
    }
    const supplycalc = await SupplyCalc.find({ supply: supplyOnDb._id })
    if (!supplycalc || supplycalc.length < 1) {
      return res.status(400).send({ status: 'fail', message: "Furnizimi nuk mund të mbyllet pasi nuk ka asnjë artikull" })
    }
    let total_price = 0
    for (let i = 0; i < supplycalc.length; i++) {
      total_price = parseFloat(total_price + supplycalc[i].total_price).toFixed(2)
    }
    supply_status = supply_status === 'primary' ? true : false
    await Supply.findOneAndUpdate({ _id: id }, { $set: { isOpen: false, total_price, nr_producs: supplycalc.length, paid_status, supply_status }, $push: { activity: { action: 'closed', updatedBy: req.user._id, } } }, { runValidators: true, session })
    await SupplyCalc.updateMany({ supply: supplyOnDb._id }, { isOpen: false }, { session })
    const updateObj = []
    for (let i = 0; i < supplycalc.length; i++) {
      let update = { price_many: supplycalc[i].price_many, price_few: supplycalc[i].price_few }
      updateObj.push({
        updateOne: {
          filter: { article: supplycalc[i].article, unit: supplycalc[i].unit },
          update: {
            $set: update,
          },
        },
      })
    }

    await ArticlePrice.bulkWrite(updateObj, { session })
    await session.commitTransaction()
    res.status(201).send({ status: 'success', message: 'Furnizimi u mbyll me sukses', })
  }
  catch (e) {
    await session.abortTransaction()
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
  finally {
    session.endSession()
  }
}
module.exports.getArbk = async (req, res) => {
  try {
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
  catch (e) {
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }

}

module.exports.getSuppliesList = async (req, res) => {
  try {
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
    const search = req.query.search.value
    const type = req.query.type
    const sort = {}
    const unit = req.query.unit
    const year = req.query.year
    const status = req.query.status


    if (req.query.order[0].column === '0') {
      sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '1') {
      sort['supplier.name'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '2') {
      sort['invoice'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '3') {
      sort['nr_producs'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '4') {
      sort['date'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '5') {
      sort['total_price'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }

    let filter = {
      $or: [
        { 'supplier.name': { $regex: search, $options: 'i' } },
        { 'invoice': { $regex: search, $options: 'i' } },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$nr_producs' }, // Convert min_qty to a string
              regex: search.toString(),
              options: 'i'
            }
          }
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$total_price' }, // Convert min_qty to a string
              regex: search.toString(),
              options: 'i'
            }
          }
        },
      ],
      buy_type: type
    }

    if (unit && unit !== 'all') {
      filter.unit = unit
    }

    if (year && year !== 'All') {
      filter.date = { $regex: date, $options: 'i' }
    }

    if (status) {
      if (status === 'paid') {
        filter.paid_status = true
      }
      if (status === 'no_paid') {
        filter.paid_status = false
      }

    }
    const data = await Supply.find(filter).select('invoice createdAt date isOpen supplier nr_producs').populate('supplier', 'name').skip(skip).limit(limit).lean()
    const supplyId = []
    for (var i = 0; i < data.length; i++) {
      data[i].nr = i + 1 + skip || 1 * limit
      data[i].supplyId = data[i].supplier ? data[i].supplier._id : ''
      supplyId.push(data[i]._id)
    }
    const supplyCalc = await SupplyCalc.aggregate([{
      $match: {
        supply: { $in: supplyId },
      }
    },
    {
      $lookup: {
        from: 'articles', // Replace with the actual name of the Article collection
        localField: 'article', // Replace with the actual name of the field linking SupplyCalc to Article
        foreignField: '_id',
        as: 'article'
      }
    },
    {
      $unwind: '$article' // Since $lookup returns an array, unwind it to get a single object
    },
    {
      $project: {
        _id: '$supply',
        articleName: '$article.name',// Extract the 'name' field from the populated Article
        total_price: 1
      }
    }, {
      $group: {
        _id: '$_id', // Group by the 'supply' field
        articles: { $push: '$articleName' }, // Create an array of article names
        totalPrice: { $sum: '$total_price' }
      }
    }])

    for (let i = 0; i < data.length; i++) {
      for (let a = 0; a < supplyCalc.length; a++) {
        if (data[i]._id.toString() === supplyCalc[a]._id.toString()) {
          data[i].articles = supplyCalc[a].articles
          data[i].price = supplyCalc[a].totalPrice


        }
      }
    }
    const total = await Supply.countDocuments(filter)
    res.json({
      recordsTotal: total ? total : 0,
      recordsFiltered: total ? total : 0,
      data,
    })
  }
  catch (e) {
    console.log(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri" })

  }
}

module.exports.getSuppliesCard = async (req, res) => {
  try {
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
    const search = req.query.search.value
    const sort = {}
    const unit = req.query.unit
    const status = req.query.status
    const supplier = req.query.supplier

    if (req.query.order[0].column === '0') {
      sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '1') {
      sort['invoice'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '2') {
      sort['article.name'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '3') {
      sort['date'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }

    let filter = {
      $or: [
        { 'invoice': { $regex: search, $options: 'i' } },
      ],
    }

    if (unit && unit !== 'all') {
      filter.unit = unit
    }


    if (status) {
      if (status === 'paid') {
        filter.paid_status = true
      }
      if (status === 'no_paid') {
        filter.paid_status = false
      }
      if (status === 'all') {
      }
    }
    if (supplier) {
      filter.supplier = supplier
    }
    const data = await Supply.find(filter).select('invoice createdAt date isOpen supplier paid_status nr_producs').skip(skip).limit(limit).lean()
    const supplyId = []
    for (var i = 0; i < data.length; i++) {
      data[i].nr = i + 1 + skip || 1 * limit
      supplyId.push(data[i]._id)
    }
    const supplyCalc = await SupplyCalc.aggregate([{
      $match: {
        supply: { $in: supplyId },
      }
    },
    {
      $lookup: {
        from: 'articles', // Replace with the actual name of the Article collection
        localField: 'article', // Replace with the actual name of the field linking SupplyCalc to Article
        foreignField: '_id',
        as: 'article'
      }
    },
    {
      $unwind: '$article' // Since $lookup returns an array, unwind it to get a single object
    },
    {
      $project: {
        _id: '$supply',
        articleName: '$article.name',// Extract the 'name' field from the populated Article
        total_price: 1
      }
    }, {
      $group: {
        _id: '$_id', // Group by the 'supply' field
        articles: { $push: '$articleName' }, // Create an array of article names
        totalPrice: { $sum: '$total_price' }
      }
    }])

    for (let i = 0; i < data.length; i++) {
      for (let a = 0; a < supplyCalc.length; a++) {
        if (data[i]._id.toString() === supplyCalc[a]._id.toString()) {
          data[i].articles = supplyCalc[a].articles
          data[i].price = supplyCalc[a].totalPrice


        }
      }
    }
    const total = await Supply.countDocuments(filter)
    res.json({
      recordsTotal: total ? total : 0,
      recordsFiltered: total ? total : 0,
      data,
    })
  }
  catch (e) {
    console.log(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri" })

  }
}

module.exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().select('name barcode')
    res.send({ data: articles, status: 'success' })
  }
  catch (e) {
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri" })
  }
}

module.exports.closeCount = async (req, res) => {
  try {
    const { count } = req.body
    const countArticle = []
    const barcodes = []
    for (let i = 0; i < count.length; i++) {
      const item = count[i];
      console.log(item.barcode, item.qty)
      console.log(item.barcode !== '', item.qty !== '')
      console.log(item.barcode !== '' && item.qty !== '')
      if (item.barcode !== '' || item.qty !== '') {
        if (!item.barcode || isNaN(item.barcode)) {
          return res.send({ status: 'fail', message: `Artikulli me emrin "${item.name}" e ka barkodin e zbrazet` })
        }
        if (!item.qty || isNaN(item.qty)) {
          return res.send({ status: 'fail', message: `Artikulli me emrin "${item.name}" e ka sasin në formatin e gabuar` })
        }
        countArticle.push({ barcode: item.barcode, qty: item.qty })
        barcodes.push(item.barcode)
      }
    }
    const article = await Article.find({ barcode: { $in: barcodes } }).select('_id barcode name')
    const articlepriceCreate = []
    for (let i = 0; i < article.length; i++) {
      for (let a = 0; a < countArticle.length; a++) {
        if (countArticle[a].barcode === article[i].barcode) {
          articlepriceCreate.push({
            insertOne: {
              document: {
                article_name: article[i].name,
                article: article[i]._id,
                unit: req.user.unit,
                user: req.user._id,
                qty: countArticle[a].qty
              },
            }
          })
        }
      }
    }
    const result = await WorkerCount.bulkWrite(articlepriceCreate)
    if (result.insertedCount > 0) {
      res.status(201).send({ status: 'success', message: 'Numrimi u mbyll me sukses' })
    } else {
      res.status(201).send({ status: 'fail', message: 'Asnjë numrim nuk u ruajt' })
    }
  }
  catch (e) {
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.getArticlesCount = async (req, res) => {
  try {
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
    const search = req.query.search.value
    const type = req.query.type
    const sort = {}



    if (req.query.order[0].column === '0') {
      sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '1') {
      sort['supplier.name'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '2') {
      sort['invoice'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '3') {
      sort['nr_producs'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '4') {
      sort['date'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '5') {
      sort['total_price'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }

    let filter = {
      $or: [
        { 'article.name': { $regex: search, $options: 'i' } },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$qty' }, // Convert min_qty to a string
              regex: search.toString(),
              options: 'i'
            }
          }
        },
      ],
      user: req.user._id,
      isOpen: true
    }

    const data = await WorkerCount.find(filter).select('qty article_name').skip(skip).limit(limit).lean()
    for (var i = 0; i < data.length; i++) {
      data[i].nr = i + 1 + skip || 1 * limit
    }

    const total = await WorkerCount.countDocuments(filter)
    res.json({
      recordsTotal: total ? total : 0,
      recordsFiltered: total ? total : 0,
      data,
    })
  }
  catch (e) {
    console.log(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri" })

  }
}

module.exports.deleteCount = async (req, res) => {
  try {
    const id = req.body.id
    const workerCount = await WorkerCount.findOne({ _id: id, user: req.user._id, isOpen: true })
    if (!workerCount) {
      return res.send({ status: 'fail', message: 'Ky numrim nuk egziston ose nuk keni akses për ta fshir' })
    }
    await WorkerCount.findOneAndDelete({ _id: id, user: req.user._id })
    res.send({ status: 'success', message: 'Numrimi i artikullit u fshi' })
  }
  catch (e) {
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.editCountQty = async (req, res) => {
  try {
    const { id, qty } = req.body
    const workerCount = await WorkerCount.findOne({ _id: id, user: req.user._id, isOpen: true })
    if (!workerCount) {
      return res.send({ status: 'fail', message: 'Ky numrim nuk egziston ose nuk keni akses për ta fshir' })
    }
    await WorkerCount.findOneAndUpdate({ _id: id, user: req.user._id }, { qty }, { runValidators: true })
    res.send({ status: 'success', message: 'Numrimi u përditsua me sukses' })
  }
  catch (e) {
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}