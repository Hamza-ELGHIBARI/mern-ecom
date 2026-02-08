const Category = require("../models/category.model");

const findAll = () => Category.find();
const findById = (id) => Category.findById(id);
const findByName = (name) => Category.findOne({ name });
const createCategory = (data) => new Category(data).save();
const updateCategory = (id, data) => Category.findByIdAndUpdate(id, data, { new: true });
const deleteCategory = (id) => Category.findByIdAndDelete(id);

module.exports = { findAll, findById,findByName, createCategory, updateCategory, deleteCategory };
