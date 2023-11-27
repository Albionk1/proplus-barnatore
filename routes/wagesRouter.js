const express = require('express');
const wagesController = require('../controllers/wagesController')
const { requireAuth, authRole, checkUser, checkLogin } = require('../middlewares/authMiddleware')
// 

  const router = express.Router();


  router.post('/open-month',requireAuth,wagesController.openMonth)
  router.get('/get-workers-for-wages',requireAuth,wagesController.getWorkersForWages)
  router.post('/get-workers-details',requireAuth,wagesController.getWorkersDetails)
  router.post('/pay-worker',requireAuth,wagesController.payWorker)
  router.post('/get-wages-details',requireAuth,wagesController.getWagesDetails)
//   router.post('/get-sales-buys-profit-by-month',requireAuth,statisticController.getSalesBuysProfitByMonth)
//   router.post('/get-article-sells-by-days',requireAuth,statisticController.getSellsByDayAverage)
//   router.get('/get-most-saled',requireAuth,statisticController.getMostSaledArticles)
//   router.get('/get-least-saled',requireAuth,statisticController.getLeastSaledArticles)













module.exports=router