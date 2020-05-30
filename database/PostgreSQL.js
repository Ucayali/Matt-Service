/* eslint-disable no-console */
// postgres DB
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
const Promise = require('bluebird');

const initOptions = {
  promiseLib: Promise,
};

const pgp = require('pg-promise')(initOptions);

const connection = {
  user: 'oso',
  password: 'hrr45',
  host: 'localhost',
  database: 'item_details',
  port: 5432,
};

const db = pgp(connection);

const getProduct = (req, res) => {
  db.query(`SELECT * FROM products WHERE id = ${req}`)
    .then((result) => {
      const data = result[0];
      const product = {};
      product.id = data.id;
      product.productName = data.productName;
      product.producer = data.producer;
      product.answeredQuestions = data.answeredQuestions;
      product.numberOfRatings = data.numberOfRatings;
      product.starPercentages = JSON.parse(data.starPercentages.replace(/'/g, '"'));
      product.price = Number(data.price);
      product.inStock = data.inStock;
      product.productInfo = data.productinfo.replace(/[[\]']+/g, '').split(',');
      res.status(200);
      res.send(product);
      res.end();
    })
    .catch((err) => {
      console.log('Error getting product: ', err);
      res.status(400);
      res.end();
    });
};

const createProduct = (req, res) => {
  let {
    id,
    productName,
    producer,
    answeredQuestions,
    numberOfRatings,
    starPercentages,
    price,
    inStock,
    productInfo,
  } = req;

  starPercentages = JSON.stringify(starPercentages);
  productInfo = JSON.stringify(productInfo);

  db.query(`INSERT INTO products (id, productname, producer, answeredquestions, numberofratings, starpercentages, price, instock, productinfo)
            VALUES (${id}, ${productName}, ${producer}, ${answeredQuestions}, ${numberOfRatings}, ${starPercentages}, ${price}, ${inStock} , ${productInfo})`, req)
    .then(() => {
      console.log('Inserted id: ', `${id}`);
      res.status(200);
      res.end();
    })
    .catch((err) => {
      console.error('Error inserting: ', err);
      res.status(404);
      res.end();
    });
};


module.exports = {
  getProduct,
  createProduct,
};
