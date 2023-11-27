const { nanoid } = require('nanoid')
const Group = require('../models/groupModel')
const SubGroup = require('../models/subGroupModel')
const Zone = require('../models/zoneModel')
const Manufacturer = require('../models/manufacturerModel')
const Article = require('../models/articleModel')
const ArticlePrice = require('../models/articlePriceModel')
const Unit = require('../models/unitModel')
const OffertCalc = require('../models/offertCalcModel')
const SupplyCalc = require('../models/supplyCalcModel')
const moment = require('moment')
const SalesCalc = require('../models/salesCalcModel')
const XLSX = require('xlsx')
const ActionCalc = require('../models/actionCalcModel')
const { trusted } = require('mongoose')
const WorkerCount = require('../models/workerCountModel')
const Supply = require('../models/supplyModel')
const mongoose = require('mongoose')



const handleErrors = (err) => {
  let errors = {}

  for (var key in err.errors) {
    if (err.errors[key]) {
      errors[key] = err.errors[key].message
    }
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
  return errors
}

module.exports.getGroups = async (req, res) => {
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
    let filter = {
      name: { $regex: search, $options: 'i' }
    }
    const data = await Group.find(filter).skip(skip).limit(limit).lean()
    for (var i = 0; i < data.length; i++) {
      data[i].nr = i + 1 + skip || 1 * limit
    }
    const total = await Group.countDocuments(filter)
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

module.exports.addGroup = async (req, res) => {
  let group
  try {
    const { name } = req.body
    group = await Group.create({ name })
    res.status(201).send({ status: 'success', message: 'Grupi  u shtua me sukses', id: group._id })
  }
  catch (e) {
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.deleteGroup = async (req, res) => {
  try {
    const id = req.body.id
    const groupOnDb = await Group.findByIdAndDelete(id)
    if (!groupOnDb) {
      return res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri" })
    }
    res.status(200).send({ status: 'success', message: 'Grupi  u fshi me sukses' })
  }
  catch (e) {
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.getSubGroups = async (req, res) => {
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
    let filter = {
      name: { $regex: search, $options: 'i' }
    }
    const data = await SubGroup.find(filter).skip(skip).limit(limit).lean().populate('group', 'name')
    for (var i = 0; i < data.length; i++) {
      data[i].nr = i + 1 + skip || 1 * limit
    }
    const total = await SubGroup.countDocuments(filter)
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

module.exports.addSubGroup = async (req, res) => {
  try {
    const { name, group } = req.body
    const groupOnDb = await Group.findById(group)
    if (!groupOnDb) {
      return res.status(201).send({ status: 'fail', message: 'Grupi  nuk egziston' })
    }
    const subgroup = await SubGroup.create({ name, group })
    res.status(201).send({ status: 'success', message: 'Nën grupi  u shtua me sukses', id: subgroup._id })
  }
  catch (e) {
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.deleteSubGroup = async (req, res) => {
  try {
    const id = req.body.id
    const subgroupOnDb = await SubGroup.findByIdAndDelete(id)
    if (!subgroupOnDb) {
      return res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri" })
    }
    res.status(200).send({ status: 'success', message: 'Nën grupi  u fshi me sukses' })
  }
  catch (e) {
    const errors = handleErrors(e)
    console.log(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.getZone = async (req, res) => {
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
    let filter = {
      name: { $regex: search, $options: 'i' }
    }
    const data = await Zone.find(filter).skip(skip).limit(limit).lean()
    for (var i = 0; i < data.length; i++) {
      data[i].nr = i + 1 + skip || 1 * limit
    }
    const total = await Zone.countDocuments(filter)
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

module.exports.addZone = async (req, res) => {
  try {
    const { name } = req.body
    const zone = await Zone.create({ name })
    res.status(201).send({ status: 'success', message: 'Zona  u shtua me sukses', id: zone._id })
  }
  catch (e) {
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.deleteZone = async (req, res) => {
  try {
    const id = req.body.id
    const zoneOnDb = await Zone.findByIdAndDelete(id)
    if (!zoneOnDb) {
      return res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri" })
    }
    res.status(200).send({ status: 'success', message: 'Zona  u fshi me sukses' })
  }
  catch (e) {
    const errors = handleErrors(e)
    console.log(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.getManufactures = async (req, res) => {
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
    let filter = {
      name: { $regex: search, $options: 'i' }
    }
    const data = await Manufacturer.find(filter).skip(skip).limit(limit).lean()
    for (var i = 0; i < data.length; i++) {
      data[i].nr = i + 1 + skip || 1 * limit
    }
    const total = await Manufacturer.countDocuments(filter)
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

module.exports.addManufacture = async (req, res) => {
  try {
    const { name } = req.body
    const manufacturer = await Manufacturer.create({ name })
    res.status(201).send({ status: 'success', message: 'Prodhuesi  u shtua me sukses', id: manufacturer._id })
  }
  catch (e) {
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.deleteManufacture = async (req, res) => {
  try {
    const id = req.body.id
    const manufacturerOnDb = await Manufacturer.findByIdAndDelete(id)
    if (!manufacturerOnDb) {
      return res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri" })
    }
    res.status(200).send({ status: 'success', message: 'Prodhuesi  u fshi me sukses' })
  }
  catch (e) {
    const errors = handleErrors(e)
    console.log(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.getArticles = async (req, res) => {
  try {
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
    const search = req.query.search.value
    const sort = {}

    if (req.query.order[0].column === '0') {
      sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '1') {
      sort['barcode'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '2') {
      sort['name'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '3') {
      sort['tvsh'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '4') {
      sort['sale_type'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '5') {
      sort['min_qty'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '6') {
      sort['price_few'] = req.query.order[0].dir === 'asc' ? 1 : -1
    } if (req.query.order[0].column === '7') {
      sort['price_many'] = req.query.order[0].dir === 'asc' ? 1 : -1
    } if (req.query.order[0].column === '8') {
      sort['barcode_package'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '9') {
      sort['code'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    let filter = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { 'barcode': { $regex: search, $options: 'i' } },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$tvsh' }, // Convert min_qty to a string
              regex: search.toString(),
              options: 'i'
            }
          }
        },
        { 'sale_type': { $regex: search, $options: 'i' } },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$min_qty' }, // Convert min_qty to a string
              regex: search.toString(),
              options: 'i'
            }
          }
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$price_few' }, // Convert min_qty to a string
              regex: search.toString(),
              options: 'i'
            }
          }
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$price_many' }, // Convert min_qty to a string
              regex: search.toString(),
              options: 'i'
            }
          }
        },
        { 'barcode_package': { $regex: search, $options: 'i' } },
        { 'code': { $regex: search, $options: 'i' } },
      ],

    }
    const data = await Article.find(filter).skip(skip).limit(limit).lean()
    for (var i = 0; i < data.length; i++) {
      data[i].nr = i + 1 + skip || 1 * limit
    }
    const total = await Article.countDocuments(filter)
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

module.exports.addArticle = async (req, res) => {
  try {
    const { barcode, name, tvsh, sale_type, min_qty, price_few, price_many, price_supply, manufacturer, barcode_package, code, group, subgroup, zone } = req.body
    if (barcode) {
      const articleOnDb = await Article.findOne({ barcode })
      if (articleOnDb) {
        return res.send({ status: 'fail', message: 'Artikulli tashmë egziston në sistem' })
      }
    }
    const addObj = { barcode, name, tvsh, sale_type, min_qty, barcode_package, code, price_supply }
    if (manufacturer) addObj.manufacturer = manufacturer
    if (group) addObj.group = group
    if (subgroup) addObj.subgroup = subgroup
    if (zone) addObj.zone = zone
    const article = await Article.create(addObj)
    const unit = await Unit.find()
    const articlepriceCreate = []
    for (let i = 0; i < unit.length; i++) {
      articlepriceCreate.push({
        insertOne: {
          document: {
            article: article._id,
            barcode,
            unit: unit[i]._id,
            price_few,
            price_many,

          },
        },
      })
    }
    await ArticlePrice.bulkWrite(articlepriceCreate)
    res.status(201).send({ status: 'success', message: 'Artikulli  u shtua me sukses' })
  }
  catch (e) {
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}
module.exports.editArticle = async (req, res) => {
  try {
    const { id, barcode, name, tvsh, sale_type, min_qty, price_few, price_many, manufacturer, barcode_package, code, group, subgroup, zone } = req.body
    const articleOnDb = await Article.findById(id)
    if (!articleOnDb) {
      return res.status(400).send({ status: 'fail', message: 'Artikulli nuk egziston' })
    }
    const articleUpdate ={ barcode, name, tvsh, sale_type, min_qty, barcode_package, code }
    if (manufacturer) articleUpdate.manufacturer = manufacturer
    if (group) articleUpdate.group = group
    if (subgroup) articleUpdate.subgroup = subgroup
    if (zone) articleUpdate.zone = zone
    const article = await Article.findByIdAndUpdate(id,articleUpdate , { runValidators: true })
    if(req.user.unit){
     await ArticlePrice.findOneAndUpdate({article:id,unit:req.user.unit},{price_few,price_many},{ runValidators: true })
    }
    res.status(201).send({ status: 'success', message: 'Artikulli  u përditsua me sukses' })
  }
  catch (e) {
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.deleteArticle = async (req, res) => {
  try {
    const id = req.body.id
    const articleOnDb = await Article.findById(id)
    if (!articleOnDb) {
      return res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri" })
    }
    const supplyCalc = await SupplyCalc.countDocuments({ article: id })
    const offertyCalc = await OffertCalc.countDocuments({ article: id })
    if (supplyCalc > 0 || offertyCalc > 0) {
      return res.status(400).send({ status: 'fail', message: "Ky artikull nuk mund të fshihet pasi është në pordorim" })
    }
    await Article.findByIdAndDelete(id)
    await ArticlePrice.deleteMany({ article: id })
    res.status(200).send({ status: 'success', message: 'Artikulli  u fshi me sukses' })
  }
  catch (e) {
    const errors = handleErrors(e)
    console.log(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.getArticlesStock = async (req, res) => {
  try {
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
    const search = req.query.search.value
    let unit = req.query.unit
    let date = req.query.date
    let group = req.query.group
    let subgroup = req.query.subgroup
    let zone = req.query.zone
    let manufacturer = req.query.manufacturer
    const tvsh = req.query.tvsh
    const starDate = moment(date.split('-')[0].replace(' ', ''), "DD/MM/YYYY").startOf('day').toDate()
    const endDate = moment(date.split('-')[1].replace(' ', ''), "DD/MM/YYYY").endOf('day').toDate()
    const sort = {}
    let data = []
    let total = 0
    if (req.query.order[0].column === '0') {
      sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '1') {
      sort['barcode'] = req.query.order[0].dir === 'asc' ? 1 : -1
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
    let filterArticle = {
      $or: [
        { 'barcode': { $regex: search, $options: 'i' } },
        { 'name': { $regex: search, $options: 'i' } },
      ],
    }
    if (group) filterArticle.group = group
    if (subgroup) filterArticle.subgroup = subgroup
    if (zone) filterArticle.zone = zone
    if (manufacturer) filterArticle.manufacturer = manufacturer


    let articleIds = []
    if (unit) {
      let filterPrice = {
        updatedAt: {
          $gte: starDate,
          $lte: endDate,
        },
        isOpen: false,
        unit
      }
      data = await Article.find(filterArticle).lean().select('name barcode').skip(skip).limit(limit)
      total = await Article.countDocuments(filterArticle)
      for (let i = 0; i < data.length; i++) {
        articleIds.push(data[i]._id)
        data[i].nr = i + 1 + skip || 1 * limit
      }
      filterPrice.article = { $in: articleIds }

      // if(tvsh){filterPrice.sale_status=true}else{filterPrice.sale_status = false}
      let sales = await SalesCalc.find(filterPrice).select('article qty total_price')
      let supply = await SupplyCalc.find(filterPrice).select('article qty total_price')
      for (let i = 0; i < data.length; i++) {
        const currentArticleId = data[i]._id
        const articleSales = sales.filter((sale) => sale.article.equals(currentArticleId));
        const articleSupplies = supply.filter((supply) => supply.article.equals(currentArticleId));
        let totalCost = 0;
        let totalRevenue = 0;
        let sale_qty = 0;
        let supply_qty = 0;
        let salePrices = []
        let supplyPrices = []



        articleSupplies.forEach((supply) => {
          totalCost += supply.total_price;
          supply_qty += supply.qty;
          supplyPrices.push(parseFloat(supply.total_price / supply.qty))

        });

        articleSales.forEach((sale) => {
          totalRevenue += sale.total_price;
          sale_qty += sale.qty;
          salePrices.push(parseFloat(sale.total_price / sale.qty))
        });
        const sumSup = supplyPrices.reduce((a, b) => a + b, 0);
        const avgSup = (sumSup / supplyPrices.length) || 0;
        const sumSell = salePrices.reduce((a, b) => a + b, 0);
        const avgSell = (sumSell / salePrices.length) || 0;
        data[i].profit = parseFloat(avgSell * sale_qty - avgSup * sale_qty).toFixed(2)
        data[i].sale_qty = sale_qty
        data[i].supply_qty = supply_qty
        data[i].supply_price = parseFloat(avgSup).toFixed(2)
        data[i].sell_price = parseFloat(avgSell).toFixed(2)
        data[i].totalRevenue = totalRevenue
        data[i].totalCost = totalCost
      }
    }
    res.json({
      recordsTotal: total ? total : 0,
      recordsFiltered: total ? total : 0,
      data,
    })
  }
  catch (e) {
    console.log(e)
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.addArticlesExel = async (req, res) => {
  try {
    if (req.file) {
      const fileBuffer = req.file.buffer;
      if (fileBuffer && fileBuffer.length > 0) {
        let workbook = XLSX.read(fileBuffer, { type: 'buffer' });

        let worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let lastRow = 1;
        while (worksheet[`A${lastRow + 1}`] !== undefined) {
          lastRow++;
        }
        const manufacturers = await Manufacturer.find().select('name')
        const groups = await Group.find().select('name')
        const subgroups = await SubGroup.find().select('name')
        const zones = await Zone.find().select('name')



        const manufacturerMapping = {}
        manufacturers.forEach((manufacturer) => {
          manufacturerMapping[manufacturer.name] = manufacturer._id;
        });
        const grupMapping = {}
        groups.forEach((group) => {
          grupMapping[group.name] = group._id;
        });
        const subgrupMapping = {}
        subgroups.forEach((subgroup) => {
          subgrupMapping[subgroup.name] = subgroup._id;
        });
        const zoneMapping = {}
        zones.forEach((zone) => {
          zoneMapping[zone.name] = zone._id;
        });
        let articles = []
        for (let i = 2; i <= lastRow; i++) {
          const manufacturerName = worksheet[`I${i}`]?.v;
          const manufacturerId = manufacturerMapping[manufacturerName];
          const groupId = grupMapping[worksheet[`L${i}`]?.v];
          const subgroupId = subgrupMapping[worksheet[`M${i}`]?.v];
          const zoneId = zoneMapping[worksheet[`N${i}`]?.v];

          const article = {
            barcode: worksheet[`A${i}`]?.v,
            name: worksheet[`B${i}`]?.v || 'Pa emer',
            tvsh: worksheet[`C${i}`]?.v,
            sale_type: worksheet[`D${i}`]?.v,
            min_qty: worksheet[`E${i}`]?.v,
            price_few: worksheet[`F${i}`]?.v,
            price_many: worksheet[`G${i}`]?.v,
            price_supply: worksheet[`H${i}`]?.v,
            manufacturer: manufacturerId,
            barcode_package: worksheet[`J${i}`]?.v,
            code: worksheet[`K${i}`]?.v,
            group: groupId,
            subgroup: subgroupId,
            zone: zoneId,
          }
          articles.push(article)
        }
        const createdArticles = await Article.create(articles);
        const units = await Unit.find();
        const articlePriceCreate = [];
        const barcodeToIdMap = {};
        createdArticles.forEach((createdArticle) => {
          barcodeToIdMap[createdArticle.barcode] = createdArticle._id;
        });
        articles.forEach((article) => {
          const articleId = barcodeToIdMap[article.barcode];
          units.forEach((unit) => {
            articlePriceCreate.push({
              insertOne: {
                document: {
                  article: articleId,
                  barcode: article.barcode,
                  unit: unit._id,
                  price_few: article.price_few,
                  price_many: article.price_many,
                },
              },
            });
          });
        });

        // Bulk insert article prices
        await ArticlePrice.bulkWrite(articlePriceCreate);
        res.status(201).send({ status: 'success', message: 'Artikujt u shtuan me sukses' });
        return
      } else {
        res.status(400).send({ status: 'fail', message: 'Uploaded file is empty' });
      }
    } else {
      res.status(400).send({ status: 'fail', message: 'No file uploaded' });
    }
  } catch (e) {
    const errors = handleErrors(e);
    console.log(e);
    res.status(400).send({ status: 'fail', message: 'Diçka shkoi gabim, provoni përsëri', errors });
  }
}

module.exports.getArticleStats = async (req, res) => {
  try {
    const article = await Article.findById(req.body.article).select('_id name')

    let unit = []
    let unitId = []

    if (!article) {
      return res.status(200).redirect('back')
    }
    if (req.user && req.user.role === 'managment') {
      unit = await Unit.find({ _id: { $in: [req.user.units] } }).select('_id unit_name')
    }
    if (req.user && req.user.role === 'superadmin' || req.thana) {
      unit = await Unit.find().select('_id unit_name')
    }
    for (let i = 0; i < unit.length; i++) {
      unitId.push(unit[i]._id)
    }
    const matchObj = {
      isOpen: false,
      unit: { $in: unitId },
      article: article._id
    }

    const saleCals = await SalesCalc.aggregate([
      {
        $match: matchObj
      },
      {
        $group: {
          _id: "$unit",
          totalSum: { $sum: '$total_price' }
        }
      }
    ])
    const data = []
    for (let i = 0; i < unit.length; i++) {
      for (let a = 0; a < saleCals.length; a++) {
        if (unit[i]._id.toString() === saleCals[a]._id.toString()) {
          data.push({ unit: unit[i].unit_name, sales: saleCals[a].totalSum });
        }
      }
    }
    res.send({ status: 'success', data })
  }
  catch (e) {
    console.log(e)
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.getsallesByMonth = async (req, res) => {
  try {
    moment.locale('sq')
    if (!req.body.year) {
      return res.status(400).send({ status: 'fail', message: 'Year is empty' })
    }
    if (req.body.year == 'NaN') {
      return res.status(400).send({ status: 'fail', message: 'NaN' })
    }
    const article = await Article.findById(req.body.article).select('_id name')

    let unit = []
    let unitId = []
    if (!article) {
      return res.status(200).redirect('back')
    }
    if (req.user && req.user.role === 'managment') {
      unit = await Unit.find({ _id: { $in: [req.user.units] } }).select('_id unit_name')
    }
    if (req.user && req.user.role === 'superadmin' || req.thana) {
      unit = await Unit.find().select('_id unit_name')
    }
    for (let i = 0; i < unit.length; i++) {
      unitId.push(unit[i]._id)
    }
    const getMonthlyOutcome = async (year) => {
      let monthlOutcome = []

      const promises = []

      for (let i = 1; i <= 12; i++) {
        let startDate = moment(`${year}-${i}-01`, 'YYYY-MM-DD')
        let endDate = moment(startDate).add(1, 'months')
        let matchObj = {
          isOpen: false,
          unit: { $in: unitId },
          article: article._id,
          updatedAt: {
            $gte: startDate.toDate(),
            $lt: endDate.toDate(),
          }
        }
        const promise = Promise.all([
          SalesCalc.aggregate([
            {
              $match: matchObj,
            },
            {
              $group: {
                _id: null,
                total: { $sum: '$total_price' }
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

    let data = await getMonthlyOutcome(req.body.year)

    res.send({
      data,
    })
  }
  catch (e) {
    console.log(e)
    const errors = handleErrors(e)
    res.send({ errors })
  }
}

module.exports.getAnalizeStats = async (req, res) => {
  try {
    let unit = req.body.unit
    let date = req.body.date
    const starDate = moment(date.split('-')[0].replace(' ', ''), "DD/MM/YYYY").toDate()
    const endDate = moment(date.split('-')[1].replace(' ', ''), "DD/MM/YYYY").toDate()
    let totalCost = 0;
    let totalRevenue = 0;
    let sale_qty = 0;
    let supply_qty = 0;
    let salePrices = []
    let supplyPrices = []
    let profit = 0
    if (unit) {
      let filterPrice = {
        updatedAt: {
          $gte: starDate,
          $lt: endDate,
        },
        isOpen: false,
        unit,
      }
      let article = await Article.findById(req.body.article).lean().select('_id')
      if (!article) {
        return res.send({ status: 'fail', message: 'Diqka shkoi gabim provoni përsëri' })
      }
      filterPrice.article = req.body.article
      let sales = await SalesCalc.find(filterPrice).select('article qty total_price')
      let supplys = await SupplyCalc.find(filterPrice).select('article qty total_price')
      supplys.forEach((supply) => {
        totalCost += supply.total_price;
        supply_qty += supply.qty;
        supplyPrices.push(parseFloat(supply.total_price / supply.qty).toFixed(2))
      });
      sales.forEach((sale) => {
        totalRevenue += sale.total_price;
        sale_qty += sale.qty;
        salePrices.push(parseFloat(sale.total_price / sale.qty).toFixed(2))
      });
      const sumSup = supplyPrices.reduce((a, b) => a + b, 0);
      const avgSup = (sumSup / supplyPrices.length) || 0;
      const sumSell = salePrices.reduce((a, b) => a + b, 0);
      const avgSell = (sumSell / salePrices.length) || 0;
      profit = parseFloat(avgSell * sale_qty - avgSup * sale_qty).toFixed(2)
    }
    res.json({
      status: 'success',
      profit,
      sales: parseFloat(totalRevenue).toFixed(2),
      cost: parseFloat(totalCost).toFixed(2),
    })
  }
  catch (e) {
    console.log(e)
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.getSupplysForArticle = async (req, res) => {
  try {
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
    const search = req.query.search.value
    const article = req.query.article

    const sort = {}

    if (req.query.order[0].column === '0') {
      sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '1') {
      sort['name'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    let filter = {
      article,
      $or: [
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$qty' },
              regex: search.toString(),
              options: 'i'
            }
          }
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$total_price' },
              regex: search.toString(),
              options: 'i'
            }
          }
        }
      ]
    }
    const data = await SupplyCalc.find(filter).skip(skip).limit(limit).lean().select('qty total_price')
    for (var i = 0; i < data.length; i++) {
      data[i].nr = i + 1 + skip || 1 * limit
    }
    const total = await SupplyCalc.countDocuments(filter)
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

module.exports.getActionForArticle = async (req, res) => {
  try {
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
    const search = req.query.search.value
    const article = req.query.article

    const sort = {}

    if (req.query.order[0].column === '0') {
      sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '1') {
      sort['total_price'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '2') {
      sort['qty'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '3') {
      sort['total_price'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    let filter = {
      article,
      $or: [
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$price_now_many' },
              regex: search.toString(),
              options: 'i'
            }
          }
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$price_action_many' },
              regex: search.toString(),
              options: 'i'
            }
          }
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$percent' },
              regex: search.toString(),
              options: 'i'
            }
          }
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$price_now_few' },
              regex: search.toString(),
              options: 'i'
            }
          }
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$price_action_few' },
              regex: search.toString(),
              options: 'i'
            }
          }
        }]
    }
    const data = await ActionCalc.find(filter).skip(skip).limit(limit).lean().select('price_now_many price_action_many percent price_now_few price_action_few')
    for (var i = 0; i < data.length; i++) {
      data[i].nr = i + 1 + skip || 1 * limit
    }
    const total = await ActionCalc.countDocuments(filter)
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

module.exports.getSalesByUnit = async (req, res) => {
  try {

    let unit = []
    let unitId = []
    if (req.user && req.user.role === 'managment') {
      unit = await Unit.find({ _id: { $in: [req.user.units] } }).select('_id unit_name')
    }
    if (req.user && req.user.role === 'superadmin' || req.thana) {
      unit = await Unit.find().select('_id unit_name')
    }
    for (let i = 0; i < unit.length; i++) {
      unitId.push(unit[i]._id)
    }
    const startDate = moment().startOf('day').toDate();
    const endDate = moment().endOf('day').toDate()
    const matchObj = {
      isOpen: false,
      unit: { $in: unitId },
      updatedAt: {
        $gte: startDate,
        $lt: endDate,
      },
    }

    const saleCals = await SalesCalc.aggregate([
      {
        $match: matchObj
      },
      {
        $group: {
          _id: "$unit",
          totalSum: { $sum: '$total_price' }
        }
      }
    ])
    const data = []

    for (let i = 0; i < unit.length; i++) {
      const saleCalMatch = saleCals.find((saleCal) =>
        unit[i]._id.toString() === saleCal._id.toString()
      );

      if (saleCalMatch) {
        data.push({ unit: unit[i].unit_name, sales: saleCalMatch.totalSum });
      }
      if (!saleCalMatch) {
        data.push({ unit: unit[i].unit_name, sales: 0 });
      }
    }
    res.send({ status: 'success', data })
  }
  catch (e) {
    console.log(e)
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.getArticlesStockCount = async (req, res) => {
  try {
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
    const search = req.query.search.value
    let unit = req.query.unit
    const sort = {}
    let data = []
    let total = 0
    if (req.query.order[0].column === '0') {
      sort['createdAt'] = req.query.order[0].dir === 'asc' ? 1 : -1
    }
    if (req.query.order[0].column === '1') {
      sort['barcode'] = req.query.order[0].dir === 'asc' ? 1 : -1
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
    let filterArticle = {
      $or: [
        { 'barcode': { $regex: search, $options: 'i' } },
        { 'name': { $regex: search, $options: 'i' } },
      ],
    }

    const workerFilter ={
      isOpen: true,
      unit
    }
 if(search){
  let artIds =[]
  let art = await Article.find({$or:[
    { 'barcode': { $regex: search, $options: 'i' } },
    { 'name': { $regex: search, $options: 'i' } },
  ]}).select('_id')
  for(let i =0;i<art.length;i++){
    artIds.push(art[i]._id)
  }
  workerFilter.article={$in:artIds}
 }
    let articleIds = []
    if (unit) {
      let filterPrice = {
        isOpen: true,
        unit
      }
      data = await WorkerCount.find(workerFilter).lean().populate('user', 'full_name').populate('article', 'name  _id').skip(skip).limit(limit).sort(sort)
      total = await WorkerCount.countDocuments(workerFilter)
      for (let i = 0; i < data.length; i++) {
        articleIds.push(data[i].article._id)
        data[i].nr = i + 1 + skip || 1 * limit
      }

      // if(tvsh){filterPrice.sale_status=true}else{filterPrice.sale_status = false}
      let sales = await SalesCalc.find({
        isOpen: false,
        unit, article: { $in: articleIds }
      }).select('article qty ')
      let supply = await SupplyCalc.find({
        isOpen: false,
        unit, article: { $in: articleIds }
      }).select('article qty ')
      for (let i = 0; i < data.length; i++) {
        const currentArticleId = data[i].article._id
        const articleSales = sales.filter((sale) => sale.article.equals(currentArticleId));
        const articleSupplies = supply.filter((supply) => supply.article.equals(currentArticleId));
        let sale_qty = 0;
        let supply_qty = 0;



        articleSupplies.forEach((supply) => {
          supply_qty += supply.qty;
        });

        articleSales.forEach((sale) => {
          sale_qty += sale.qty;
        });
        data[i].system_qty = supply_qty - sale_qty

      }
    }
    res.json({
      recordsTotal: total ? total : 0,
      recordsFiltered: total ? total : 0,
      data,
    })
  }
  catch (e) {
    console.log(e)
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}
module.exports.refuzeArticleCount = async (req, res) => {
  try {
    const { id } = req.body
    let workerCount = await WorkerCount.findOne({ isOpen: true, _id: id })
    if (!workerCount) {
      return res.status(400).send({ status: 'fail', message: "Nuk keni numrim për ta refuzuar" })
    }
    await WorkerCount.findOneAndUpdate({ isOpen: true, _id: id }, { isOpen: false })
    res.status(200).send({ status: 'success', message: 'Numrimi  u refuzua me sukses' })
  }
  catch (e) {
    const errors = handleErrors(e)
    console.log(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}

module.exports.acceptArticleCount = async (req, res) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const { id } = req.body
    let workerCount = await WorkerCount.findOne({
      isOpen: true,
      _id: id
    }).populate('article', '_id barcode price_supply')
    if (!workerCount) {
      return res.status(400).send({ status: 'fail', message: "Nuk keni numrim për ta pranuar" })
    }
    let sales = await SalesCalc.find({
      isOpen: false,
      unit: workerCount.unit, article: workerCount.article._id
    }).select(' qty ')
    let supplys = await SupplyCalc.find({
      isOpen: false,
      unit: workerCount.unit, article: workerCount.article._id
    }).select('qty')
    let sale_qty = 0;
    let supply_qty = 0;
    supplys.forEach((supply) => {
      supply_qty += supply.qty;
    });
    sales.forEach((sale) => {
      sale_qty += sale.qty;
    });
    let count = workerCount.qty - supply_qty - sale_qty
    await WorkerCount.findOneAndUpdate({
      isOpen: true,
      _id: id
    }, { isOpen: false }, { session })
    const articlePrice = await ArticlePrice.findOne({unit:workerCount.unit,article:workerCount.article._id}).select('price_few price_many')
    const supply = new Supply({ unit: workerCount.unit, date: moment().format('YYYY-MM-DD'), supplier: workerCount.unit, invoice: 'Numrim stoku', buy_type: 'count', code: nanoid(12), isOpen: false, nr_producs: count })
    await supply.save({ session })
    const supplyCalc = new SupplyCalc({
      supply: supply._id,
      barcode: workerCount.article.barcode,
      price_many: articlePrice.price_many,
      price_few: articlePrice.price_few,
      mazh: 0,
      price:count&&count >0? workerCount.article.price_supply:0,
      qty: count,
      rab_1: 0,
      rab_2: 0,
      discount: 0,
      article: workerCount.article._id,
      total_price:count&&count >0? workerCount.article.price_supply * count:0,
      tvsh: 0,
      unit: workerCount.unit,
      isOpen: false
    })
    await supplyCalc.save({ session })
    await session.commitTransaction()
    res.status(200).send({ status: 'success', message: 'Numrimi  nuk u pranua me sukses' })
  }
  catch (e) {
    const errors = handleErrors(e)
    console.log(e)
    await session.abortTransaction()
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
  finally {
    session.endSession()
  }
}

module.exports.addArticleCount = async (req, res) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const { id } = req.body
    let workerCount = await WorkerCount.findOne({
      isOpen: true,
      _id: id
    }).populate('article', '_id barcode price_supply')
    if (!workerCount) {
      return res.status(400).send({ status: 'fail', message: "Nuk keni numrim për ta pranuar" })
    }
    let count = workerCount.qty
    await WorkerCount.findOneAndUpdate({
      isOpen: true,
      _id: id
    }, { isOpen: false }, { session })
    const articlePrice = await ArticlePrice.findOne({unit:workerCount.unit,article:workerCount.article._id}).select('price_few price_many')
    const supply = new Supply({ unit: workerCount.unit, date: moment().format('YYYY-MM-DD'), supplier: workerCount.unit, invoice: 'Numrim stoku', buy_type: 'count', code: nanoid(12), isOpen: false, nr_producs: count })
    await supply.save({ session })
    const supplyCalc = new SupplyCalc({
      supply: supply._id,
      barcode: workerCount.article.barcode,
      price_many: articlePrice.price_many,
      price_few: articlePrice.price_few,
      mazh: 0,
      price:count&&count >0? workerCount.article.price_supply:0,
      qty: count,
      rab_1: 0,
      rab_2: 0,
      discount: 0,
      article: workerCount.article._id,
      total_price:count&&count >0? workerCount.article.price_supply * count:0,
      tvsh: 0,
      unit: workerCount.unit,
      isOpen: false
    })
    await supplyCalc.save({ session })
    await session.commitTransaction()
    res.status(200).send({ status: 'success', message: 'Numrimi  nuk u pranua me sukses' })
  }
  catch (e) {
    const errors = handleErrors(e)
    console.log(e)
    await session.abortTransaction()
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
  finally {
    session.endSession()
  }
}

module.exports.findArticlePos = async (req, res) => {
  try {
    const skip = parseInt(req.query.start)
    const limit = parseInt(req.query.length)
    const search = req.query.search.value
    const searchType = req.query.searchType
    const unit = await Unit.find().select('_id unit_name address')
    let data = []
    let total = 0
    let filter = {}
    let filterPrice = {}
    if (searchType === 'barcode') {
      filter = { 'barcode': { $regex: search, $options: 'i' } }
    }
    if (searchType === 'name') {
      filter = { 'name': { $regex: search, $options: 'i' } }
    }
    if (searchType === 'code') {
      filter = { 'code': { $regex: search, $options: 'i' } }
    }
    let articleIds = []
    data = await Article.find(filter).lean().skip(skip).limit(limit)
    total = await Article.countDocuments(filter)
    for (let i = 0; i < data.length; i++) {
      articleIds.push(data[i]._id)
      // data[i].nr=i+1+skip||1*limit
    }

    if (data) {
      let sales = await SalesCalc.find({ isOpen: false, article: { $in: articleIds } }).select('qty unit article')
      let supply = await SupplyCalc.find({ isOpen: false, article: { $in: articleIds } }).select('qty unit article')
      let articles = []
      for (let i = 0; i < data.length; i++) {
        for (let a = 0; a < unit.length; a++) {
          const currentArticleId = data[i]._id
          const currentUnitId = unit[a]._id
          const articleSales = sales.filter((sale) => sale.article.equals(currentArticleId) && sale.unit.equals(currentUnitId));
          const articleSupplies = supply.filter((supply) => supply.article.equals(currentArticleId) && supply.unit.equals(currentUnitId));
          let sale_qty = 0;
          let supply_qty = 0;



          articleSupplies.forEach((supply) => {
            supply_qty += supply.qty;
          });

          articleSales.forEach((sale) => {
            sale_qty += sale.qty;
          });
          articles.push({ ...data[i], qty: supply_qty - sale_qty, unit: unit[a].unit_name, address: unit[a].address })
        }
      }
      data = articles
      for (let i = 0; i < data.length; i++) {
        data[i].nr = i + 1 + skip || 1 * limit
      }
    }

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

module.exports.getArticleStockDetails = async (req, res) => {
  try {
    let unit = req.body.unit
    let date = req.body.date
    const starDate = moment(date.split('-')[0].replace(' ', ''), "DD/MM/YYYY").startOf('day').toDate()
    const endDate = moment(date.split('-')[1].replace(' ', ''), "DD/MM/YYYY").endOf('day').toDate()
    let data = []
    let total_profit = 0
    let total_revenu = 0
    let total_cost = 0


    let articleIds = []
    if (unit) {
      let filterPrice = {
        updatedAt: {
          $gte: starDate,
          $lt: endDate,
        },
        isOpen: false,
        unit
      }
      data = await Article.find({}).select('_id price_supply').lean()
      for (let i = 0; i < data.length; i++) {
        articleIds.push(data[i]._id)
      }

      filterPrice.article = { $in: articleIds }

      // if(tvsh){filterPrice.sale_status=true}else{filterPrice.sale_status = false}
      let sales = await SalesCalc.find(filterPrice).select('article qty total_price')
      let supply = await SupplyCalc.find(filterPrice).select('article qty total_price')
      for (let i = 0; i < data.length; i++) {
        const currentArticleId = data[i]._id
        const articleSales = sales.filter((sale) => sale.article.equals(currentArticleId));
        const articleSupplies = supply.filter((supply) => supply.article.equals(currentArticleId));

        let totalCost = 0;
        let totalRevenue = 0;
        let sale_qty = 0;
        let supply_qty = 0;
        let salePrices = []
        let supplyPrices = []

        articleSupplies.forEach((supply) => {
          totalCost += supply.total_price?supply.total_price:parseFloat((data[i].price_supply*supply.qty).toFixed(2));
          supply_qty += supply.qty;
          if (supply.qty > 0) {
            supplyPrices.push(supply.total_price?parseFloat(supply.total_price / supply.qty):data[i].price_supply);
          }
        });


        articleSales.forEach((sale) => {
          totalRevenue += sale.total_price;
          sale_qty += sale.qty;
          if (sale.qty > 0) {
            salePrices.push(parseFloat(sale.total_price / sale.qty));
          }
        });
        const sumSup = supplyPrices.reduce((a, b) => a + b, 0);
        const avgSup = (sumSup / supplyPrices.length) || 0;
        const sumSell = salePrices.reduce((a, b) => a + b, 0);
        const avgSell = (sumSell / salePrices.length) || 0;
        data[i].profit = parseFloat(avgSell * sale_qty - avgSup * sale_qty).toFixed(2)
        data[i].totalRevenue = totalRevenue
        data[i].totalCost = totalCost
      }
    }
    for (let i = 0; i < data.length; i++) {
      total_cost += data[i].totalCost
      total_revenu += data[i].totalRevenue
      total_profit += parseFloat(data[i].profit)
    }
    res.json({
      status: 'success',
      total_cost: parseFloat(total_cost).toFixed(2),
      total_revenu: parseFloat(total_revenu).toFixed(2),
      total_profit: parseFloat(total_profit).toFixed(2)
    })
  }
  catch (e) {
    console.log(e)
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}
module.exports.stockProductEditSupply = async(req,res)=>{
  try{
    const {id,qty} = req.body
    const supply = await SupplyCalc.findById(id)
    if(!supply){
     return res.send({status:'fail',message:'Nuk keni furnizim për editim'})
    }
    let price =supply.total_price/supply.qty
    let total_price =price * qty
    await SupplyCalc.findByIdAndUpdate(id,{qty,total_price:parseFloat(total_price).toFixed(2)})
      let dif =supply.total_price -total_price
      let supOndb = await Supply.findById(supply.supply)
      supOndb.total_price =  parseFloat(supOndb.total_price -dif).toFixed(2)
      await supOndb.save()
    res.send({status:'success',message:'Sasia u përditsua me sukses'})
  }
  catch(e){
    console.log(e)
    const errors = handleErrors(e)
    res.status(400).send({ status: 'fail', message: "Diqka shkoi gabim provoni përsëri", errors })
  }
}