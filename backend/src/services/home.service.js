const productRepo = require("../repositories/product.repository");

const getAllProducts = async () => {
  return productRepo.findAll(); // récupère tous les produits avec catégorie
};

const getProductById = async (id) => {
  const product = await productRepo.findById(id);
  if (!product) {
    const error = new Error("Produit non trouvé");
    error.status = 404;
    throw error;
  }
  return product;
};

module.exports = { getAllProducts, getProductById };
