/* */
require('dotenv').config();
const mongo = require('mongodb');
const lib = require('./lib.js');
const maxmind = require('maxmind');
const connection = process.env.DB_STATS;
const myIP = [
  process.env.IP1,
  process.env.IP2,
  process.env.IP3,
  process.env.IP4,
  process.env.IP5
];

function testDB () {
  // console.log('Testing => ', connection)
  mongo.connect(connection, function (err, db) {
    if (err) return console.log(err);
    console.log('Connected correctly to server');
    db.close();
  });
}

function updateStats (req, res, next) {
  const test = lib.getIP(req);
  if (myIP.indexOf(test) === -1) {
    // console.log(test , ' => SAVE')
    let data = {};
    let dbData = {
      'ip': lib.getIP(req),
      'countryCode': '',
      'countryName': '',
      'city': '',
      'time': new Date().toISOString().split('T')[0]
    };
    const dbpath = __dirname + '/db/GeoLite2-City.mmdb';
    maxmind.open(dbpath, function (err, cityLookup) {
      if (err) {
        console.log('Error accessing database. Try again');
        if (process.env.NODE_ENV === 'production') {
          saveDataToDB(dbData);
        } else {
          console.log('SAVE TEST ...', dbData);
        }
        return;
      }
      data = cityLookup.get(dbData.ip);
      if (data !== null) { // not in database
        if (data.country !== undefined) {
          dbData.countryCode = data.country.iso_code || '';
          dbData.countryName = data.country.names['en'] || '';
        }
        if (data.city !== undefined) {
          dbData.city = data.city.names['en'] || '';
        }
      }
      if (process.env.NODE_ENV === 'production') {
        saveDataToDB(dbData);
      } else {
        console.log('SAVE TEST ...', dbData);
      }
    });
  } else {
    // console.log(test , ' => DONT SAVE')
  }
  next();
}

function saveDataToDB (dbData) {
  mongo.connect(connection, function (err, db) {
    if (err) return console.log(err);
    const database = db.db(process.env.DB_NAME);
    const collection = database.collection(process.env.COLLECTION);
    collection.insert(dbData, function (err, result) {
      if (err) return console.log(err);
      db.close();
    });
  });
}

module.exports = {
  updateStats: updateStats,
  testDB: testDB
};
