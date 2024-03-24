// DataBase
const config = require('../config/development_config');
const mysqlt = require("mysql2");

const connection = mysqlt.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  port: config.mysql.port,
  password: config.mysql.password,
  database: config.mysql.database
});

connection.connect(err => {
  if (err) {
    console.log(err)
    console.log('connecting error');
  } else {
    console.log('connecting success');
  }
});

module.exports = connection;