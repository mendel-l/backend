'use strict';

// Import models
const Batch = require('./batchesModel');
const Client = require('./clientModel');
const Cart = require('./cartModel');
const Category = require('./categoriesModel');
const Supplier = require('./suppliersModel');
const ProductsNonPerishable = require('./productsNonPerishablesModel');
const ProductsPerishable = require('./productsPerishablesModel');
const CartDetail = require('./cartDetailsModel');
//const Course = require('./coursesModel');
//const Order = require('./ordersModel');
//const OrderDetail = require('./orderDetailsModel');
//const Review = require('./reviewsModel');
const Role = require('./rolesModel');
const StockNotification = require('./stockNotificationModel');
const User = require('./usersModel');

// Associations

// Client and Cart
Client.hasMany(Cart, { foreignKey: 'client_id' });
Cart.belongsTo(Client, { foreignKey: 'client_id' });

// Category and Products
Category.hasMany(ProductsNonPerishable, { foreignKey: 'category_id' });
Category.hasMany(ProductsPerishable, { foreignKey: 'category_id' });
ProductsNonPerishable.belongsTo(Category, { foreignKey: 'category_id' });
ProductsPerishable.belongsTo(Category, { foreignKey: 'category_id' });

// Supplier and Products
Supplier.hasMany(ProductsNonPerishable, { foreignKey: 'supplier_id' });
Supplier.hasMany(ProductsPerishable, { foreignKey: 'supplier_id' });
ProductsNonPerishable.belongsTo(Supplier, { foreignKey: 'supplier_id' });
ProductsPerishable.belongsTo(Supplier, { foreignKey: 'supplier_id' });

// Batch and ProductsPerishable
Batch.hasMany(ProductsPerishable, { foreignKey: 'batch_id' });
ProductsPerishable.belongsTo(Batch, { foreignKey: 'batch_id' });

// Cart and CartDetails
Cart.hasMany(CartDetail, { foreignKey: 'cart_id' });
CartDetail.belongsTo(Cart, { foreignKey: 'cart_id' });

// Products and CartDetails
ProductsNonPerishable.hasMany(CartDetail, { foreignKey: 'product_non_perishable_id' });
ProductsPerishable.hasMany(CartDetail, { foreignKey: 'product_perishable_id' });
CartDetail.belongsTo(ProductsNonPerishable, { foreignKey: 'product_non_perishable_id' });
CartDetail.belongsTo(ProductsPerishable, { foreignKey: 'product_perishable_id' });

// Client and Orders
/*
Client.hasMany(Order, { foreignKey: 'client_id' });
Order.belongsTo(Client, { foreignKey: 'client_id' });
*/
// Order and OrderDetails
/*
Order.hasMany(OrderDetail, { foreignKey: 'order_id' });
OrderDetail.belongsTo(Order, { foreignKey: 'order_id' });
*/
// Products and OrderDetails
/*
ProductsNonPerishable.hasMany(OrderDetail, { foreignKey: 'product_non_perishable_id' });
ProductsPerishable.hasMany(OrderDetail, { foreignKey: 'product_perishable_id' });
OrderDetail.belongsTo(ProductsNonPerishable, { foreignKey: 'product_non_perishable_id' });
OrderDetail.belongsTo(ProductsPerishable, { foreignKey: 'product_perishable_id' });
*/
// Reviews
/*
Client.hasMany(Review, { foreignKey: 'client_id' });
ProductsNonPerishable.hasMany(Review, { foreignKey: 'product_non_perishable_id' });
ProductsPerishable.hasMany(Review, { foreignKey: 'product_perishable_id' });
Review.belongsTo(Client, { foreignKey: 'client_id' });
Review.belongsTo(ProductsNonPerishable, { foreignKey: 'product_non_perishable_id' });
Review.belongsTo(ProductsPerishable, { foreignKey: 'product_perishable_id' });
*/
// Roles and Users
Role.hasMany(User, { foreignKey: 'role_id' });
User.belongsTo(Role, { foreignKey: 'role_id' });

// Stock Notifications
ProductsPerishable.hasMany(StockNotification, { foreignKey: 'product_perishable_id' });
ProductsNonPerishable.hasMany(StockNotification, { foreignKey: 'product_non_perishable_id' });
StockNotification.belongsTo(ProductsPerishable, { foreignKey: 'product_perishable_id' });
StockNotification.belongsTo(ProductsNonPerishable, { foreignKey: 'product_non_perishable_id' });

module.exports = {
  Batch,
  Client,
  //Cart,
  Category,
  Supplier,
  ProductsNonPerishable,
  ProductsPerishable,
  //CartDetail,
  //Course,
  //Order,
  //OrderDetail,
  //Review,
  Role,
  StockNotification,
  User
};
