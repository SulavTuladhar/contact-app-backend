const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbName = 'contact-app';
const conectionURL = 'mongodb://localhost:27017';
const OID = mongodb.ObjectId;

module.exports = {
    MongoClient,
    dbName,
    conectionURL,
    OID
}