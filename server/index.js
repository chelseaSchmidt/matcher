const express = require('express');
const morgan = require('morgan');
const path = require('path');
const multer = require('multer');
const { createRecon, getLastRecon, getAllRecons } = require('./routeHandlers.js');
require('../database/index.js');

const upload = multer();
const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.resolve(__dirname, '..', 'client', 'public');

app.use(morgan('dev'));
app.use(express.static(publicDir));

app.post('/files', upload.array('sourceFiles', 2), createRecon);
app.get('/last-recon', getLastRecon);
app.get('/recons', getAllRecons);

app.listen(port, () => {
  console.log(`Good to go at port ${port}`);
});
