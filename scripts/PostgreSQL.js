/* eslint-disable no-console */
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('item_details', 'oso', 'hrr45', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});


const products = sequelize.define('products', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  productName: DataTypes.STRING,
  producer: DataTypes.STRING,
  answeredQuestions: DataTypes.INTEGER,
  numberOfRatings: DataTypes.INTEGER,
  starPercentages: DataTypes.STRING,
  price: DataTypes.FLOAT(2),
  inStock: DataTypes.BOOLEAN,
  productinfo: DataTypes.TEXT, // LIST
}, {
  indexes: [{ name: 'id', fields: ['id'] }],
  timestamps: false,
});

products.sync({ force: true })
  .then(() => {
    sequelize.query("Copy products FROM 'products.csv' WITH (format csv, header true, delimiter '|')")
      .then(() => {
        sequelize.close()
          .then(() => { console.log('Database Seeded'); })
          .catch(() => { console.log('Error!'); });
      });
  });
