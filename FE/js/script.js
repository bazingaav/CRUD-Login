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
            var len = student_details.length;
            var text = "";
            if(len > 0){
                for(var i =0;i<len;i++){
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
                    $("#d_table").append(text).removeClass("hidden");
                    $('#d_table').DataTable({
                        "searching":false,
                        "pagingType": "simple_numbers" 
                    });
                }
            }
            else{
                $("#elsemsg").append("No Data Available").removeClass("hidden");
            }
        })
}

$('#add_student').submit(function(e) {
    e.preventDefault();
    var vals = $(this).serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    console.log(vals);
    console.log(JSON.stringify(vals));
    fetch('http://localhost:3000/student_details',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(vals)
    })
    .then(response =>{
        result= response.json();
        alert(result.message);
    });
})


function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}