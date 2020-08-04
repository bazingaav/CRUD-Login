const express = require('express');
var app = express();

var {student_details} = require('../Models/student_details');

// localhost:3000/student_details
app.get('/', (req, res) => {
    let sql = 'SELECT * from student_details';
    student_details.all(sql,(err,docs) => {
        if(!err){
            res.send(docs);
        }
        else{
            console.log('Error in retrieving student_details: '+ JSON.stringify(err,undefined,2));
        }
    });
});

app.post('/', (req, res,next) => {
    var reqBody = req.body;
    let insert = 'INSERT into student_details (name,age,school,grade,div,status) VALUES (?,?,?,?,?,?)';
    let parameters = [reqBody.name,reqBody.age,reqBody.school,reqBody.grade,reqBody.div,reqBody.status];
    student_details.run(insert,parameters,(err,docs) => {
        if(!err){
            res.status(201).json({"id": this.lastID});
            res.send(docs);
            console.log("Entry inserted into student_details");
        }
        else{
            console.log('Error in inserting student_details: '+ JSON.stringify(err,undefined,2));
        }
    })
});


module.exports = app;