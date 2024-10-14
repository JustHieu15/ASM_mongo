const Category = require('../models/category');

class CategoryRepository {
    async createCategory(categoryData) {
        const newCategory = new Category(categoryData);
        return await newCategory.save();
    }

    async getCategoryById(id) {
        return Category.findById(id);
    }

    async updateCategory(id, updateData) {
        return Category.findByIdAndUpdate(id, updateData);
    }

    async deleteCategory(id) {
        return Category.findByIdAndDelete(id);
    }

    async getAllCategories() {
        return Category.find().sort({status: 1});
    }
}

module.exports = new CategoryRepository();
