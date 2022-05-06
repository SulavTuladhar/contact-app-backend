const express = require('express');
const app = express();
const PORT = 9090;

// Importing api router
// const API_ROUTER = require('./api_route');

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