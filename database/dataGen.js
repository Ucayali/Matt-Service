/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const fs = require('fs');
const faker = require('faker');

const start = new Date();


const genStars = () => {
  const starsObj = {};
  starsObj.one = Math.floor(Math.random() * 100);
  starsObj.two = Math.floor(Math.random() * 100);
  starsObj.three = Math.floor(Math.random() * 100);
  starsObj.four = Math.floor(Math.random() * 100);
  starsObj.five = Math.floor(Math.random() * 100);
  starsObj.total = starsObj.one + starsObj.two + starsObj.three + starsObj.four + starsObj.five;
  return starsObj;
};

const genDetails = () => {
  const details = [];
  const sentences = faker.lorem.sentences();
  const paragraphs = faker.lorem.paragraphs();
  details.push(sentences, paragraphs);
  return details;
};

const writeProducts = fs.createWriteStream('products.csv');
writeProducts.write('id, productName, producer, answeredQuestions, numberOfRatings, starPercentages, price, inStock, productInfo\n', 'utf8');


const dataGen = (writer, encoding, callback) => {
  let i = 100000;
  let productId = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      productId += 1;
      const stars = genStars();
      const id = productId;
      const productName = faker.commerce.productName();
      const producer = faker.company.companyName();
      const answeredQuestions = Math.floor(Math.random() * 100);
      const numberOfRatings = stars.total;
      const starPercentages = stars;
      const price = (10000 * Math.random()).toFixed(2);
      const inStock = Math.random() > 0.5;
      const productInfo = genDetails();
      const data = `${id}, ${productName}, ${producer}, ${answeredQuestions}, ${numberOfRatings}, ${starPercentages}, ${price}, ${inStock}, ${productInfo}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      console.log('drained: ', i);
      writer.once('drain', write);
    }
  }
  console.log(`started at: ${start.toUTCString()}`);
  write();
};


dataGen(writeProducts, 'utf-8', () => {
  writeProducts.end();
  const end = new Date().getTime() - start.getTime();
  console.log(`Data generated, Time spent: ${Math.floor(end / 60000)}m and ${((end % 60000) / 1000).toFixed(0)}secs`);
});
