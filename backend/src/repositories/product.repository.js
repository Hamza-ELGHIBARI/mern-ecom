const Product = require("../models/product.model.js");

const findAll = () => Product.find().populate("category");
const findById = (id) => Product.findById(id).populate("category");
const createProduct = (data) => new Product(data).save();
const updateProduct = (id, data) => Product.findByIdAndUpdate(id, data, { new: true });
const deleteProduct = (id) => Product.findByIdAndDelete(id);

module.exports = { findAll, findById, createProduct, updateProduct, deleteProduct };
