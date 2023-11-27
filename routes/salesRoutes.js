const express = require('express');
const salesController = require('../controllers/salesController')
const { requireAuth, authRole, checkUser, checkLogin } = require('../middlewares/authMiddleware')
// 

  const router = express.Router();

router.get('/get-article',salesController.getArticle)
router.get('/get-sales',salesController.getSales)
router.patch('/delete-sale',salesController.deleteSale)
router.post('/add-sale-many',salesController.addSaleMany)
router.post('/add-sale-articles',requireAuth,salesController.addSaleArticles)
router.patch('/delete-sale-article',requireAuth,salesController.deleteArticleSale)
router.post('/close-sale',requireAuth,salesController.closeSale)
router.get('/get-article-pos',requireAuth,salesController.getArticlePos)
router.get('/get-sales-pos',requireAuth,salesController.getSalesPos)
router.post('/add-sale-pos',requireAuth,salesController.addSalePos)
router.get('/get-articles-pos',requireAuth,salesController.getArticlesPos)
router.post('/edit-sale-article-qty',requireAuth,salesController.editSaleArticleQty)
router.post('/close-sale-few',requireAuth,salesController.closeSaleFew)
router.patch('/delete-all-articles',requireAuth,salesController.deleteAllArticle)
router.post('/open-arc',requireAuth,salesController.openArc)
router.post('/add-expense-category',requireAuth,salesController.addExpenseCategory)
router.post('/add-expense',requireAuth,salesController.addExpense)
router.patch('/remove-expense',requireAuth,salesController.removeExpense)
router.get('/get-expenses',requireAuth,salesController.getExpenses)
router.get('/get-sales-arc',requireAuth,salesController.getSalesArc)
router.get('/get-deleted-article',requireAuth,salesController.getDeletedArticle)
router.get('/find-loyalty-card-users',requireAuth,salesController.findLoyaltyCardUsers)
router.post('/update-article-prices',requireAuth,salesController.updateArticlePrices)










module.exports=router