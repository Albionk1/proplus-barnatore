const express = require('express');
const offerController = require('../controllers/offerController')
const { requireAuth, authRole, checkUser, checkLogin } = require('../middlewares/authMiddleware')
// 
const router = express.Router();
router.get('/get-clients',offerController.getClients)
router.post('/add-client',offerController.addClient)
router.patch('/edit-client',requireAuth,offerController.editClient)
router.patch('/delete-client',offerController.deleteClient)
router.get('/get-article',offerController.getArticle)
router.get('/get-offerts',offerController.getOfferts)
router.patch('/delete-offert',offerController.deleteOffert)
router.post('/add-offert',offerController.addOffert)
router.post('/add-offert-articles',requireAuth,offerController.addOffertArticles)
router.patch('/delete-offer-article',offerController.deleteOfferArticle)
router.post('/close-offert',requireAuth,offerController.closeOffert)
router.post('/get-arbk',offerController.getArbk)
router.get('/get-offerts-main',offerController.getOffertsMain)
router.patch('/offer-for-sale',offerController.offerForSale)
router.get('/get-offerts-client-history',offerController.getOffertsClientHistory)
router.patch('/pay-client-sale',offerController.payClientSale)





module.exports=router