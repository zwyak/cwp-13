const fleetValidate = (id, name) =>{
  if (id && name) return true;
  else return false;
}

module.exports.fleetValidate = fleetValidate;

const vehiclesValidate = (id, name, fleetId) =>{
  if (id && name && fleetId) return true;
  else return false;
}

module.exports.vehiclesValidate = vehiclesValidate;
