const express = require('express');
const bodyParser = require('body-parser');
const {error404NotFound} = require('./util/return.msg');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

const apiVersion = 'v1';
const apiRoot = `/api/${apiVersion}`;
const block = require('./api/v1/block/block');

app.use(apiRoot + '/block', block);

app.use((req, res) => error404NotFound(res));

module.exports = app;