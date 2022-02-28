"use strict";

var _bodyParser = require("body-parser");

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _axios = _interopRequireDefault(require("axios"));

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
})); // Serve files for our built React app

app.use(express.static(_path.default.resolve(__dirname, '../client/build'))); // A demo async req to fetch some data

async function getSomeData() {
  try {
    const d = await _axios.default.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
    const data = d.data;
    return data;
  } catch (error) {
    console.error(error);
  }
} // Handle reqs to api route


app.get('/api', async (req, res, next) => {
  const data = await getSomeData();
  res.json(data);
}); // Handle all other reqs with client app

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