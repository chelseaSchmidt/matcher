module.exports.getMismatchList = (bankTxns, bookTxns) => {
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
    }
  });
  Object.keys(bookCounts).forEach((amount) => {
    if (!(amount in bankCounts)) {
      mismatches.push(Number(amount));
    }
  });
  console.log(bankCounts, bookCounts, mismatches);
  return mismatches;
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
