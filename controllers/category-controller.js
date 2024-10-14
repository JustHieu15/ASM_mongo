const { body, validationResult } = require('express-validator');
const categoryService = require('../services/category-service');

class CategoryController {
    async getAllCategories(req, res) {
        try {
            const categories = await categoryService.getAllCategories();
            res.render('admin/category/list', { categories: categories,layout: 'admin/index' });
        } catch (error) {
            res.status(500).send('Error getting category');
        }
    }

    async getMenuCategories(req, res) {
        try {
            const categories = await categoryService.getAllCategories();
            // Exclude categories with status 'đã xóa'
            const activeCategories = categories.filter(category => category.status === 'hoạt động');
            res.render('admin/category/menu', { categories: activeCategories });
        } catch (error) {
            res.status(500).send('Error loading categories');
        }
    }

    async createCategory(req, res) {
        try {
            res.render('admin/category/create', { layout: 'admin/index' });
        } catch (error) {
            res.status(500).send('Error loading');
        }
    }

    async storeCategory(req, res) {
        // Validate the 'title' field
        await body('title').notEmpty().withMessage('Please fill this field').run(req);

        // Get validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('admin/category/create', {
                layout: 'admin/index',
                errors: errors.array(),
                title: req.body.title // Preserve the entered data
            });
        }

        try {
            const { title } = req.body;
            const newCategory = {
                name: title,
                status: 'hoạt động'
            };
            await categoryService.createCategory(newCategory);
            res.redirect('list');
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Error creating category');
        }
    }

    async getCategoryById(req, res) {
        try {
            const categoryId = req.params.id;
            const category = await categoryService.getCategoryById(categoryId);
            if (category) {
                res.render('admin/category/edit', {
                    layout: 'admin/index',
                    category: category
                });
            } else {
                res.status(404).send('Category not found');
            }
        } catch (error) {
            res.status(500).send('Error retrieving category');
        }
    }

    async updateCategory(req, res) {
        try {
            const { title, status } = req.body;
            const categoryId = req.params.id;

            // Perform validation
            await body('title').notEmpty().withMessage('Title is required').run(req);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const category = await categoryService.getCategoryById(categoryId); // Preserve data
                return res.render('admin/category/edit', {
                    layout: 'admin/index',
                    category: category,
                    errors: errors.array()
                });
            }

            const updatedCategory = {
                name: title,
                status: status || 'hoạt động'
            };

            await categoryService.updateCategory(categoryId, updatedCategory);
            res.redirect('/admin/category/list');
        } catch (error) {
            res.status(500).send('Error updating category');
        }
    }

}


module.exports = new CategoryController();
