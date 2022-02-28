import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import path from 'path';
import axios from 'axios';

const express = require('express');

const app = express();

const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Serve files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// A demo async req to fetch some data
async function getSomeData() {
  try {
    const d = await axios.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
    const data = d.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Handle reqs to api route
app.get('/api', async (req, res, next) => {
  const data = await getSomeData();
  res.json(data);
});

// Handle all other reqs with client app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
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
