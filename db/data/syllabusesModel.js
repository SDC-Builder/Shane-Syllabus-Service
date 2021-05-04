const mongoose = require('mongoose');
const dotenv = require('dotenv');
const syllabusesSchema = require('./syllabusesSchema.js');

dotenv.config();

const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_DB = process.env.MONGO_DB || 'syllabuses';

const connect = () => new Promise((resolve, reject) => {
  mongoose.connect(`mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`, { useNewUrlParser: true, useUnifiedTopology: true });
  resolve();
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, `syllabuses connection error: Host: ${MONGO_HOSTNAME} \nPort: ${MONGO_PORT} \n`));
db.once('open', () => {
  console.log(`syllabusesModel connected to db\nMONGO_HOSTNAME: ${MONGO_HOSTNAME}\nMONGO_PORT: ${MONGO_PORT}\nMONGO_DB: ${MONGO_DB}`);
});

const SyllabusModel = mongoose.model('syllabuses', syllabusesSchema);

module.exports = {
  SyllabusModel,
  connect,
};
