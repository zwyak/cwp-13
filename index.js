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

fleetsRouter.get('/readall', (req, res) => {
  db.fleets.findAll({raw: true}).then((f) =>{
    res.send(f);
  });
});

fleetsRouter.get('/read', (req, res) => {
  db.fleets.findByPk(req.query.id, {raw: true}).then((f) =>{
    res.send(f);
  })
  .catch((err) =>{
    res.sendStatus(404);
  });
});

app.use("/api/fleets", fleetsRouter);

vehiclesRouter.get('/readall', (req, res) => {
  db.vehicles.findAll({raw: true}).then((f) =>{
    res.send(f);
  });
});

app.use("/api/fleets", vehiclesRouter);

app.listen(3000, () => {
  console.log('Server app listening on port 3000!');
})
