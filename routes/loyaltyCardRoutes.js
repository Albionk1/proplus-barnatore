const express = require('express');
const loyaltyCardController = require('../controllers/loyaltyCardController')
const { requireAuth, authRole, checkUser, checkLogin } = require('../middlewares/authMiddleware') 

  const router = express.Router();

router.post('/add-loyaltycard',requireAuth,loyaltyCardController.addLoyaltyCard)
router.get('/get-loyaltycards',requireAuth,loyaltyCardController.getLoyaltyCard)



module.exports=router