const Reconciliation = require('../database/model.js');

module.exports.getLastRecon = (req, res) => {
  Reconciliation.find({})
    .sort('-createdAt')
    .limit(1)
    .then((results) => {
      if (results.length === 0) {
        res.sendStatus(404);
      } else {
        res.status(200);
        res.send(results[0]);
      }
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

module.exports.getAllRecons = (req, res) => {
  Reconciliation.find({})
    .sort('-createdAt')
    .then((results) => {
      if (results.length === 0) {
        res.sendStatus(404);
      } else {
        res.status(200);
        res.send(results);
      }
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

module.exports.updateCutoff = (req, res) => {
  const { isCutoff, type } = req.body;
  if (type === 'bank') {
    Reconciliation.findOneAndUpdate({ 'bankTxns._id': req.params.id }, { $set: { 'bankTxns.$.cutoff': isCutoff } }, { new: true })
      .then((modified) => {
        res.status(200);
        res.send(modified);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  } else {
    Reconciliation.findOneAndUpdate({ 'bookTxns._id': req.params.id }, { $set: { 'bookTxns.$.cutoff': isCutoff } }, { new: true })
      .then((modified) => {
        res.status(200);
        res.send(modified);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  }
};

module.exports.updateIncorrect = (req, res) => {
  const { isIncorrect, type } = req.body;
  if (type === 'bank') {
    Reconciliation.findOneAndUpdate({ 'bankTxns._id': req.params.id }, { $set: { 'bankTxns.$.missing': isIncorrect } }, { new: true })
      .then((modified) => {
        res.status(200);
        res.send(modified);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  } else {
    Reconciliation.findOneAndUpdate({ 'bookTxns._id': req.params.id }, { $set: { 'bookTxns.$.incorrect': isIncorrect } }, { new: true })
      .then((modified) => {
        res.status(200);
        res.send(modified);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  }
};

module.exports.createRecon = (req, res) => {
  const {
    endBook,
    endBank,
    bankName,
  } = req.body;

  if (req.files.length < 2) {
    res.status(400);
    res.send('Please submit two source files');
  } else {
    const bankLines = req.files[0].buffer.toString().split('\n').slice(8);
    const bookLines = req.files[1].buffer.toString().split('\n').slice(1);

    const bankTxns = bankLines.map((line) => {
      const fields = line.split(',');
      const txn = {
        date: new Date(fields[0]),
        description: fields[1],
        amount: Number(fields[2]),
      };
      return txn;
    });

    const bookTxns = bookLines.map((line) => {
      const fields = line.split(',');
      const txn = {
        date: new Date(fields[0]),
        description: fields[1],
        amount: Number(fields[2]),
      };
      return txn;
    });

    const newRecon = {
      name: bankName,
      bookTxns,
      bankTxns,
      endBank: Number(endBank),
      endBook: Number(endBook),
    };

    Reconciliation.create(newRecon)
      .then(() => {
        res.sendStatus(201);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  }
};
