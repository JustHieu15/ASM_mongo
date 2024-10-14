var express = require('express');
var router = express.Router();
const articleController = require('../controllers/article-controller');
const categoryController = require('../controllers/category-controller');

router.get('/', function(req, res, next) {
    res.render('admin/home', { layout: 'admin/index' });
})

// Article Routes
router.get('/article/list', async function(req, res, next) {
    await articleController.getAllArticle(req, res);
})

router.post('/article/list', async function(req, res, next) {
    await articleController.searchArticle(req, res);
})

router.get('/article/create', async function(req, res, next) {
    await articleController.createArticle(req, res);
})

router.post('/article/store', async function(req, res, next) {
    await articleController.storeArticle(req, res);
})

router.get('/article/edit/:id', async function(req, res, next) {
    await articleController.getArticleById(req, res);
})

router.post('/article/update/:id', async function(req, res, next) {
    await articleController.updateArticle(req, res);
})

router.post('/article/crawl-create', articleController.crawlAndCreateArticle);

// Category Routes
router.get('/category/list', async function(req, res, next) {
    await categoryController.getAllCategories(req, res);
})

router.get('/category/create', async function(req, res, next) {
    await categoryController.createCategory(req, res);
})

router.post('/category/store',async function(req, res, next) {
    await categoryController.storeCategory(req, res);
})

router.get('/category/edit/:id', async function(req, res, next) {
    await categoryController.getCategoryById(req, res);
})

router.post('/category/update/:id', async function(req, res, next) {
    await categoryController.updateCategory(req, res);
})

module.exports = router