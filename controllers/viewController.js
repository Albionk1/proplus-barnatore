const Company = require("../models/companyModel")
const Authorization = require("../models/authorizationModel")
const Unit = require("../models/unitModel")
const Group = require("../models/groupModel")
const SubGroup = require("../models/subGroupModel")
const Zone = require("../models/zoneModel")
const Manufacturer = require("../models/manufacturerModel")
const Article = require("../models/articleModel")
const Supplier = require("../models/supplierModel")
const Client = require("../models/clientModel")
const ArticlePrice = require("../models/articlePriceModel")
const Supply = require('../models/supplyModel')
const Action = require('../models/actionModel')
const ActionCalc = require("../models/actionCalcModel")
const Offert = require("../models/offerModel")
const Sales = require("../models/salesModel")
const Arc = require("../models/arcModel")
const ExpenseCategory = require("../models/expenseCategoryModel")
const Expense = require("../models/expenseModel")
const User = require("../models/userModel")
const LoyaltyCard = require("../models/loyaltyCardModel")
const moment = require('moment')
const mongoose = require('mongoose')
const Transfer = require('../models/transferModel')
const Politics = require('../models/politicsModel')
const CategoryOutcome = require('../models/categoryOutcomeModel')




module.exports.getLoginPage = (req, res) => {
    res.status(200).render('login')
}
module.exports.getLoginPageThana = (req, res) => {
    res.status(200).render('loginThana')
}
//admin
module.exports.getAdminProfilePage = (req, res) => {
    res.status(200).render('admin/profile')
}
module.exports.getAdminIndexPage = async (req, res) => {
    try {
        const startDate = moment().startOf('day').toDate();
        const endDate = moment().endOf('day').toDate()
        let unit = []
        let unitId = []
        if (req.user && req.user.role === 'managment') {
            unit = await Unit.find({ _id: { $in: [req.user.units] },status:true }).select('_id unit_name')
        }
        if (req.user && req.user.role === 'superadmin') {
            unit = await Unit.find({status:true}).select('_id unit_name')
        }
        if(req.thana){
            unit = await Unit.find().select('_id unit_name')
        }
        for (let i = 0; i < unit.length; i++) {
            unitId.push(unit[i]._id)
        }
        const matchObj = {
            unit: { $in: unitId },
            createdAt: {
                $gte: startDate,
                $lt: endDate,
            },
        }
        const arcIds = []
        const arc = await Arc.find(matchObj).populate('seller', 'full_name').populate('unit', 'unit_name').lean()
        for (let i = 0; i < arc.length; i++) {
            arcIds.push(arc[i]._id)
        }
        const sales = await Sales.aggregate([
            {
                $match: { arc: { $in: arcIds }, isOpen: false }
            },
            {
                $group: {
                    _id: "$arc",
                    totalSales: { $sum: '$total_price' }
                }
            }
        ])
        for (let i = 0; i < arc.length; i++) {

            sales.forEach((sale) => {
                if (sale._id.toString() === arc[i]._id.toString()) {
                    arc[i].totalSales = sale.totalSales
                }
            });

        }
        res.status(200).render('admin/index', { moment, arc })
    }
    catch (e) {
        res.status(200).redirect('back')
    }
}


module.exports.getAdminArcPage = async (req, res) => {
    try {
        let unit = []
        if (req.user && req.user.role === 'managment') {
            unit = await Unit.find({ _id: { $in: [req.user.units] },status:true }).select('_id unit_name')
        }
        if (req.user && req.user.role === 'superadmin') {
            unit = await Unit.find({status:true}).select('_id unit_name')
        }
        if(req.thana){
            unit = await Unit.find().select('_id unit_name')
        }
        res.status(200).render('admin/arc', { unit })

    }
    catch (e) {
        res.status(200).redirect('back')
    }
}
module.exports.getAdminArcSeePage = async (req, res) => {
    try {
        const arc = await Arc.findById(req.params.id).populate('unit', 'unit_name').populate('seller', 'full_name')
        if (!arc) {
            return res.status(200).redirect('back')
        }
        res.status(200).render('admin/arc-see', { arc, moment })

    }
    catch (e) {
        console.log(e)
        res.status(200).redirect('back')

    }
}



