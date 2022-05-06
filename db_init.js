const dbConfig = require('./configs/db.config');
const mongoose = require('mongoose');

mongoose.connect(dbConfig.conectionURL + '/' + dbConfig.dbName, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, function(err,done){
    if(err){
        console.log('Database connection failed');
    }else{
        console.log('Database connection open');
    }
})