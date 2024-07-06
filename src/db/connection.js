require('dotenv').config();
const { Sequelize } = require('sequelize');

const syncDatabase = require('./models/models');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: { 
    timestamps: false,
    underscored: true
  },
});

syncDatabase(sequelize);

module.exports = sequelize;