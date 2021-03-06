const express = require('express');
var router = express.Router();
var cors = require('cors')


var {student_details} = require('../Models/student_details');


router.use(cors())
// localhost:3000/student_details
/* Viewing all records in DB*/
router.get('/', (req, res) => {
    let sql = 'SELECT * from student_details';
    student_details.all(sql,(err,docs) => {
        if(!err){
            console.log("Details loaded");
            res.send(docs);
        }
        else{
            console.log('Error in retrieving student_details: '+ JSON.stringify(err,undefined,2));
            return res.status(400).json({"error":err.message});
        }
    });
});



/* View record by id*/
router.get("/:id", (req, res) => {
    var params = [req.params.id];
    let sql = 'SELECT * from student_details where id = ?';
    student_details.get(sql, params, (err, docs) => {
        if(err == null & docs == null){
            return res.status(400).send('No record with given id:'+ [req.params.id]);
        }
        else if (err == null & docs != null) {
            return res.status(200).json(docs);
        }
        else{
            console.log('Error in getting student_details by id: '+ JSON.stringify(err,undefined,2));
            return res.status(400).json({"error":err.message});
        }
      });
});


/* Inserting data into DB */
router.post('/', (req, res) => {
    var reqBody = req.body;
    console.log("In the api"); //temp
    console.log(req.body);//temp
    let insert = 'INSERT into student_details (name,age,school,grade,div,status) VALUES (?,?,?,?,?,?)';
    let parameters = [reqBody.name,reqBody.age,reqBody.school,reqBody.grade,reqBody.div,reqBody.status];
    console.log(parameters);
    student_details.run(insert,parameters,(err,docs) => {
        if(!err){
            return res.status(200).json({"id": this.lastID});
        }
        else{
            console.log('Error in inserting student_details: '+ JSON.stringify(err,undefined,2));
            return res.status(400).json({"error":err.message});
        }
    })
});

/* Updating existing record */
router.patch("/", (req, res, next) => {
    var reqBody = req.body;
    let update = `UPDATE student_details set name = ?, age = ?, school = ?, grade = ?, div = ?, status = ? WHERE id = ?`;
    let parameters = [reqBody.name,reqBody.age,reqBody.school,reqBody.grade,reqBody.div,reqBody.status,reqBody.id];
    student_details.run(update, parameters, (err, docs) => {
            if (!err) {
                console.log("Record updated");
                return res.status(200).json({ updatedID: this.changes });
            }
            else{
                console.log('Error in updating student_details: '+ JSON.stringify(err,undefined,2));
                return res.status(400).json({ "error": res.message });
            }
            
        });
});

/* Deleting records */
router.delete("/", (req, res) => {
    var reqBody = req.body;
    console.log(reqBody);
    let del = 'DELETE from student_details WHERE id=?';
    let params = [reqBody.id];
    console.log(params);
    if(params==undefined){
        return res.status(400).json({ "error": res.message });
    }
    student_details.run(del,params,(err,docs)=> {
        if(!err){
            console.log("Record Deleted");
            return res.status(200).json({ deletedID: this.changes })
        }
        else{
            console.log('Error in deleting record: '+ JSON.stringify(err,undefined,2));
            return res.status(400).json({ "error": res.message });
        }
    });
});

module.exports = router;