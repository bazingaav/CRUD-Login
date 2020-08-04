const sqlite3 = require('sqlite3'); //Request statement for sqlite3
const db = new sqlite3.Database('./Database/student_details.db', (err)=>{
    if(!err){
        console.log('Database Connected!');
    }
    else{
        console.log('Error in DB Connection: '+ JSON.stringify(err,undefined,2));
    }
});

module.exports = db; //to run this funct outside db class