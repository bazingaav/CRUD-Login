const sqlite3 = require('sqlite3');
const db = require("../db")

let create = 'CREATE TABLE IF NOT EXISTS student_details(\
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
    name VARCHAR(30) NOT NULL,\
    age INTEGER NOT NULL,\
    school VARCHAR(50) NOT NULL,\
    grade INTEGER NOT NULL,\
    div  CHARACTER(1) NOT NULL,\
    status VARCHAR(10) NOT NULL)';
 
var student_details = db.run(create, [] ,(err)=>{
    if(!err){
        console.log("student_details table created/exists!");
    }
    else{
        console.log('Error in student_details table creation: '+ JSON.stringify(err,undefined,2));
    }
});

module.exports = {student_details};