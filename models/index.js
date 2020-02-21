const Fleet = require('./fleets');
const Motion = require('./motions');
const Vehicle = require('./vehicles');

module.exports = (Sequelize, config) => {
  const sequelize = new Sequelize(config.database, {
    define: {
      timestamps: true,
      paranoid: true
    }
  });

  const motions = Motion(Sequelize, sequelize);
  const vehicles = Vehicle(Sequelize, sequelize);
  const fleets = Fleet(Sequelize, sequelize);

  fleets.hasOne(vehicles);
  vehicles.hasOne(motions);

  sequelize.sync()
  .then((result) => {
    console.log(result);
  });


  return {
    fleets,
    vehicles,
    motions,

    sequelize: sequelize,
    Sequelize: Sequelize,
  };
};