module.exports.getAdminArticlesPage = async (req, res) => {
    try {
        const group = await Group.find()
        const subgroup = await SubGroup.find()
        const zone = await Zone.find()
        const manufacturer = await Manufacturer.find()
        res.status(200).render('admin/articles', { group, subgroup, zone, manufacturer })
    }
    catch (e) {
        res.status(200).redirect('back')
    }
}
module.exports.getAdminArticlesUpdatePage = async (req, res) => {
    try {
        const group = await Group.find()
        const subgroup = await SubGroup.find()
        const zone = await Zone.find()
        const manufacturer = await Manufacturer.find()
        const article = await Article.findById(req.params.id).lean()
        if (!article) {
            return res.status(200).redirect('back')
        }
        if(req.user.unit){
            const articlePrice = await ArticlePrice.findOne({article:req.params.id,unit:req.user.unit}).select('price_few price_many')
            article.price_few =articlePrice.price_few
            article.price_many =articlePrice.price_many
        }
        res.status(200).render('admin/articles-edit', { group, subgroup, zone, manufacturer, article })
    }
    catch (e) {
        res.status(200).redirect('back')
    }
}
module.exports.getAdminClientsPage = (req, res) => {
    res.status(200).render('admin/clients')
}


module.exports.getAdminCompanyPage = async (req, res) => {
    try {
        let comp = {}
        let company = await Company.findOne({})
        if (company) {
            comp = company
        }
        res.status(200).render('admin/company', { comp })
    }
    catch (e) {
        res.status(200).redirect('back')
    }
}
module.exports.getAdminCompanyUnitPage = async (req, res) => {
    try {
        let unit = await Unit.find()
        let articlePrice = await ArticlePrice.countDocuments()
        const authorization = await Authorization.find({ isActive: true, used: false }).select('token')
        res.status(200).render('admin/company-unit', { authorization, unit, articlePrice })
    }
    catch (e) {
        res.status(200).redirect('back')
    }
}
module.exports.getAdminCompanyPoliticsPage = (req, res) => {
    res.status(200).render('admin/company-politics')
}



module.exports.getAdminOffersPage = async (req, res) => {
    try {

        const unit = await Unit.find()
        res.status(200).render('admin/offers', { unit })
    }
    catch (e) {
        res.status(200).redirect('back')
    }
}
module.exports.getAdminOfferNewPage = async (req, res) => {
    try {
        const clientOnDb = await Client.find()
        let offert
        const unit = await Unit.find()
        if (req.query.offert) {
            offert = await Offert.findById(req.query.offert)
            if (!offert || offert.isOpen === false) {
                return res.status(200).redirect('/admin/offer-new')
            }
        }
        res.status(200).render('admin/offer-new', { clientOnDb, unit, offert })
    }
    catch (e) {
        res.status(200).redirect('back')
    }
}
module.exports.getAdminOffersClientsPage = async (req, res) => {
    try {
        res.status(200).render('admin/offers-clients')

    }
    catch (e) {
        res.status(200).redirect('back')

    }
}
module.exports.getAdminOffersClientsSeesPage = async (req, res) => {
    try {
        const supplier = await Client.findById(req.params.id)
        if (!supplier) {
            return res.status(200).redirect('back')
        }
        res.status(200).render('admin/offers-clients-see', { supplier })


    }
    catch (e) {
        res.status(200).redirect('back')
    }
}



module.exports.getAdminPartnersPage = (req, res) => {
    res.status(200).render('admin/partners')
}

module.exports.getAdminSalesWholesalePage = async (req, res) => {
    try {
        const clientOnDb = await Client.find()
        let offert
        let sale
        const unit = await Unit.find()
        if (req.query.offert) {
            offert = await Offert.findById(req.query.offert)
            if (!offert || offert.isOpen === false) {
                return res.status(200).render('admin/sales-wholesale', { clientOnDb, unit, offert })
            }
        }
        if (req.query.sale) {
            sale = await Sales.findById(req.query.sale)
            if (!sale) {
                return res.status(200).redirect('/admin/sales-wholesale')
            }
            offert = sale
            offert.sale = true
        }
        res.status(200).render('admin/sales-wholesale', { clientOnDb, unit, offert })

    }
    catch (e) {

    }

}


