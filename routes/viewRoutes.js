const express = require('express')
const router = express.Router()
const { requireAuth, checkLogin, accessStaff,accessThana } = require('../middlewares/authMiddleware')

const viewController = require('../controllers/viewController');

router.get('/login', checkLogin, viewController.getLoginPage);
router.get('/login/thana', checkLogin, viewController.getLoginPageThana);


///admin
router.get('/admin/*', requireAuth)
router.get('/admin/profile', viewController.getAdminProfilePage);
router.get('/admin/index', viewController.getAdminIndexPage);

router.get('/admin/arc', accessStaff('cash_register'), viewController.getAdminArcPage);
router.get('/admin/arc-see/:id', accessStaff('cash_register'), viewController.getAdminArcSeePage);


router.get('/admin/articles', accessStaff('article'), viewController.getAdminArticlesPage);
router.get('/admin/articles-update/:id', accessStaff('article'), viewController.getAdminArticlesUpdatePage);
router.get('/admin/clients', accessStaff('clients'), viewController.getAdminClientsPage);

router.get('/admin/company', accessStaff('company'), viewController.getAdminCompanyPage);
router.get('/admin/company-unit', accessStaff('company'), viewController.getAdminCompanyUnitPage);
router.get('/admin/company-politics', accessStaff('company'), viewController.getAdminCompanyPoliticsPage);

router.get('/admin/offers', accessStaff('offerts'), viewController.getAdminOffersPage);
router.get('/admin/offer-new', accessStaff('offerts'), viewController.getAdminOfferNewPage);
router.get('/admin/offers-clients', accessStaff('offerts'), viewController.getAdminOffersClientsPage);
router.get('/admin/offers-clients-see/:id', accessStaff('offerts'), viewController.getAdminOffersClientsSeesPage);

router.get('/admin/partners', accessStaff('partners'), viewController.getAdminPartnersPage);
router.get('/admin/sales-wholesale', viewController.getAdminSalesWholesalePage);

router.get('/admin/shares', accessStaff('actions'), viewController.getAdminSharesPage);
router.get('/admin/shares-new/:id', accessStaff('actions'), viewController.getAdminSharesNewPage);

router.get('/admin/statistic-cashflow', accessStaff('statistic'), viewController.getAdminStatisticCashflowPage);
router.get('/admin/statistic-general', accessStaff('statistic'), viewController.getAdminStatisticGeneralflowPage);

router.get('/admin/stock', accessStaff('stock'), viewController.getAdminStockPage);
router.get('/admin/stock-count', accessStaff('stock'), viewController.getAdminStockCountPage);

router.get('/admin/stock-product/:id', accessStaff('stock'), viewController.getAdminStockProductPage);

router.get('/admin/supplies', accessStaff('supply'), viewController.getAdminSuppliesPage);
router.get('/admin/supply-new', accessStaff('supply'), viewController.getAdminSupplyNewPage);
router.get('/admin/supplier-new', accessStaff('supply'), viewController.getAdminSupplierNewPage);
router.get('/admin/supplier-see/:id', accessStaff('supply'), viewController.getAdminSupplierSeePage);


router.get('/admin/thana-dev',accessThana(), viewController.getAdminThanaDevPage);
router.get('/admin/thana-dev-unit', viewController.getAdminThanaDevUnitPage);

router.get('/admin/workers', accessStaff('workers'), viewController.getAdminWorkersPage);
router.get('/admin/worker-new', accessStaff('workers'), viewController.getAdminWorkerNewPage);
router.get('/admin/worker-wage', accessStaff('workers'), viewController.getAdminWorkerWagesPage);
router.get('/admin/worker-card/:id', accessStaff('workers'), viewController.getAdminWorkerCardPage);
router.get('/admin/worker-stock-count', accessStaff('counter'), viewController.getAdminWorkerStockCountPage);
router.get('/admin/worker-edit/:id', accessStaff('workers'), viewController.getAdminWorkerEditPage);


router.get('/admin/internal-moves', accessStaff('intern_exhange'), viewController.getAdminInternalMovesPage);
router.get('/admin/internal-waitings', accessStaff('intern_exhange'), viewController.getAdminInternalWaitingsPage);
router.get('/admin/internal-completed', accessStaff('intern_exhange'), viewController.getAdminInternalCompletedPage);
router.get('/admin/internal-refusal', accessStaff('intern_exhange'), viewController.getAdminInternalRefusalPage);
router.get('/admin/merchandise-search', accessStaff('intern_exhange'), viewController.getAdminInternalSearchPage);
router.get('/admin/merchandise-historic', accessStaff('intern_exhange'), viewController.getAdminMerchandiseHistoricPage);
router.get('/admin/merchandise-transfer', accessStaff('intern_exhange'), viewController.getAdminMerchandiseTransferPage);

///pos
router.get('/pos/*', requireAuth)
router.get('/pos/profile', accessStaff('pos'), viewController.getPosProfilePage);
router.get('/pos/index', accessStaff('pos'), viewController.getPosIndexPage);
router.get('/pos/partner', accessStaff('pos'), viewController.getPosPartnerPage);
router.get('/pos/arc', accessStaff('arc'), viewController.getPosArchPage);
router.get('/pos/search-product', accessStaff('pos'), viewController.getPosSearchProductPage);
router.get('*',viewController.notFound)

module.exports = router