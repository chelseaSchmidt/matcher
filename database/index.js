const mongoose = require('mongoose');

const host = process.env.HOST || 'localhost';
const database = 'matcherdb';

mongoose.connect(`mongodb://${host}/${database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Connected to ${database} at ${host}`);
});

module.exports = db;