module.exports.getAdminSharesPage = async (req, res) => {
    try {
        const unit = await Unit.find()
        res.status(200).render('admin/shares', { unit })

    }
    catch (e) {
        res.status(200).redirect('back')
    }
}
module.exports.getAdminSharesNewPage = async (req, res) => {
    try {
        const action = await Action.findById(req.params.id).populate('unit', 'unit_name')
        if (!action) {
            return res.status(200).redirect('back')
        }
        const total_product = await ActionCalc.countDocuments({ action: req.params.id })
        res.status(200).render('admin/shares-new', { action, total_product,moment })
    }
    catch (e) {
        console.log(e);
        res.status(200).redirect('back')
    }
}

module.exports.getAdminStatisticCashflowPage =async (req, res) => {
    try{
        let unit = []
        if (req.user && req.user.role === 'managment') {
            unit = await Unit.find({ _id: { $in: [req.user.units] },status:true }).select('_id unit_name')
        }
        if (req.user && req.user.role === 'superadmin') {
            unit = await Unit.find({status:true}).select('_id unit_name')
        }
        if(req.thana){
            unit = await Unit.find().select('_id unit_name')
        }
        const category_invest = await CategoryOutcome.find({deleted:false,type:'strategic_investment'}).select('_id name')
        const category_outcome = await CategoryOutcome.find({deleted:false,type:'outcome'}).select('_id name')

    res.status(200).render('admin/statistic-cashflow',{unit,category_invest,category_outcome})

    }
    catch(e){
        console.log(e);
        res.status(200).redirect('back')
    }
}
module.exports.getAdminStatisticGeneralflowPage = async(req, res) => {
    try{
        let unit = []
        if (req.user && req.user.role === 'managment') {
            unit = await Unit.find({ _id: { $in: [req.user.units] },status:true }).select('_id unit_name')
        }
        if (req.user && req.user.role === 'superadmin') {
            unit = await Unit.find({status:true}).select('_id unit_name')
        }
        if(req.thana){
            unit = await Unit.find().select('_id unit_name')
        }
    res.status(200).render('admin/statistic-general',{unit})

    }
    catch(e){
        res.status(200).redirect('back')
    }
}



module.exports.getAdminStockPage = async (req, res) => {
    try {
        let unit = []
        if (req.user && req.user.role === 'managment') {
            unit = await Unit.find({ _id: { $in: [req.user.units] },status:true }).select('_id unit_name')
        }
        if (req.user && req.user.role === 'superadmin') {
            unit = await Unit.find({status:true}).select('_id unit_name')
        }
        if(req.thana){
            unit = await Unit.find().select('_id unit_name')
        }
        const group = await Group.find()
        const subGroup = await SubGroup.find()
        const zone = await Zone.find()
        const manufacturer = await Manufacturer.find()


        res.status(200).render('admin/stock', { unit, group, subGroup, zone, manufacturer })
    } catch (e) {
        res.status(200).redirect('back')
    }

}
module.exports.getAdminStockCountPage = async (req, res) => {
    try {
        let unit = []
        if (req.user && req.user.role === 'managment') {
            unit = await Unit.find({ _id: { $in: [req.user.units] },status:true }).select('_id unit_name')
        }
        if (req.user && req.user.role === 'superadmin') {
            unit = await Unit.find({status:true}).select('_id unit_name')
        }
        if(req.thana){
            unit = await Unit.find().select('_id unit_name')
        }
        res.status(200).render('admin/stock-count', { unit})
    } catch (e) {
        res.status(200).redirect('back')
    }

}
module.exports.getAdminStockProductPage = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).select('_id name')
        let unit = []
        if (!article) {
            return res.status(200).redirect('back')
        }
        if (req.user && req.user.role === 'managment') {
            unit = await Unit.find({ _id: { $in: [req.user.units] },status:true }).select('_id unit_name')
        }
        if (req.user && req.user.role === 'superadmin') {
            unit = await Unit.find({status:true}).select('_id unit_name')
        }
        if(req.thana){
            unit = await Unit.find().select('_id unit_name')
        }
        const articles = await Article.find().select('_id name')
        res.status(200).render('admin/stock-product', { article, unit, articles })
    }
    catch (e) {
        res.status(200).redirect('back')
    }
}


