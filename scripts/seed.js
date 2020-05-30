const faker = require('faker');
const Item = require('./database.js');

Item.deleteMany();

for (let i = 0; i < 100; i += 1) {
  const fives = Math.floor(Math.random() * 100);
  const fours = Math.floor(Math.random() * 100);
  const threes = Math.floor(Math.random() * 100);
  const twos = Math.floor(Math.random() * 100);
  const ones = Math.floor(Math.random() * 100);
  const ratingsTotal = ones + twos + threes + fours + fives;
  const productInfo = [];
  for (let j = 0; j < Math.floor(Math.random() * 10) + 1; j += 1) {
    const detail = Math.random();
    if (detail > 0 && detail <= 1 / 3) {
      productInfo.push(faker.lorem.sentence());
    } else if (detail > 1 / 3 && detail <= 2 / 3) {
      productInfo.push(faker.lorem.paragraph());
    } else if (detail > 2 / 3 && detail <= 1) {
      productInfo.push(faker.lorem.paragraphs());
    }
  }
  const item = new Item({
    id: i,
    productName: faker.commerce.productName(),
    producer: faker.company.companyName(),
    answeredQuestions: Math.floor(Math.random() * 100),
    numberOfRatings: ratingsTotal,
    starPercentages: {
      one: ones,
      two: twos,
      three: threes,
      four: fours,
      five: fives,
    },
    price: (10000 * Math.random()).toFixed(2),
    inStock: Math.random() > 0.5,
    productInfo,
  });
  item.save();
}

Item.find((err, item) => {
  if (err) {
    console.log(err);
  } else {
    console.log(item);
    return item;
  }
  return undefined;
});
