const categoryRepository = require('../repositories/category-repository');

class CategoryService {
    async createCategory(categoryData) {
        return await categoryRepository.createCategory(categoryData);
    }

    async updateCategory(id, updateData) {
        return await categoryRepository.updateCategory(id, updateData);
    }

    async deleteCategory(id) {
        return await categoryRepository.deleteCategory(id);
    }

    async getCategoryById(id) {
        return await categoryRepository.getCategoryById(id);
    }

    async getAllCategories() {
        return await categoryRepository.getAllCategories();
    }
}

module.exports = new CategoryService();