module.exports.getAdminSuppliesPage = async (req, res) => {
    try {
        const unit = await Unit.find()
        res.status(200).render('admin/supplies', { unit })
    }
    catch (e) {
        res.status(200).redirect('back')
    }
}
module.exports.getAdminSupplyNewPage = async (req, res) => {
    try {
        let supply
        const furnitorOnDb = await Supplier.find()
        const unit = await Unit.find()
        if (req.query.supply) {
            supply = await Supply.findById(req.query.supply)
            if (!supply) {
                return res.status(200).redirect('/admin/supplies')
            }
        }
        res.status(200).render('admin/supply-new', { furnitorOnDb, unit, supply })

    }
    catch (e) {

        res.status(200).redirect('back')
    }
}
module.exports.getAdminSupplierNewPage = (req, res) => {
    res.status(200).render('admin/supplier-new')
}
module.exports.getAdminSupplierSeePage = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id)
        const unit = await Unit.find()
        if (!supplier) {
            return res.status(200).redirect('back')
        }
        res.status(200).render('admin/supplier-see', { supplier, unit })

    }
    catch (e) {
        res.status(200).redirect('back')
    }
}


module.exports.getAdminThanaDevPage = (req, res) => {
    res.status(200).render('admin/thana-dev')
}
module.exports.getAdminThanaDevUnitPage = (req, res) => {
    res.status(200).render('admin/thana-dev-unit')
}



module.exports.getAdminWorkersPage = async (req, res) => {
    try {
        let unit = []
        if (req.user && req.user.role === 'managment') {
            unit = await Unit.find({ _id: { $in: [req.user.units] },status:true }).select('_id unit_name')
        }
        if (req.user && req.user.role === 'superadmin') {
            unit = await Unit.find({status:true}).select('_id unit_name')
        }
        if(req.thana){
            unit = await Unit.find().select('_id unit_name')
        }
        res.status(200).render('admin/workers', { unit })
    }
    catch (e) {
        res.status(200).redirect('back')

    }
}
module.exports.getAdminWorkerNewPage = async (req, res) => {
    try {
        const company = await Company.findOne()
        const unit = await Unit.find()
        res.status(200).render('admin/worker-new', { unit, company })
    }
    catch (e) {
        res.status(200).redirect('back')
    }
}
module.exports.getAdminWorkerWagesPage = async(req, res) => {
    try{
        let unit = []
        if (req.user && req.user.role === 'managment') {
            unit = await Unit.find({ _id: { $in: [req.user.units] },status:true }).select('_id unit_name')
        }
        if (req.user && req.user.role === 'superadmin') {
            unit = await Unit.find({status:true}).select('_id unit_name')
        }
        if(req.thana){
            unit = await Unit.find().select('_id unit_name')
        }
        res.status(200).render('admin/worker-wage',{unit})
    }
    catch(e){
        res.status(200).redirect('back')
    }
}
module.exports.getAdminWorkerStockCountPage = (req, res) => {
    res.status(200).render('admin/worker-stock-count')
}
module.exports.getAdminWorkerCardPage = async (req, res) => {
    try {
        const useri = await User.findById(req.params.id).populate('unit', 'unit_name')
        if (!useri) {
            res.status(200).redirect('back')
            return
        }
        const sale = await Sales.aggregate([
            {
                $match: { cashier: new mongoose.Types.ObjectId(req.params.id), isOpen: false }
            },
            {
                $group: {
                    _id: '$cashier',
                    maxTotalPrice: { $max: '$total_price' },
                    minTotalPrice: { $min: '$total_price' },
                },
            },
        ])
        let max = 0;
        let min = 0;

        if (sale.length > 0 && sale[0].maxTotalPrice !== undefined) {
            max = sale[0].maxTotalPrice;
        }
        if (sale.length > 0 && sale[0].maxTotalPrice !== undefined) {
            min = sale[0].minTotalPrice;
        }
        const loyaltyCard = await LoyaltyCard.countDocuments({ cashier: useri._id })
        res.status(200).render('admin/worker-card', { useri, max, min, loyaltyCard })
    }
    catch (e) {
        console.log(e)
        res.status(200).redirect('back')
    }
}
module.exports.getAdminWorkerEditPage = async (req, res) => {
    try {
        const useri = await User.findById(req.params.id).populate('unit', 'unit_name')
        if (!useri) {
            res.status(200).redirect('back')
            return
        }
        const unit = await Unit.find()
        res.status(200).render('admin/worker-edit', { useri ,unit})
    }
    catch (e) {
        console.log(e)
        res.status(200).redirect('back')
    }
}


