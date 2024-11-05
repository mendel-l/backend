const { Order, OrderDetail, ProductsNonPerishable, ProductsPerishable, Client, Review } = require('./models');

// Client and Orders
Client.hasMany(Order, { foreignKey: 'client_id' });
Order.belongsTo(Client, { foreignKey: 'client_id' });

// Order and OrderDetails
Order.hasMany(OrderDetail, { foreignKey: 'order_id' });
OrderDetail.belongsTo(Order, { foreignKey: 'order_id' });

// Products and OrderDetails
ProductsNonPerishable.hasMany(OrderDetail, { foreignKey: 'product_non_perishable_id' });
ProductsPerishable.hasMany(OrderDetail, { foreignKey: 'product_perishable_id' });
OrderDetail.belongsTo(ProductsNonPerishable, { foreignKey: 'product_non_perishable_id' });
OrderDetail.belongsTo(ProductsPerishable, { foreignKey: 'product_perishable_id' });

// Reviews
Client.hasMany(Review, { foreignKey: 'client_id' });
ProductsNonPerishable.hasMany(Review, { foreignKey: 'product_non_perishable_id' });
ProductsPerishable.hasMany(Review, { foreignKey: 'product_perishable_id' });