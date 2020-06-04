/* eslint-disable prefer-const */
/* eslint-disable no-console */

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  port: process.env.PG_PORT,
});

pool.connect()
  .then(() => {
    console.log('connected to postgres');
  });

const getProduct = (req, res) => {
  pool.query(`SELECT * FROM items WHERE id = ${req}`)
    .then((result) => {
      const data = result.rows[0];
      const product = {};
      product.id = data.id;
      product.productName = data.productname;
      product.producer = data.producer;
      product.answeredQuestions = data.answeredquestions;
      product.numberOfRatings = data.numberofratings;
      product.starPercentages = JSON.parse(data.starpercentages.replace(/'/g, '"'));
      product.price = Number(data.price);
      product.inStock = data.instock;
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

  pool.query(`INSERT INTO products (id, productname, producer, answeredquestions, numberofratings, starpercentages, price, instock, productinfo)
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
