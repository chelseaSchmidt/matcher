module.exports.getMismatchList = (bankTxns, bookTxns) => {
  let bankDiff = 0;
  let bookDiff = 0;
  bankCounts = bankTxns.reduce((counts, txn) => {
    if (txn.amount in counts) {
      counts[txn.amount] += 1;
    } else {
      counts[txn.amount] = 1;
    }
    return counts;
  }, {});
  bookCounts = bookTxns.reduce((counts, txn) => {
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
