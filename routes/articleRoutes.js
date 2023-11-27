const express = require('express');
const articleController = require('../controllers/articleController')
const { requireAuth, authRole, checkUser, checkLogin } = require('../middlewares/authMiddleware')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.memoryStorage()
const fileFilter = (req, file, cb) => {
  if (
      file.mimetype === 'application/vnd.ms-excel' || // For .xls files
      file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // For .xlsx files
  ) {
      cb(null, true);
  } else {
      cb(null, false);
      req.multerInvalidFileTypeErr = 'INVALID_FILE_TYPE';
  }
}

const upload = multer({
 storage,
 fileFilter,
 limits: { fileSize: 5000000 }, // Limit file size as needed
});
  const router = express.Router();
//groupe routes
router.get('/get-groups',requireAuth,articleController.getGroups)
router.post('/add-group',requireAuth,articleController.addGroup)
router.patch('/delete-group',requireAuth,articleController.deleteGroup)
//sub group routes
router.get('/get-subgroups',requireAuth,articleController.getSubGroups)
router.post('/add-subgroup',requireAuth,articleController.addSubGroup)
router.patch('/delete-subgroup',requireAuth,articleController.deleteSubGroup)
//zone groups
router.get('/get-zones',requireAuth,articleController.getZone)
router.post('/add-zone',requireAuth,articleController.addZone)
router.patch('/delete-zone',requireAuth,articleController.deleteZone)
//manufacture groups
router.get('/get-manufactures',requireAuth,articleController.getManufactures)
router.post('/add-manufacturer',requireAuth,articleController.addManufacture)
router.patch('/delete-manufacturer',articleController.deleteManufacture)
//article groups
router.get('/get-articles',requireAuth,articleController.getArticles)
router.post('/add-article',requireAuth,articleController.addArticle)
router.patch('/edit-article',requireAuth,articleController.editArticle)
router.patch('/delete-article',requireAuth,articleController.deleteArticle)
//stock

router.get('/get-articles-stock',requireAuth,articleController.getArticlesStock)
router.post('/get-article-stock-details',requireAuth,articleController.getArticleStockDetails)
router.post('/add-articles-excel',requireAuth,upload.single('exel'),articleController.addArticlesExel)
router.post('/get-article-stats',requireAuth,articleController.getArticleStats)
router.post('/get-article-sells-by-month',requireAuth,articleController.getsallesByMonth)
router.post('/get-analize-stats',requireAuth,articleController.getAnalizeStats)
router.get('/get-supplys-for-article',requireAuth,articleController.getSupplysForArticle)
router.get('/get-action-for-article',requireAuth,articleController.getActionForArticle)
router.post('/sales/by/unit',requireAuth,articleController.getSalesByUnit)
router.get('/get-articles-stock-count',requireAuth,articleController.getArticlesStockCount)
router.patch('/refuze-article-count',requireAuth,articleController.refuzeArticleCount)
router.patch('/accept-article-count',requireAuth,articleController.acceptArticleCount)
router.patch('/add-article-count',requireAuth,articleController.addArticleCount)
router.get('/find-article-pos',requireAuth,articleController.findArticlePos)
router.patch('/stock-product-edit-supply',requireAuth,articleController.stockProductEditSupply)









module.exports=router