const productModel = require("../models/product.model");
const categoryService = require("../services/category.service");

const getCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (err) { next(err); }
};

const getCategory = async (req, res, next) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        res.json(category);
    } catch (err) { next(err); }
};

const createCategory = async (req, res, next) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json(category);
    } catch (err) { next(err); }
};

const updateCategory = async (req, res, next) => {
    try {
        const category = await categoryService.updateCategory(req.params.id, req.body);
        res.json(category);
    } catch (err) { next(err); }
};

const deleteCategory = async (req, res, next) => {
    try {
        await categoryService.deleteCategory(req.params.id);
        res.json({ message: "Category deleted" });
    } catch (err) { next(err); }
};

module.exports = { getCategories, getCategory, createCategory, updateCategory, deleteCategory };