module.exports.getAdminInternalMovesPage = async(req, res) => {
    try{
        let unit = []
        if (req.user && req.user.role === 'managment') {
            unit = await Unit.find({ _id: { $in: [req.user.units] },status:true }).select('_id unit_name')
        }
        if (req.user && req.user.role === 'superadmin') {
            unit = await Unit.find({status:true}).select('_id unit_name')
        }
        if(req.thana){
            unit = await Unit.find().select('_id unit_name')
        }
        const unitIds=[]
        for(let i =0;i<unit.length;i++){
            unitIds.push(unit[i]._id)
        }
        const filter={ isOpen:false,
            unit:{$in:unitIds},
            transfer_type:'request',
            status:'waiting'}
            const filterTransfer={ isOpen:false,
                unit:{$in:unitIds},
                transfer_type:'transfer',
                status:'waiting'}
                let  transferTotal = await Transfer.countDocuments(filterTransfer)
            let  requestTotal = await Transfer.countDocuments(filter)
 res.status(200).render('admin/internal-moves',{unit,requestTotal,transferTotal})
    }
    catch(e){
        res.status(200).redirect('back')
    }
   
}
module.exports.getAdminInternalWaitingsPage = async(req, res) => {
    try{
       let unit = []
       if (req.user && req.user.role === 'managment') {
        unit = await Unit.find({ _id: { $in: [req.user.units] },status:true }).select('_id unit_name')
    }
    if (req.user && req.user.role === 'superadmin') {
        unit = await Unit.find({status:true}).select('_id unit_name')
    }
    if(req.thana){
        unit = await Unit.find().select('_id unit_name')
    }
    const unitIds=[]
    for(let i =0;i<unit.length;i++){
        unitIds.push(unit[i]._id)
    }
    const filter={ isOpen:false,
        unit_for:{$in:unitIds},
        transfer_type:'transfer',
        status:'waiting'}
        const filterWaiting={ isOpen:false,
            unit:{$in:unitIds},
            transfer_type:'request',
            status:'waiting'}
        let  transferTotal = await Transfer.countDocuments(filter)
        let  requestTotal = await Transfer.countDocuments(filterWaiting)

res.status(200).render('admin/internal-waitings',{unit,transferTotal,requestTotal}) 
    }
catch(e){
    res.status(200).redirect('back')
}
}
module.exports.getAdminInternalCompletedPage = async(req, res) => {
    try{
        let unit = []
        if (req.user && req.user.role === 'managment') {
            unit = await Unit.find({ _id: { $in: [req.user.units] },status:true }).select('_id unit_name')
        }
        if (req.user && req.user.role === 'superadmin') {
            unit = await Unit.find({status:true}).select('_id unit_name')
        }
        if(req.thana){
            unit = await Unit.find().select('_id unit_name')
        }
        const unitIds=[]
        for(let i =0;i<unit.length;i++){
            unitIds.push(unit[i]._id)
        }
        const filter={ isOpen:false,
            unit_for:{$in:unitIds},
            transfer_type:'transfer',
            status:'waiting'}
            const filterWaiting={ isOpen:false,
                unit:{$in:unitIds},
                transfer_type:'request',
                status:'waiting'}
            let  transferTotal = await Transfer.countDocuments(filter)
            let  requestTotal = await Transfer.countDocuments(filterWaiting)
        res.status(200).render('admin/internal-completed',{unit,transferTotal,requestTotal})

    }
    catch(e){
        res.status(200).redirect('back')
    }
}
module.exports.getAdminInternalRefusalPage = async(req, res) => {
    try{
        let unit = []
        if (req.user && req.user.role === 'managment') {
            unit = await Unit.find({ _id: { $in: [req.user.units] },status:true }).select('_id unit_name')
        }
        if (req.user && req.user.role === 'superadmin') {
            unit = await Unit.find({status:true}).select('_id unit_name')
        }
        if(req.thana){
            unit = await Unit.find().select('_id unit_name')
        }
        const unitIds=[]
        for(let i =0;i<unit.length;i++){
            unitIds.push(unit[i]._id)
        }
        const filter={ isOpen:false,
            unit_for:{$in:unitIds},
            transfer_type:'transfer',
            status:'waiting'}
            const filterWaiting={ isOpen:false,
                unit:{$in:unitIds},
                transfer_type:'request',
                status:'waiting'}
            let  transferTotal = await Transfer.countDocuments(filter)
            let  requestTotal = await Transfer.countDocuments(filterWaiting)
        res.status(200).render('admin/internal-refusal',{unit,transferTotal,requestTotal})

    }
    catch(e){
        res.status(200).redirect('back')
    }
}
module.exports.getAdminInternalSearchPage = (req, res) => {
    res.status(200).render('admin/merchandise-search')
}
module.exports.getAdminMerchandiseHistoricPage = (req, res) => {
    res.status(200).render('admin/merchandise-historic')
}
module.exports.getAdminMerchandiseTransferPage = async (req, res) => {
    try {
        let unit 
        let unit_for = []
        if (req.user && req.user.role === 'managment') {
            unit = await Unit.find({ _id: { $in: [req.user.units] },status:true }).select('_id unit_name')
        }
        if (req.user && req.user.role === 'superadmin') {
            unit = await Unit.find({status:true}).select('_id unit_name')
        }
        if(req.thana){
            unit = await Unit.find().select('_id unit_name')
        }
        let transfer
        if (req.query.transfer) {
            transfer = await Transfer.findById(req.query.transfer)
            if (!transfer || (transfer.isOpen == false &&transfer.transfer_type!=='request')) {
                res.status(200).redirect('/admin/merchandise-transfer')
            }
        }
        unit_for = unit
        res.status(200).render('admin/merchandise-transfer', { unit, transfer, unit_for })
    }
    catch (e) {
        console.log(e)
        res.status(200).redirect('back')
    }
}

