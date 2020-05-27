/* eslint-disable no-console */
const cassandra = require('cassandra-driver');

const tempClient = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
});

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keySpace: 'item_details',
});

tempClient.connect()
  .then(() => {
    console.log('Cassandra online!');
  })
  .then(() => {
    tempClient.execute("CREATE KEYSPACE IF NOT EXISTS item_details WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1}");
    console.log('item_details keyspace created!');
  })
  .then(() => {
    client.connect((err) => (err ? console.log('Connection error!', err) : console.log('Connected to item_details keyspace!')));
  })
  .then(() => {
    client.execute('DROP TABLE IF EXISTS item_details.items')
      .then(() => {
        console.log('Existing table dropped. Creating new table!');
      });
  })
  .then(() => {
    client.execute('CREATE TABLE IF NOT EXISTS item_details.items (id INT, productName TEXT, producer TEXT, answeredQuestions INT, numberOfRatings INT, starPercentages TEXT, price DOUBLE, inStock BOOLEAN, productinfo list<text>, PRIMARY KEY (id))')
      .then(() => {
        console.log('item_details.items table created!');
      });
  })
  .catch((err) => {
    console.error('Cassandra connection error!', err);
  });
