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
app.use('/api/', clientRoute);
app.use('/api/', supplierRoute);
app.use('/api/', categoryRoute);
app.use('/api/', batchRoute);
app.use('/api/', roleRoute);
app.use('/api/', loginRoute);

// Uso de las rutas secundarias
app.use('/api/', productsPerishableRoutes);
app.use('/api/', productsNonPerishableRoutes);
app.use('/api/user/', userRoute);
app.use('/api/', assosiationRoute);

// Servidor escuchando
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`El servidor se está ejecutando en http://localhost:${port}`);
});
