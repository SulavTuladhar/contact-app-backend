const express = require('express');
const app = express();
const PORT = 9090;

// Importing api router
const API_ROUTER = require('./api_route');

// Third party middleware 
const morgan = require('morgan');
const cors = require('cors');

// Loading third party middleware
app.use(cors());
app.use(morgan('dev'))

// Loading inbuilt middleware
app.use(express.static('uploads')); //Serves static files
app.use(express.urlencoded({
    // Parser for x-ww-form-urlencoded
    extended: true
}));
app.use(express.json());
app.use('/files', express.static('uploads'));


app.use('/api', API_ROUTER);

// 404 error handler 
app.use(function(req,res,next){
    next({
        msg: "Page not found",
        status: 404
    })
})

// Error handleing middleware
app.use(function(err,req,res,next){
    res.status(err.status || 400);
    res.json({
        msg: err.msg || err,
        status: err.status || 400
    })
})

app.listen(PORT, function(err,done){
    if(err){
        console.log('Server listening failed ', err);
    }else{
        console.log('Sever listning to port ', PORT);
    }
})