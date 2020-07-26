const express = require('express');
const morgan = require('morgan');
const path = require('path');
const multer = require('multer');
const upload = multer();

const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.resolve(__dirname, '..', 'client', 'public');

app.use(morgan('dev'));
app.use(express.static(publicDir));

app.post('/files', upload.array('sourceFiles', 2), (req, res) => {
  console.log(req.files[0].buffer.toString());
  res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`Good to go at port ${port}`);
});
