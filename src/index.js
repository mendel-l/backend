const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

//routes
const clientRoute = require('./routes/clientRoutes.js');
const supplierRoute = require('./routes/supplierRoutes.js');
const productsPerishableRoutes = require('./routes/productsPerishabRoutes.js');
//

app.use('/api/', clientRoute);
app.use('/api/', supplierRoute);
app.use('/api/', productsPerishableRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`El servidor se está ejecutando en http://localhost:${port}`);
});
