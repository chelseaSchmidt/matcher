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
  name: {
    type: String,
    required: true,
  },
  endBank: {
    type: Number,
    required: true,
  },
  endBook: {
    type: Number,
    required: true,
  },
  bankTxns: [bankTransactionsSchema],
  bookTxns: [bookTransactionsSchema],
}, { timestamps: {} });

const Reconciliation = mongoose.model('Reconciliation', reconciliationSchema);

module.exports = Reconciliation;
