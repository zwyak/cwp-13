const Sequelize = require('sequelize');
const config = require('./config.json');
const db = require('./models')(Sequelize, config);
const utils = require('./utils')
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
  }).catch((err) =>{
    res.sendStatus(404);
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

fleetsRouter.post('/create', (req, res) => {
  db.fleets.create({
    name: req.body.name
  }).then((f) =>{
    res.send(f.dataValues);
  }).catch((err) =>{
    res.sendStatus(400);
  });
});

fleetsRouter.post('/update', (req, res) => {
  if (!utils.fleetValidate(req.body.id, req.body.name)){
    res.sendStatus(400);
    return;
  }

  db.fleets.update({
    name: req.body.name
  }, {
    where: {
      id: req.body.id
    }
  }).then(() =>{
    res.sendStatus(200);
  }).catch((err) =>{
    res.sendStatus(400);
  });
});

fleetsRouter.post('/delete', (req, res) => {
  db.fleets.destroy({
    where: {
      id: req.body.id
    }
  }).then(() => {
    res.sendStatus(200);
  }).catch((err) =>{
    res.sendStatus(400);
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
