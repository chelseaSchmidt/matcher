const express = require('express');
const morgan = require('morgan');
const path = require('path');
const multer = require('multer');
const db = require('../database/index.js');
const Reconciliations = require('../database/model.js');

const upload = multer();
const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.resolve(__dirname, '..', 'client', 'public');

app.use(morgan('dev'));
app.use(express.static(publicDir));

app.post('/files', upload.array('sourceFiles', 2), (req, res) => {
  if (req.files.length < 2) {
    res.status(400);
    res.send('Please submit two source files');
  } else {
    const bankLines = req.files[0].buffer.toString().split('\n').slice(8, -1);
    const bookLines = req.files[1].buffer.toString().split('\n').slice(1);
    const bankTxns = bankLines.map((line) => {
      const fields = line.split(',');
      const txn = {
        date: new Date(fields[0]),
        description: fields[1].slice(1, -1),
        amount: Number(fields[2].slice(1, -1)),
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
    Reconciliations.create({ bookTxns, bankTxns })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
});

app.listen(port, () => {
  console.log(`Good to go at port ${port}`);
});
