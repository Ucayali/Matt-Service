const Item = require('./database');

const getAllDocuments = (itemId, callback) => {
  Item.find({ id: itemId }, (err, item) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, item);
    }
  });
};

const createItem = function (obj, callback = () => { }) {
  const item = new Item(obj);
  Item.save((err) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, obj);
    }
  });
};

const deleteOne = (itemId, callback) => {
  Item.findOneAndDelete({ id: itemId }, (err, query) => {
    if (err) {
      callback(err, null);
    }
    return callback(null, query);
  });
};

const updateOne = (itemId, newPrice, callback) => {
  Item.findOneAndUpdate({ id: itemId },
    { $set: { price: newPrice } }, { new: true, upsert: true }, (err, item) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, item);
    });
};

module.exports = {
  getAllDocuments,
  createItem,
  deleteOne,
  updateOne,
};