//pos
module.exports.getPosProfilePage = (req, res) => {
    res.status(200).render('pos/profile')
}
module.exports.getPosIndexPage = async (req, res) => {
    try {
        let politics
        const expenseCategory = await ExpenseCategory.find({ unit: req.user.unit })
        const arcOnDb = await Arc.findOne({ isOpen: true, seller: req.user._id })
        if(req.user.unit){
            politics = await Politics.findOne({unit:req.user.unit}).select('keyboard')
        }
        res.status(200).render('pos/index', { arc: arcOnDb, expenseCategory,politics})
    }
    catch (e) {

        res.status(200).redirect('back')
    }
}
module.exports.getPosPartnerPage = async (req, res) => {
    try {
        res.status(200).render('pos/partner', { expenseCategory: [] })

    }
    catch (e) {

        res.status(200).redirect('back')
    }
}

module.exports.getPosArchPage = async (req, res) => {
    try {
        let amount_expense = 0
        let total_sells = 0
        let sales_kesh = 0
        let sales_bank = 0

        const arcOnDb = await Arc.findOne({ isOpen: true, seller: req.user._id }).select('startCount')
        const expenseDb = await Expense.find({ arc: arcOnDb._id }).select('amount')
        const sales = await Sales.find({ arc: arcOnDb._id }).select('payment_type total_price')
        for (let i = 0; i < expenseDb.length; i++) {
            amount_expense += expenseDb[i].amount
        }
        for (let i = 0; i < sales.length; i++) {
            total_sells += sales[i].total_price
            if (sales[i].payment_type === 'cash') {
                sales_kesh += sales[i].total_price
            }
            if (sales[i].payment_type === 'bank') {
                sales_bank += sales[i].total_price
            }
        }
        res.status(200).render('pos/arc', { arc: arcOnDb, expenseCategory: [], amount_expense: parseFloat(amount_expense).toFixed(2), total_sells: parseFloat(total_sells).toFixed(2), sales_kesh: parseFloat(sales_kesh).toFixed(2), sales_bank: parseFloat(sales_bank).toFixed(2) })
    }
    catch (e) {
        res.status(200).redirect('back')
    }
}

module.exports.getPosSearchProductPage = async (req, res) => {
    try {
        res.status(200).render('pos/search-product', { expenseCategory: [] })

    }
    catch (e) {

        res.status(200).redirect('back')
    }
}
module.exports.notFound = async (req, res) => {
    try {
        res.status(200).redirect('/login')
    }
    catch (e) {

        res.status(200).redirect('back')
    }
}


