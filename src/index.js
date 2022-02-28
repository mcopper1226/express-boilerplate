import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import path from 'path';

const express = require('express');

const app = express();

const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

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
