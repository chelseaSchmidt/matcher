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
    .catch((err) => {
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
    .catch((err) => {
      res.sendStatus(500);
    });
};

module.exports.updateBankTxn = (req, res) => {
  console.log(req.body);
  const { isCutoff } = req.body;
  Reconciliation.findOneAndUpdate({ 'bankTxns._id': req.params.id }, { $set: { 'bankTxns.$.cutoff': isCutoff } }, { new: true })
    .then((modified) => {
      console.log(modified);
      res.status(200);
      res.send(modified);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

module.exports.updateBookTxn = (req, res) => {
  console.log(req.params);
  res.sendStatus(418);
};

module.exports.createRecon = (req, res) => {
  const {
    endBook,
    endBank,
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
      bookTxns,
      bankTxns,
      endBank: Number(endBank),
      endBook: Number(endBook),
    };

    Reconciliation.create(newRecon)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};