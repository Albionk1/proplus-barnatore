const express = require('express');
const arcController = require('../controllers/arcController')
const { requireAuth, authRole, checkUser, checkLogin } = require('../middlewares/authMiddleware')
// 

  const router = express.Router();


router.get('/admin-get-arc',requireAuth,arcController.adminGetArc)
router.get('/get-arc-sales',requireAuth,arcController.getArcSales)
router.get('/get-arc-expenses',requireAuth,arcController.getArcExpenses)
router.get('/get-arc-delete-sales',requireAuth,arcController.getArcDeleteSales)
router.post('/get-arc-detail-close',requireAuth,arcController.getArcDetailsForClose)
router.post('/arc-edit-start',requireAuth,arcController.arcEditStart)
router.post('/close-arc',requireAuth,arcController.closeArc)












module.exports=router