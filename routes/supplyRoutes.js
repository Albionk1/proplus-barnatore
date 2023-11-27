const express = require('express');
const supplyController = require('../controllers/supplyController')
const { requireAuth, authRole, checkUser, checkLogin } = require('../middlewares/authMiddleware')
// 

  const router = express.Router();

router.get('/get-suppliers',supplyController.getSuppliers)
router.post('/add-supplier',supplyController.addSupplier)
router.patch('/edit-supplier',supplyController.editSupplier)
router.patch('/delete-supplier',supplyController.deleteSupplier)
router.get('/get-article',supplyController.getArticle)
router.get('/get-supplies',supplyController.getSupplies)
router.patch('/delete-supply',supplyController.deleteSupply)
router.post('/add-supply',supplyController.addSupply)
router.patch('/edit-supply',requireAuth,supplyController.editSupply)
router.post('/add-supply-articles',requireAuth,supplyController.addSupplyArticles)
router.patch('/delete-supply-article',supplyController.deleteSupplyArticle)
router.post('/close-supply',requireAuth,supplyController.closeSupply)
router.post('/get-arbk',supplyController.getArbk)
router.get('/get-supplies-list',supplyController.getSuppliesList)
router.get('/get-supplies-card',supplyController.getSuppliesCard)
router.get('/get-articles',supplyController.getArticles)
router.post('/close-count',requireAuth,supplyController.closeCount)
router.get('/get-article-count',requireAuth,supplyController.getArticlesCount)
router.patch('/delete-count',requireAuth,supplyController.deleteCount)
router.patch('/edit-count-qty',requireAuth,supplyController.editCountQty)


module.exports=router