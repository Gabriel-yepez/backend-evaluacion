const express = require('express');
const app = express();
const port = 4001;
const sequelize = require('./db/sequelize');

app.use(express.json());



app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
