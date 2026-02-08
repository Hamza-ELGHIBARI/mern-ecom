const orderService = require("../services/order.service");

const getOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (err) { next(err); }
};

const getOrder = async (req, res, next) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        res.json(order);
    } catch (err) { next(err); }
};

const createOrder = async (req, res) => {

    try {
        const userId = req.user.id;
        const { addressIndex, items } = req.body;

        const order = await orderService.createOrder({
            userId,
            addressIndex,
            items,
        });

        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateOrder = async (req, res, next) => {
    try {
        const order = await orderService.updateOrder(req.params.id, req.body);
        res.json(order);
    } catch (err) { next(err); }
};

const getDashboardStats = async (req, res, next) => {
    try {
        const stats = await orderService.getDashboardStats();
        res.json(stats);
    } catch (err) { next(err); }
};

const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await orderService.getOrdersByUser(userId);
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

const getMyOrderDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await orderService.getOrderDetailsForUser(id, userId);
    res.json(order);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
module.exports = { getOrders, getOrder, createOrder, updateOrder, getDashboardStats, getMyOrders, getMyOrderDetails };
