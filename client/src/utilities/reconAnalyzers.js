/* eslint-disable no-param-reassign */
module.exports.getMismatchList = (bankTxns, bookTxns) => {
  let bankDiff = 0;
  let bookDiff = 0;
  const bankCounts = bankTxns.reduce((counts, txn) => {
    if (txn.amount in counts) {
      counts[txn.amount] += 1;
    } else {
      counts[txn.amount] = 1;
    }
    return counts;
  }, {});
  const bookCounts = bookTxns.reduce((counts, txn) => {
    if (txn.amount in counts) {
      counts[txn.amount] += 1;
    } else {
      counts[txn.amount] = 1;
    }
    return counts;
  }, {});
  const mismatches = [];
  Object.keys(bankCounts).forEach((amount) => {
    if (!(amount in bookCounts) || bookCounts[amount] !== bankCounts[amount]) {
      mismatches.push(Number(amount));
      bankDiff += Number(amount) * bankCounts[amount];
    }
  });
  Object.keys(bookCounts).forEach((amount) => {
    if (!(amount in bankCounts)) {
      mismatches.push(Number(amount));
      bookDiff += Number(amount) * bookCounts[amount];
    } else if (bookCounts[amount] !== bankCounts[amount]) {
      bookDiff += Number(amount) * bookCounts[amount];
    }
  });
  return {
    mismatchList: mismatches,
    mismatchTotal: bankDiff - bookDiff,
  };
};

module.exports.getMismatchGroup = (bankTxns, bookTxns, amount) => {
  const mismatchGroup = { bank: [], book: [] };
  bankTxns.forEach((txn) => {
    if (txn.amount === amount) {
      mismatchGroup.bank.push(txn);
    }
  });
  bookTxns.forEach((txn) => {
    if (txn.amount === amount) {
      mismatchGroup.book.push(txn);
    }
  });
  return mismatchGroup;
};

module.exports.createRecon = (data) => {
  const { mismatchList, mismatchTotal } = module.exports.getMismatchList(data.bankTxns, data.bookTxns);
  const bankCutoffAmt = data.bankTxns.reduce((total, txn) => {
    if (txn.cutoff) {
      return total + txn.amount;
    }
    return total;
  }, 0);
  const bookCutoffAmt = data.bookTxns.reduce((total, txn) => {
    if (txn.cutoff) {
      return total + txn.amount;
    }
    return total;
  }, 0);
  const bankIncorrectAmt = data.bankTxns.reduce((total, txn) => {
    if (txn.missing) {
      return total + txn.amount;
    }
    return total;
  }, 0);
  const bookIncorrectAmt = data.bookTxns.reduce((total, txn) => {
    if (txn.incorrect) {
      return total + txn.amount;
    }
    return total;
  }, 0);
  return {
    unreconciled: data.endBank - data.endBook,
    bankTxns: data.bankTxns,
    bookTxns: data.bookTxns,
    mismatches: mismatchList,
    comparedDiff: mismatchTotal,
    remainingDiff: data.endBank - data.endBook - mismatchTotal,
    cutoffAmt: bankCutoffAmt + bookCutoffAmt,
    incorrectAmt: bankIncorrectAmt - bookIncorrectAmt,
  };
};
