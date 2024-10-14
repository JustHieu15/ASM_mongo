const Article = require('../models/article');

class ArticleRepository {
    // Lấy tất cả bài viết
    async getArticles(page = 1, limit = 5) {
        const articles = await Article.find()
            .populate('categoryId', 'name')
            .skip((page - 1) * limit)
            .limit(limit);
        const count = await Article.countDocuments();
        return { articles, totalPages: Math.ceil(count / limit), currentPage: page };
    }

    // Tạo bài viết mới
    async createArticle(articleData) {
        const article = new Article(articleData);
        return article.save();
    }

    // Cập nhật bài viết
    async updateArticle(id, updateData) {
        return Article.findByIdAndUpdate(id, updateData, { new: true });
    }

    // Lấy bài viết theo ID
    async getArticleById(id) {
        return Article.findById(id).populate('categoryId', 'name');
    }

    //Lấy bài viết theo categoryId
    async getArticleByCategory(id, page = 1, limit = 5) {
        const articles = await Article.find({ categoryId: id })
            .populate('categoryId', 'name')
            .skip((page - 1) * limit)
            .limit(limit);
        const count = await Article.countDocuments();
        return { articles, totalPages: Math.ceil(count / limit), currentPage: page };
    }

    //Lấy theo ID và slug
    async getArticlebyIdAndSlug(slug, id) {
        return Article.findOne({ slug, _id: id }).populate('categoryId', 'name');
    }

    // Xoá bài viết
    async deleteArticle(id) {
        return Article.findByIdAndDelete(id);
    }

    async searchArticles(query, page = 1, limit = 5) {
        const searchCriteria = {};

        // Tìm kiếm theo tiêu đề
        if (query.title) {
            searchCriteria.title = { $regex: query.title, $options: 'i' }; // Tìm kiếm không phân biệt chữ hoa chữ thường
        }

        // Tìm kiếm theo tên tác giả
        if (query.author) {
            searchCriteria.author = { $regex: query.author, $options: 'i' };
        }

        // Tìm kiếm theo ngày đăng
        if (query.createdAt) {
            searchCriteria.createdAt = {
                $gte: new Date(query.createdAt), // Ngày bắt đầu
                $lt: new Date(new Date(query.createdAt).setDate(new Date(query.createdAt).getDate() + 1)) // Ngày kết thúc
            };
        }

        // Tính toán số lượng bài viết và phân trang
        const totalArticles = await Article.countDocuments(searchCriteria);
        const totalPages = Math.ceil(totalArticles / limit);
        const articles = await Article.find(searchCriteria)
            .populate('categoryId', 'name')
            .skip((page - 1) * limit)
            .limit(limit);

        return { articles, totalPages, currentPage: page };


    }


}

module.exports = new ArticleRepository();
