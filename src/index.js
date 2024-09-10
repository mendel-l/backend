const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/* aqui agregar rutas necesarias*/
const clientRoute = require('./routes/clientRoutes.js');
const categoryRoute = require('./routes/categoryRoutes.js'); 
const batchRoute = require('./routes/batchRoutes.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/', clientRoute);
app.use('/api/', categoryRoute);
app.use('/api/', batchRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`El servidor se está ejecutando en http://localhost:${port}`);
});
