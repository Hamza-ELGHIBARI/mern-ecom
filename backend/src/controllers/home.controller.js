const homeService = require("../services/home.service");

const getHomeProducts = async (req, res, next) => {
  try {
    const products = await homeService.getAllProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

const getHomeProductDetails = async (req, res, next) => {
  try {
    const product = await homeService.getProductById(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

module.exports = { getHomeProducts, getHomeProductDetails };
