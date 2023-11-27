const express = require('express');
const actionController = require('../controllers/actionController')
const { requireAuth, authRole, checkUser, checkLogin } = require('../middlewares/authMiddleware')
// 

  const router = express.Router();
router.get('/get-article',actionController.getArticle)
router.get('/get-action-article',actionController.getActionArticle)
router.get('/get-action-by-status',actionController.getAction)
router.post('/add-action',actionController.addAction)
router.patch('/delete-action-article',actionController.deleteActionArticle)
router.patch('/active-action',requireAuth,actionController.activeAction)
router.patch('/edit-action',requireAuth,actionController.editAction)
router.patch('/delete-action',actionController.deleteAction)
router.post('/add-action-article',actionController.addActionArticle)



module.exports=router