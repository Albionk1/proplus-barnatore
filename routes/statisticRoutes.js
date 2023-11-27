const express = require('express');
const statisticController = require('../controllers/statisticController')
const { requireAuth, authRole, checkUser, checkLogin } = require('../middlewares/authMiddleware')
// 

  const router = express.Router();


  router.post('/get-article-buys-by-month',requireAuth,statisticController.getBuysByMonth)
  router.post('/get-sales-buys-profit-by-month',requireAuth,statisticController.getSalesBuysProfitByMonth)
  router.post('/get-article-sells-by-days',requireAuth,statisticController.getSellsByDayAverage)
  router.get('/get-most-saled',requireAuth,statisticController.getMostSaledArticles)
  router.get('/get-least-saled',requireAuth,statisticController.getLeastSaledArticles)
  router.post('/add-owner-investment',requireAuth,statisticController.createOwnerInvestment)
  router.get('/get-owner-investment', requireAuth,statisticController.getOwnerInvestment)
  router.patch('/edit-owner-investment',requireAuth,statisticController.editOwnerInvestment)
  router.delete('/delete-owner-investment', requireAuth,statisticController.deleteOwnerInvestment)
  router.post('/create-category',requireAuth,statisticController.createCategory)
  router.get('/get-category', requireAuth,statisticController.getCategory)
  router.patch('/edit-category',requireAuth,statisticController.editCategory)
  router.patch('/delete-category',requireAuth,statisticController.deleteCategory)
  router.post('/add-strategic-investment',requireAuth,statisticController.addStrategicInvestment)
  router.get('/get-strategic-investment', requireAuth,statisticController.getStrategicInvestment)
  router.patch('/edit-strategic-investment',requireAuth,statisticController.editStrategicInvestment)
  router.patch('/delete-strategic-investment',requireAuth,statisticController.deleteStrategicInvestment)
  router.post('/add-outcome',requireAuth,statisticController.addOutcome)
  // router.post('/company-finance-chart-data',requireAuth,statisticController.getChartData)












module.exports=router