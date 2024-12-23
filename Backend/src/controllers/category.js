import Category from '../models/category.js';

export const getCategories =  async (req, res, next) => {
    try {
        const categories = await Category.find();
        req.categories = categories;
        return next();
    } catch (error) {
        req.status(500).json({ message: error.message });
    }
} 