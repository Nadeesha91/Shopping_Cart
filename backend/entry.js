//importing modules

var express = require('express');
var mongooose = require('mongoose');
var bodyparser = require('body-parser');
var cors= require('cors');


var app = express();

const route = require('./route/routes');


//connect to mongodb
mongooose.connect('mongodb://localhost:27017/shoppinglist');

//on connection
mongooose.connection.on('connected',()=>{
    console.log('MongoDB connected at port 27017');
});

//on connection error
mongooose.connection.on('error',(err)=>{
    console.log('Error in Database connection:'+err);
});

const port = 3000;

//adding middleware -cors
app.use(cors());

//body-parser
app.use(bodyparser.json);

app.use('/api', route);

app.get('/', (req,res)=>{
    res.send('foobar')
})

app.listen(port, ()=>{
    console.log('Server has been started at port:'+port);
});
