const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Rutas principales
const clientRoute = require('./routes/clientRoutes.js');
const supplierRoute = require('./routes/supplierRoutes.js');
const categoryRoute = require('./routes/categoryRoutes.js');
const batchRoute = require('./routes/batchRoutes.js');
const roleRoute = require('./routes/rolesRoutes.js');
const loginRoute = require('./routes/loginRoutes.js');

// Rutas secundarias
const productsPerishableRoutes = require('./routes/productsPerishabRoutes.js');
const productsNonPerishableRoutes = require('./routes/productsNonPerishablesRoutes.js');
const userRoute = require('./routes/usersRoutes');
const assosiationRoute = require('./routes/asostiationTestRoute.js');

// Uso de las rutas principales
app.use('/api/client/', clientRoute);
app.use('/api/supllier/', supplierRoute);
app.use('/api/category/', categoryRoute);
app.use('/api/batch/', batchRoute);
app.use('/api/role/', roleRoute);
app.use('/api/login/', loginRoute);

// Uso de las rutas secundarias
app.use('/api/productsPerishable/', productsPerishableRoutes);
app.use('/api/productsNonPerishable/', productsNonPerishableRoutes);
app.use('/api/user/', userRoute);
app.use('/api/assosiation/', assosiationRoute);

// Servidor escuchando
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`El servidor se está ejecutando en http://localhost:${port}`);
});
