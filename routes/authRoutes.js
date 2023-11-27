const express = require('express');
const authController = require('../controllers/authController')
const { requireAuth, authRole, checkUser, checkLogin ,accessStaff} = require('../middlewares/authMiddleware')
const path = require('path');
const multer = require('multer')
const rateLimit = require("express-rate-limit");
const storage = multer.diskStorage({
 
    filename: function(req, file, cb) {
      let noWhiteSpaceOriginalName = file.originalname.split('.')[0].replace(/\s/g, '')
      cb(null, file.fieldname + '-' + noWhiteSpaceOriginalName + '-' + Date.now() + path.extname(file.originalname));
    }
  });
const routeLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: {
      errors:{id:'Keni bërë shumë kërkesa ju lutem provoni më vonë'}
    }
  });
    
   const fileFilter = (req, file, cb) => {
     if (
         file.mimetype === 'image/jpeg' ||
         file.mimetype === 'image/jpg' ||
         file.mimetype === 'image/png' ||
         file.mimetype === 'image/webp'
     ) {
         cb(null, true)
     } else {
         cb(null, false)
         req.multerInvalidFileTypeErr = 'INVALID_FILE_TYPE'
     }
  }
    
    const upload = multer({
      storage,
      fileFilter,
      limits: { fileSize: 5000000 },
    })
  const router = express.Router();
router.post('/login',routeLimiter,authController.login)
router.post('/login-thana',routeLimiter,authController.loginThana)
router.post('/update-company',authController.updateCompany)
router.get('/logout',authController.logout)
router.post('/create-user',authController.createUser)
router.get('/get-units',authController.getUnits)
router.post('/add-unit',authController.addUnit)
router.patch('/edit-unit',authController.editUnit)
router.post('/add-worker',authController.addWorker)
router.post('/edit-worker',authController.editWorker)
//politikat
router.get('/get-politics',authController.getPolitics)
router.patch('/edit-politic',requireAuth,authController.editPolitic)
router.get('/get-workers',requireAuth,accessStaff('workers'),authController.getWorkers)
router.get('/get-workers-count',requireAuth,accessStaff('workers'),authController.getWorkersCount)
router.patch('/delete-worker',requireAuth,accessStaff('workers'),authController.deleteWorker)

module.exports=router