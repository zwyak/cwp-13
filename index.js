const Sequelize = require('sequelize');
const config = require('./config.json');
const db = require('./models')(Sequelize, config);
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const fleetsRouter = express.Router();
const motionsRouter = express.Router();
const vehiclesRouter = express.Router();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server app listening on port 3000!');
})
