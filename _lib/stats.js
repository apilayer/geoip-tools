/* */
require('dotenv').config();
const lib = require('./lib.js');

const TABLE = process.env.TABLE;

const mysql = require('mysql');
const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.MYSQLUSER,
  password: process.env.PASSWORD,
  database: process.env.DB
});

const myIP = [
  process.env.IP2,
  process.env.IP3,
  process.env.IP7
];

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

function updateStats (reqdata) {
  const test = reqdata.ip;
  if (test && myIP.indexOf(test) === -1) {
    const time = new Date().toISOString().split('T')[0];
    if (process.env.NODE_ENV === 'production') {
      insertHit(time);
    } else {
      console.log('SAVE TEST ...');
    }
  } else {
    console.log(test, 'DONT SAVE => ');
  }
}

function insertHit (time) {
  let sql = 'INSERT INTO ?? (time) VALUE (?);';
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

module.exports = {
  updateStats: updateStats,
  testDB: testDB
};
