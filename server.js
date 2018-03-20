const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const API_PORT = process.env.DUNASLOGS_API_PORT || 3000;

let routes = require('./routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(routes);

app.listen(API_PORT, () => {
  console.log(`Listening on port ${API_PORT}`);
});
