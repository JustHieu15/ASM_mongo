var express = require('express');
var router = express.Router();

var indexController = require('../controllers/index-controller');

/* GET home page. */
router.get('/', async function(req, res, next) {
  await indexController.renderHome(req, res);
});

router.get('/detail/:slug/:id', async function(req, res, next) {
  await indexController.renderArticle(req, res)
})

router.get('/article/:category', async function(req, res, next) {
  await indexController.renderArticleByCategory(req, res)
})

module.exports = router;
