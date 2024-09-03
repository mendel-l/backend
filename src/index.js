const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const clientRoute = require('./routes/clientRoutes.js');
const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/api/', clientRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`El servidor se está ejecutando en http://localhost:${port}`);
});
