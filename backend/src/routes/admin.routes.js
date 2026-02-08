const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const productController = require("../controllers/product.controller");
const orderController = require("../controllers/order.controller");
const userController = require("../controllers/user.controller");
const upload = require("../middlewares/upload.middleware");
const { userSchema, editUserSchema } = require("../validators/user.validator");
const  { categorySchema }  = require("../validators/category.validator");
const  { productSchema }  = require("../validators/product.validator");
const { authenticate , isAdmin} = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

router.use(authenticate); // protège toutes les routes
router.use(isAdmin);

router.get("/categories", categoryController.getCategories);
router.get("/categories/:id", categoryController.getCategory);
router.post("/categories",validate(categorySchema), categoryController.createCategory);
router.put("/categories/:id",validate(categorySchema), categoryController.updateCategory);
router.delete("/categories/:id", categoryController.deleteCategory);

router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProduct);
router.post("/products", upload.single("image"), validate(productSchema),  productController.createProduct);
router.put("/products/:id", upload.single("image"), validate(productSchema), productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

router.get("/orders", orderController.getOrders);
router.get("/orders/:id", orderController.getOrder);
router.get("/orders/dashboard/stats", orderController.getDashboardStats);

router.get("/users",userController.listUsers);
router.post("/users",validate(userSchema),userController.addUser);
router.put("/users/:id",validate(editUserSchema),userController.editUser);

module.exports = router;