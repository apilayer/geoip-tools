/* */
require('dotenv').config();
const lib = require('./lib.js');

const TABLE = process.env.TABLE;

const mysql = require('mysql');
const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.MYSQLUSER,
  password: process.env.PASSWORD,
  database: process.env.DB_GEOIP
});

function updateStats (req, res, next) {
  const test = lib.getIP(req);
  if (test) {
    const time = new Date().toISOString().split('T')[0];
    if (process.env.NODE_ENV === 'production') {
      insertHit(time);
    } else {
      console.log('SAVE TEST ...');
    }
  } else {
    console.log(test, 'DONT SAVE => ');
  }
  next();
}

function insertHit (time) {
  let sql = 'INSERT INTO ?? (day, geoip)';
  sql += ' VALUES (?, 0)';
  sql += ` ON DUPLICATE KEY UPDATE geoip = geoip + 1;`;
  const inserts = [TABLE, time];
  sql = mysql.format(sql, inserts);
  con.query(sql, function (err, rows) {
    if (err) {
      console.log('Insert HIT error =>', err);
    // throw err
    } else {
      // console.log(rows)
    }
  });
}

function testDB () {
  console.log('Connecting ......');
  // console.log(con)
  con.connect(function (err) {
    if (err) {
      console.log('Error connecting to DB => ', err);
    } else {
      console.log('Connection OK');
    }
  });
}

module.exports = {
  updateStats: updateStats,
  testDB: testDB
};
