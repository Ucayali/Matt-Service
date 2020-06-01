/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = require('../database/PostgreSQL.js');


const PORT = 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../public')));
app.use('/:id', express.static('public'));


app.get('/items/:id', (req, res) => {
  const { id } = req.params;
  db.getProduct(id, res);
});

app.post('/items/', (req, res) => {
  db.createProduct(req.body, res);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}.`);
});


// app.get('/items/:id', (req, res) => {
//   const itemId = req.params.id;
//   db.getAllDocuments(itemId, (err, success) => {
//     if (err) {
//       console.log(err);
//       res.sendStatus(404).end();
//     } else {
//       res.send(success[0]).end();
//     }
//   });
// });

// app.post('/items/', (req, res) => {
//   db.createItem(req.body, (err) => {
//     if (err) {
//       res.status(400);
//       res.end();
//     } else {
//       console.log('item was created with id: ', req.body.id);
//       res.status(201);
//       res.end();
//     }
//   });
// });

// app.delete('/items/:id', (req, res) => {
//   db.deleteOne(req.params.id, (err, deleted) => {
//     if (err) {
//       res.sendStatus(404).send('cannot delete');
//     } else {
//       console.log('item id deleted: ', deleted.id);
//       res.status(200);
//       res.send(deleted).end();
//     }
//   });
// });

// app.patch('/items/:id', (req, res) => {
//   db.updateOne(req.params.id, req.body.price, (err, updated) => {
//     if (err) {
//       console.log('error: ', err);
//       res.status(404).send('cannot delete');
//     } else {
//       console.log('item id updated: ', updated.id);
//       res.status(204).send(updated);
//     }
//   });
// });
