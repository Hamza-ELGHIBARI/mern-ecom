const productRepo = require("../repositories/product.repository");
const categoryRepo = require("../repositories/category.repository");
const { default: mongoose } = require("mongoose");

const getAllProducts = () => productRepo.findAll();
const getProductById = (id) => productRepo.findById(id);
const createProduct = async (data) => {
    // vérifier ce la catégorie id est valide
      if (!mongoose.Types.ObjectId.isValid(data.category)) {
    const error = new Error("La catégorie spécifiée est invalide");
    error.status = 400;
    throw error;
  }
  // Vérifier que la category existe
  const category = await categoryRepo.findById(data.category);
  console.log(category);
  if (!category) {
    const error = new Error("La catégorie spécifiée n'existe pas");
    error.status = 400;
    throw error;
  }

  return productRepo.createProduct(data);
};

const updateProduct = async (id, data) => {
  // Vérifier la catégorie si elle est modifiée
  if (data.category) {
      if (!mongoose.Types.ObjectId.isValid(data.category)) {
    const error = new Error("La catégorie spécifiée est invalide");
    error.status = 400;
    throw error;
  }
    const category = await categoryRepo.findById(data.category);
    if (!category) {
      const error = new Error("La catégorie spécifiée n'existe pas");
      error.status = 400;
      throw error;
    }
  }

  return productRepo.updateProduct(id, data);
};
const deleteProduct = (id) => productRepo.deleteProduct(id);

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
