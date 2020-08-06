//const { response } = require("express");
//const student_details = require("../../NodeJS/Models/student_details");

//const { text } = require("body-parser");

//view all records
function view(){
    fetch('http://localhost:3000/student_details')
        .then(response =>{
            return response.json()
        })
        .then(student_details =>{
            /* 
            console.log(student_details);
            console.log("Length: "+student_details.length); */
            var length = student_details.length;
            var text = "";
            if(length > 0){
                for(var i =0;i<length;i++){
                    /* 
                    console.log(student_details[i].id);
                    console.log(student_details[i].name);
                    console.log(student_details[i].school);
                    console.log(student_details[i].grade);
                    console.log(student_details[i].div);
                    console.log(student_details[i].status);
                    console.log("---------------");*/
                    text += "<tr><td>"
                            + (i+1)+"</td><td>"
                            + student_details[i].name +"</td><td>"
                            + student_details[i].age +"</td><td>"
                            + student_details[i].school +"</td><td>"
                            + student_details[i].grade +"</td><td>"
                            + student_details[i].div +"</td><td>"
                            + student_details[i].status +"</td><td>"
                            + "<a>Edit</a>"+"  "+"<a>Delete</a>" + "</td></tr>";
                }
                if(text!= ""){
                    $("#table").append(text).removeClass("hidden");
                }
            }
            else{
                $("#elsemsg").append("No Data Available").removeClass("hidden");
            }
        })
}