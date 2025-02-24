const { Sequelize } = require('sequelize')
require('dotenv').config();

const sequelize = new Sequelize('evaluacion', 'postgres', process.env.passwordDB, {
    host: 'localhost',
    dialect: 'postgres',
  });

module.exports=sequelize
  
