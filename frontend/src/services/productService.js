import { product } from "../api/products";


export const productService = {
  getProducts() {
    return product.getAll();
  },


  getProductById(id) {
    if (!id) throw new Error("Product ID is required");
    return product.getById(id);
  },
};
