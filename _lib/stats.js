/* */
require('dotenv').config();
const mongo = require('mongodb');
const lib = require('./lib.js');
const maxmind = require('maxmind');
const connection = process.env.DB_STATS;
const myIP = [
  process.env.IP2,
  process.env.IP3,
  process.env.IP4,
  process.env.IP5,
  process.env.IP9
];

function testDB () {
  // console.log('Testing => ', connection)
  mongo.connect(connection, function (err, db) {
    if (err) return console.log(err);
    console.log('Connected correctly to server');
    db.close();
  });
}

function updateStats (reqdata) {
  const test = reqdata.ip;
  if (test && myIP.indexOf(test) === -1) {
    let dbData = {
      'ip': reqdata.ip,
      'countryCode': reqdata.country_code,
      'countryName': reqdata.country_name,
      'city': reqdata.city,
      'time': new Date().toISOString().split('T')[0]
    };
    if (process.env.NODE_ENV === 'production') {
      saveDataToDB(dbData);
    } else {
      console.log('SAVE TEST ...', dbData.ip);
    }
  } else {
    console.log(test , ' => DONT SAVE');
  }
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

function updateStats2 (req, res, next) {
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

module.exports = {
  updateStats: updateStats,
  updateStats2: updateStats2,
  testDB: testDB
};
