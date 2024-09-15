const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

//routes
/* RUTAS PRINCIPALES */
const clientRoute = require('./routes/clientRoutes.js');
const supplierRoute = require('./routes/supplierRoutes.js');
const categoryRoute = require('./routes/categoryRoutes.js');
const batchRoute = require('./routes/batchRoutes.js');
/*const userRoute = require('./routes/batchRoutes.js');*/

/* RUTAS SECUNDARIAS */
const productsPerishableRoutes = require('./routes/productsPerishabRoutes.js');
const productsNonPerishableRoutes = require('./routes/productsNonPerishablesRoutes.js');

/* RUTAS FINALES */

//--------------------------------------------

/* RUTAS PRINCIPALES */
app.use('/api/', clientRoute);
app.use('/api/', supplierRoute);
app.use('/api/', categoryRoute);
app.use('/api/', batchRoute);
/*app.use('/api/', userRoute);*/

/* RUTAS SECUNDARIAS */
app.use('/api/', productsPerishableRoutes);
app.use('/api/', productsNonPerishableRoutes);

/* RUTAS FINALES */

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`El servidor se está ejecutando en http://localhost:${port}`);
});
