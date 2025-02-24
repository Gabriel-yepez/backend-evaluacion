const express = require('express');
const app = express();
const port = 4001;
const sequelize = require('./db/sequelize');

app.use(express.json());

// Probar la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
