const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));  // Límite de 50 MB para JSON
app.use(express.urlencoded({ limit: '50mb', extended: true }));  // Límite de 50 MB para formularios

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas principales
const clientRoute = require('./routes/clientRoutes.js');
const supplierRoute = require('./routes/supplierRoutes.js');
const categoryRoute = require('./routes/categoryRoutes.js');
const batchRoute = require('./routes/batchRoutes.js');
const roleRoute = require('./routes/rolesRoutes.js');
const loginRoute = require('./routes/loginRoutes.js');
const eComerceData = require('./routes/eComerceDataRoute.js');

// Rutas secundarias
const productsPerishableRoutes = require('./routes/productsPerishabRoutes.js');
const productsNonPerishableRoutes = require('./routes/productsNonPerishablesRoutes.js');
const userRoute = require('./routes/usersRoutes.js');
const associationRoute = require('./routes/asostiationTestRoute.js');

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
app.use('/api/', userRoute);
app.use('/api/', associationRoute);

//Rutas publicas
app.use('/api/', eComerceData);

// Servidor escuchando
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`El servidor se está ejecutando en http://localhost:${port}`);
});
