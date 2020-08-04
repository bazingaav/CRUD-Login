//request statements for express & body-parser
const express = require('express');
const bodyParser = require('body-parser');

//(Good Practice) seperate local & package imports with blank line  
//making connection with DB - imported from db.js
const { sqlite3 } = require('./db.js'); //destructuring syntax from es6
/*
destructuring syntax does the job like split() in python to assign values to vars
eg:
var a = {p:22,q:33};
var{p,q} = a
Thus here,
p=22 & q=33
*/

//calling express function
var app = express();
//configure express middleware to send json data to nodejs project
app.use(bodyParser.json());

//start express server
app.listen(3000, () => console.log('Server started at port: 3000'));
