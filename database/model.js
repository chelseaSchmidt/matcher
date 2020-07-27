const mongoose = require('mongoose');

const bookTransactionsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cutoff: {
    type: Boolean,
    default: false,
  },
  group: {
    type: String,
    default: null,
  },
  incorrect: {
    type: Boolean,
    default: false,
  },
});

const bankTransactionsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cutoff: {
    type: Boolean,
    default: false,
  },
  group: {
    type: String,
    default: null,
  },
  missing: {
    type: Boolean,
    default: false,
  },
});

const reconciliationSchema = new mongoose.Schema({
  begBank: {
    type: Number,
    required: true,
  },
  endBank: {
    type: Number,
    required: true,
  },
  begBook: {
    type: Number,
    required: true,
  },
  endBook: {
    type: Number,
    required: true,
  },
  bankTxns: [bankTransactionsSchema],
  bookTxns: [bookTransactionsSchema],
});

const Reconciliations = mongoose.model('Reconciliation', reconciliationSchema);

module.exports = Reconciliations;
