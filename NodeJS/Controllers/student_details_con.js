const express = require('express');
var app = express();

var {student_details} = require('../Models/student_details');



// localhost:3000/student_details
/* Viewing all records in DB*/
app.get('/', (req, res) => {
    let sql = 'SELECT * from student_details';
    student_details.all(sql,(err,docs) => {
        if(!err){
            res.send(docs);
        }
        else{
            console.log('Error in retrieving student_details: '+ JSON.stringify(err,undefined,2));
            return res.status(400).json({"error":err.message});
        }
    });
});



/* View record by id*/
app.get("/:id", (req, res) => {
    var params = [req.params.id];
    let sql = 'SELECT * from student_details where id = ?';
    student_details.get(sql, params, (err, docs) => {
        if(err == null & docs == null){
            return res.status(400).send('No record with given id:'+ [req.params.id]);
        }
        else if (err == null & docs != null) {
            res.status(200).json(docs);
        }
        else{
            console.log('Error in getting student_details by id: '+ JSON.stringify(err,undefined,2));
            return res.status(400).json({"error":err.message});
        }
      });
});


/* Inserting data into DB */
app.post('/', (req, res) => {
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
            return res.status(400).json({"error":err.message});
        }
    })
});




module.exports = app;