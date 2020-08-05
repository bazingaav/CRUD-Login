const { response } = require("express");
const student_details = require("../../NodeJS/Models/student_details");

//view all records
function view(){
    fetch('http://localhost:3000/student_details')
        .then(response =>{
            return response.json()
        })
        .then(student_details =>{
            console.log(student_details);
        })
}