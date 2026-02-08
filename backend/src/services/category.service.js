const productModel = require("../models/product.model");
const categoryRepo = require("../repositories/category.repository");

const getAllCategories = () => categoryRepo.findAll();
const getCategoryById = (id) => categoryRepo.findById(id);
const createCategory = async (data) => {
  // Vérifier si le nom existe déjà
  const existing = await categoryRepo.findByName(data.name);
  if (existing) {
    const error = new Error("Ce nom de catégorie existe déjà.");
    error.status = 400;
    throw error;
  }

  return categoryRepo.createCategory(data);
};

const updateCategory = async (id, data) => {
  // Vérifier unicité si on change le nom
  if (data.name) {
    const existing = await categoryRepo.findByName(data.name);
    if (existing && existing._id.toString() !== id) {
      const error = new Error("Ce nom de catégorie existe déjà.");
      error.status = 400;
      throw error;
    }
  }

  return categoryRepo.updateCategory(id, data);
};

const deleteCategory = async (categoryId) => {
  const productsCount = await productModel.countDocuments({
    category: categoryId,
  });

  if (productsCount > 0) {
    const error = new Error(
      "Impossible de supprimer cette catégorie car des produits y sont associés"
    );
    error.status = 400;
    throw error;
  }

  await categoryRepository.deleteById(categoryId);
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
