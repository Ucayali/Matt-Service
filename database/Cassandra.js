/* eslint-disable no-console */
const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
});


client.connect()
  .then(() => {
    console.log('Cassandra online!');
  });
