const express = require('express');
const transferController = require('../controllers/transferController')
const { requireAuth, authRole, checkUser, checkLogin } = require('../middlewares/authMiddleware')
// 

  const router = express.Router();

router.get('/get-article',requireAuth,transferController.getArticle)
router.get('/get-transfers',requireAuth,transferController.getTransfers)
router.patch('/delete-transfer',requireAuth,transferController.deleteTransfer)
router.post('/add-transfer',requireAuth,transferController.addTransfer)
router.post('/add-transfer-articles',requireAuth,transferController.addTransferArticles)
router.patch('/delete-transfer-article',requireAuth,transferController.deleteTransferArticle)
router.post('/close-transfer',requireAuth,transferController.closeTransfer)
router.patch('/reject-transfer',requireAuth,transferController.rejectTransfer)
router.patch('/accept-transfer',requireAuth,transferController.acceptTransfer)
router.get('/get-transfers-requests',requireAuth,transferController.getTransferRequest)
router.get('/get-transfers-transfer',requireAuth,transferController.getTransferTransfer)
router.get('/get-transfers-completed',requireAuth,transferController.getTransferCompleted)
router.get('/get-transfers-reject',requireAuth,transferController.getTransferReject)










module.exports=router