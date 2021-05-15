const mongoose = require('mongoose');
const syllabusesSchema = require('../db/data/syllabusesSchema');

const connect = () => new Promise((resolve, reject) => {
  mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
  resolve();
});

const disconnect = () => new Promise((resolve, reject) => {
  mongoose.disconnect();
});

const SyllabusModel = mongoose.model('syllabuses', syllabusesSchema);

module.exports = {
  SyllabusModel,
  connect,
  disconnect,
};
