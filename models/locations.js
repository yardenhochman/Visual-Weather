const db = require('../db/config');

const Locations = {};

Locations.countByName = (name) => {
  console.log('model locations 1')
  return db.oneOrNone(`
  SELECT COUNT (*) 
  FROM locations 
  WHERE name = $1`, [name]);
};

Locations.add = (weather) => {
  console.log('model locations 2')
  return db.one(`
  INSERT INTO locations
  (name,lat,lon) VALUES ($1, $2, $3) 
  RETURNING *`, [weather.location,weather.lat,weather.lon]);
}

Locations.UserLocations = (name) => {
  console.log(name, "in user locations")
  console.log('model locations 3')  
  return db.manyOrNone(`
  SELECT locations.name, lat, lon
  FROM locations
  inner join usersLocations on locations.id = usersLocations.locationid
  inner join users on users.id=usersLocations.userid
  WHERE users.name=$1`, [name]);
}
Locations.findIdByName = (name) => {
  console.log('model locations 4')
  return db.oneOrNone(`SELECT * FROM locations WHERE name = $1`, [name]);
};



Locations.findAll = () => {
  return db.query('SELECT * FROM locations ORDER BY id ASC')
}

Locations.findIdByName = (name) => {
  return db.oneOrNone(`SELECT * FROM locations WHERE name = $1`, [name]);
};

Locations.findById = (id) => {
  return db.oneOrNone(`SELECT * FROM locations WHERE id = $1`, [id]);
};


Locations.findSummer = () => {
  return db.oneOrNone(`SELECT * FROM temp WHERE name = summer`);
};
Locations.findWinter = () => {
  return db.oneOrNone(`SELECT * FROM temp WHERE name = winter`);
};

module.exports = Locations;


