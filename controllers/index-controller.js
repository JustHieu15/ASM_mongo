const categoryService = require('../services/category-service');
const articleService = require('../services/article-service');

class indexController {
    async renderHome(req, res) {
        try {
            const page = parseInt(req.query.page) || 1; // Lấy trang hiện tại từ query params, mặc định là 1
            const limit = 5; // Số bài viết trên mỗi trang
            const { articles, totalPages, currentPage } = await articleService.getAllArticles(page, limit);
            const categories = await categoryService.getAllCategories();

            res.render('home', {
                categories,
                articles,
                totalPages,
                currentPage
            });
        } catch (error) {
            console.error('Error fetching categories:', error);
            res.status(500).send('Error fetching categories');
        }
    }

    async renderArticle(req, res) {
        try {
            const page = parseInt(req.query.page) || 1; // Lấy trang hiện tại từ query params, mặc định là 1
            const limit = 5; // Số bài viết trên mỗi trang
            const { articles, totalPages, currentPage } = await articleService.getAllArticles(page, limit);
            const articleSlug = req.params.slug;
            const articleId = req.params.id; // Lấy ID từ request parameters
            const article = await articleService.getArticleByIdAndSlug(articleSlug, articleId); // Lấy bài viết theo ID

            if (!article) {
                return res.status(404).send('Article not found');
            }

            const categories = await categoryService.getAllCategories(); // Lấy tất cả danh mục
            res.render('article-detail', {
                totalPages,
                currentPage , articles, article, categories }); // Render trang chi tiết bài viết
        } catch (error) {
            console.error('Error fetching article detail:', error);
            res.status(500).send('Error fetching article');
        }
    }

    async renderArticleByCategory(req, res) {
        try {
            const { category } = req.params; // Sửa thành req.params.category
            const page = parseInt(req.query.page) || 1; // Lấy trang hiện tại từ query params, mặc định là 1
            const limit = 5; // Số bài viết trên mỗi trang
            const { articles, totalPages, currentPage } = await articleService.getArticleByCategory(category, page, limit);
            const categories = await categoryService.getAllCategories();
            res.render('article-by-category', { totalPages,
                currentPage , articles, categories }); // Render view với danh sách bài viết
        } catch (error) {
            console.error(error);
            res.status(500).send('Lỗi khi lấy bài viết');
        }
    }

}

module.exports = new indexController;