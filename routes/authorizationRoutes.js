const express = require('express');
const authorizationController = require('../controllers/authorizationController')
const { requireAuth, authRole, checkUser, checkLogin } = require('../middlewares/authMiddleware')
// 

  const router = express.Router();

router.get('/get-authorization',authorizationController.getAuthorization)
router.post('/add-authorization',authorizationController.addAuthorizationCompany)
router.patch('/delete-authorization',authorizationController.deleteAuthorization)
router.patch('/edit-authorization',authorizationController.editAuthorization)





module.exports=router