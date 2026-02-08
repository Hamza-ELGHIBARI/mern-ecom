const express = require("express");
const router = express.Router();
const { addAddress, getAddresses } = require("../controllers/client.controller");
const { createOrder, getMyOrders, getMyOrderDetails} = require("../controllers/order.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { addressSchema } = require("../validators/address.validator");
const validate = require("../middlewares/validate.middleware");
const { createOrderSchema } = require("../validators/order.validator");

router.use(authenticate);

router.get("/addresses", getAddresses);
router.post("/addresses", validate(addressSchema), addAddress);
router.post("/orders",validate(createOrderSchema), createOrder);
router.get("/orders/me", getMyOrders);
router.get("/orders/me/:id", getMyOrderDetails);

module.exports = router;
