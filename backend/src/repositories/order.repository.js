const Order = require("../models/order.model");


const findAll = () => Order.find().populate("user");
const findById = (id) => Order.findById(id).populate("items.product");

const findByUserId = (userId) =>
  Order.find({ user: userId }).sort({ createdAt: -1 });

const updateOrder = (id, data) =>
  Order.findByIdAndUpdate(id, data, { new: true });

const findByIdAndUser = (orderId, userId) =>
  Order.findOne({ _id: orderId, user: userId })
    .populate("items.product", "name price")
    .lean();

module.exports = {   findAll,
  findById,
  findByUserId,
  updateOrder,findByIdAndUser };
