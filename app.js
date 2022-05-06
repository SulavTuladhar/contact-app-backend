const express = require('express');
const app = express();
const PORT = 9090;

app.listen(PORT, function(err,done){
    if(err){
        console.log('Server listening failed ', err);
    }else{
        console.log('Sever listning to port ', PORT);
    }
})