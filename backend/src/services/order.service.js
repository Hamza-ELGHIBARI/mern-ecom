const orderRepo = require("../repositories/order.repository");
const Order = require("../models/order.model");
const Client = require("../models/client.model");
const Product = require("../models/product.model");
const clientService = require("./client.service");

const getAllOrders = () => orderRepo.findAll();
const getOrderById = (id) => orderRepo.findById(id);
const updateOrder = (id, data) => orderRepo.updateOrder(id, data);

// Dashboard stats
const getDashboardStats = async () => {
  const productsCount = (await require("../repositories/product.repository").findAll()).length;
  const categoriesCount = (await require("../repositories/category.repository").findAll()).length;

  const orders = await orderRepo.findAll();
  const todayOrders = orders.filter(o => {
    const today = new Date();
    const orderDate = new Date(o.createdAt);
    return orderDate.toDateString() === today.toDateString();
  }).length;

  return { productsCount, categoriesCount, ordersToday: todayOrders };
};



const createOrder = async ({ userId, addressIndex, items }) => {
  if (!items || items.length === 0) {
    throw new Error("Panier vide");
  }

  const client = await Client.findOne({ userId });
  if (!client) throw new Error("Client introuvable");

  const address = client.addresses[addressIndex];
  if (!address) throw new Error("Adresse invalide");

  let totalPrice = 0;
  const orderItems = [];

  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product) throw new Error("Produit introuvable");

    const lineTotal = product.price * item.quantity;
    totalPrice += lineTotal;

    orderItems.push({
      product: product._id,
      quantity: item.quantity,
      price: product.price, 
    });
  }

  const order = await Order.create({
    user: userId,
    address,
    deliveryAddress:address,
    items: orderItems,
    totalPrice,
  });

  return order;
};

const getOrdersByUser = (userId) => {
  return orderRepo.findByUserId(userId);
};

const getOrderDetailsForUser = async (orderId, userId) => {
  const order = await orderRepo.findByIdAndUser(orderId, userId);
  if (!order) {
    throw new Error("Commande introuvable ou accès interdit");
  }
  return order;
}


module.exports = { getAllOrders, getOrderById, createOrder, updateOrder, getDashboardStats, createOrder, getOrdersByUser, getOrderDetailsForUser };

