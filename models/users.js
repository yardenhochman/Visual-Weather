const db = require('../db/config');

const Users = {};


Users.findByUserName = userName => {
  return db.oneOrNone(`
    SELECT * FROM users
    WHERE name = $1
    `, [userName]);
};

Users.create = user => {
  return db.one(`
    INSERT INTO users
    (name, email, password_digest)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [user.username, user.email, user.password_digest ]); //add to the insert as well
};

Users.addLocation = (userid,locationid) => {
  return db.one(`
  INSERT INTO usersLocations
  (userid,locationid) VALUES ($1, $2) 
  RETURNING *`, [userid,locationid]);
}
Users.removeLocation = (userid,locationId) => {
  return db.none(`
  DELETE FROM usersLocations
  WHERE userid=$1 AND locationid=$2`, [userid,locationId]);
}
/* Users.checkNewUser = (username, email) => {
  console.log('model users 4')
  return db.oneOrNone(`
  SELECT COUNT (*) 
  FROM users 
  WHERE name = $1 OR email = $2`, [username,email]);
}; */


Users.findSummer = () => {
  return db.oneOrNone(`SELECT * FROM temp WHERE name = summer`);
};
Users.findWinter = () => {
  return db.oneOrNone(`SELECT * FROM temp WHERE name = winter`);
};

module.exports = Users;
