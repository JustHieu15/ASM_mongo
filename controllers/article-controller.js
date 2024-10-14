const {check, validationResult} = require('express-validator');
const articleService = require('../services/article-service');
const categoryService = require('../services/category-service');

class ArticleController {
    async getAllArticle(req, res) {
        try {
            const page = parseInt(req.query.page) || 1; // Lấy số trang từ query, mặc định là 1
            const limit = 5; // Số lượng bài viết trên một trang
            const categories = await categoryService.getAllCategories();
            const { articles, totalPages, currentPage } = await articleService.getAllArticles(page, limit);

            // Lưu lại từ khóa tìm kiếm
            const query = req.query.title || req.query.author || req.query.createdAt ? {
                title: req.query.title || '',
                author: req.query.author || '',
                createdAt: req.query.createdAt || ''
            } : {};

            res.render('admin/article/list', {
                articles,
                categories,
                totalPages,
                currentPage,
                query, // Gửi các từ khóa tìm kiếm để giữ lại
                layout: 'admin/index'
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Error getting articles');
        }
    }

    async searchArticle(req, res) {
        try {
            const page = parseInt(req.query.page) || 1; // Lấy số trang từ query, mặc định là 1
            const limit = 5; // Số lượng bài viết trên một trang
            const query = req.body; // Lấy các tiêu chí tìm kiếm từ body
            const categories = await categoryService.getAllCategories();
            const { articles, totalPages, currentPage } = await articleService.searchArticles(query, page, limit);

            // Lưu lại từ khóa tìm kiếm
            const searchQuery = {
                title: query.title || '',
                author: query.author || '',
                createdAt: query.createdAt || ''
            };

            res.render('admin/article/list', {
                articles,
                categories,
                totalPages,
                currentPage,
                query: searchQuery,
                layout: 'admin/index'
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Error searching articles');
        }
    }

    async createArticle(req, res) {
        try {
            const categories = await categoryService.getAllCategories()
            res.render('admin/article/create', {categories: categories, layout: 'admin/index'});
        } catch (error) {
            res.status(500).send('Error loading');
        }
    }

    // Thêm article
    async storeArticle(req, res) {
        try {
            // Validate các trường thông tin
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const categories = await categoryService.getAllCategories();
                return res.status(400).render('admin/article/create', {
                    categories: categories,
                    errors: errors.array(),
                    layout: 'admin/index'
                });
            }

            const articleData = {
                title: req.body.title,
                imgLink: req.body['img-link'] || '', // Default to an empty string if not provided
                categoryId: req.body.category,
                description: req.body.description,
                author: req.body.author,
                content: req.body.content,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            await articleService.createArticle(articleData);
            res.redirect('/admin/article/list');
        } catch (error) {
            console.error('Error creating article:', error);
            res.redirect('/admin/article/create');
        }
    }

    async getArticleById(req, res) {
        try {
            const categories = await categoryService.getAllCategories();
            const article = await articleService.getArticleById(req.params.id);
            if (article) {
                res.render('admin/article/edit', {
                    layout: 'admin/index',
                    article: article,
                    categories: categories
                });
            } else {
                res.status(404).send('Article not found');
            }
        } catch (error) {
            console.log(error)
            res.status(404).send('Article not found');
        }
    }

    // Cập nhật article
    async updateArticle(req, res) {
        try {
            // Validate các trường thông tin
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const categories = await categoryService.getAllCategories();
                const article = await articleService.getArticleById(req.params.id);
                return res.status(400).render('admin/article/edit', {
                    layout: 'admin/index',
                    article: article,
                    categories: categories,
                    errors: errors.array()
                });
            }

            const {title, description, category, author, content, status} = req.body;
            const articleId = req.params.id;
            const updateArticle = {
                title,
                imgLink: req.body['img-link'] || '',
                categoryId: category,
                description,
                author,
                content,
                status,
                updatedAt: new Date()
            };

            await articleService.updateArticle(articleId, updateArticle);
            res.redirect('/admin/article/list');
        } catch (error) {
            console.log('Error updating article:', error.message);
            res.status(500).send('Error updating article');
        }
    }

    async crawlAndCreateArticle(req, res) {
        try {
            const url = "https://dantri.com.vn/the-thao/lamine-yamal-bi-loai-khoi-tuyen-tay-ban-nha-barcelona-lo-sot-vo-20241014125443808.htm";
            const newArticle = await articleService.crawlData(url);

            if (newArticle) {
                res.status(201).json({
                    message: "Article created successfully!",
                    article: newArticle,
                });
            } else {
                res.status(400).json({ message: "Failed to create article" });
            }
        } catch (error) {
            console.error("Error during crawling and creating article:", error);
            res.status(500).json({ message: "Error during crawling and creating article" });
        }
    }
}

module.exports = new ArticleController();
