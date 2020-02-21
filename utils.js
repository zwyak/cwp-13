const fleetValidate = (id, name) =>{
  if (id && name) return true;
  else return false;
}

module.exports.fleetValidate = fleetValidate;
