const Reconciliations = require('../database/model.js');

module.exports.getLastRecon = (req, res) => {
  Reconciliations.find({})
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

module.exports.createRecon = (req, res) => {
  const {
    begBook,
    endBook,
    begBank,
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
      begBank: Number(begBank),
      begBook: Number(begBook),
      endBank: Number(endBank),
      endBook: Number(endBook),
    };

    Reconciliations.create(newRecon)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};