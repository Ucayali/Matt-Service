/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const fs = require('fs');
const faker = require('faker');

const start = new Date();


const writeProducts = fs.createWriteStream('test.csv');
writeProducts.write('id|productName|producer|answeredQuestions|numberOfRatings|starPercentages|price|inStock|productInfo\n', 'utf8');


const dataGen = (writer, encoding, callback) => {
  let i = 10000000;
  let productId = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      productId += 1;
      const id = productId;
      const productName = faker.commerce.productName();
      const producer = faker.company.companyName();
      const answeredQuestions = Math.floor(Math.random() * 100);
      const ones = Math.floor(Math.random() * 100);
      const twos = Math.floor(Math.random() * 100);
      const threes = Math.floor(Math.random() * 100);
      const fours = Math.floor(Math.random() * 100);
      const fives = Math.floor(Math.random() * 100);
      const stars = {
        one: ones,
        two: twos,
        three: threes,
        four: fours,
        five: fives,
      };
      const numberOfRatings = ones + twos + threes + fours + fives;
      const starPercentages = JSON.stringify(stars);
      const price = (10000 * Math.random()).toFixed(2);
      const inStock = Math.random() > 0.5;
      const productInfo = [`'${faker.lorem.sentence()}'`, `'${faker.lorem.paragraph()}'`, `'${faker.lorem.paragraph()}'`];
      const data = `${id}|${productName}|${producer}|${answeredQuestions}|${numberOfRatings}|${starPercentages}|${price}|${inStock}|${productInfo}\n`;
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
  write();
};


dataGen(writeProducts, 'utf-8', () => {
  writeProducts.end();
  const end = new Date().getTime() - start.getTime();
  console.log(`Data generated, Time spent: ${Math.floor(end / 60000)}m and ${((end % 60000) / 1000).toFixed(0)}secs`);
});
