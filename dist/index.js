"use strict";

var _bodyParser = require("body-parser");

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const express = require('express');

const app = express();

const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT || 8080;
app.use((0, _cors.default)());
app.use((0, _bodyParser.json)());
app.use((0, _bodyParser.urlencoded)({
  extended: true
})); // Have Node serve the files for our built React app

app.use(express.static(_path.default.resolve(__dirname, '../client/build'))); // Handle GET requests to /api route

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello from server!'
  });
});
app.get('*', (req, res) => {
  res.sendFile(_path.default.resolve(__dirname, '../client/build', 'index.html'));
});

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`REST API on http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();