//view all records
$(window).on('load',function(){
    fetch('http://localhost:3000/student_details')
        .then(response =>{
            return response.json()
        })
        .then(student_details =>{
            var len = student_details.length;
            var text = "";
            if(len > 0){
                for(var i =0;i<len;i++){
                    text += "<tr row_id="+student_details[i].id+"><td>"
                            + (i+1)+"</td><td>"
                            + student_details[i].name+"</td><td>"
                            + student_details[i].age +"</td><td >"
                            + student_details[i].school +"</td><td >"
                            + student_details[i].grade +"</td><td >"
                            + student_details[i].div +"</td><td >"
                            + student_details[i].status +"</td><td >"
                            + "<input type=\"button\" value=\"Edit\" href=\"edit.html\" onclick=\"edit("+i+","+student_details[i].id+")\" class=\"btn_edit\" row_id="+student_details[i].id+"_d>"+"  "
                            + "<input type=\"button\" value=\"Delete\" onclick=\"delete_rec("+student_details[i].id+")\" id="+student_details[i].id+"_d></td></tr>";
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
})

//Add new record
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
        if(response.ok){
            alert("Data Submitted Successfully");
            $('#add_student').trigger("reset");
        }
        else{
            alert("HTTP-Error: " + response.status);
        }
    });
})

//Edit existing record
$('#m_submit').click(function(e) {
    console.log('m_form');
    var db_id = $("#db_id").val()
    var m_name = $("#m_name").val();
    var m_age =$('#m_age').val();
    var m_school =$('#m_school').val();
    var m_grade =$('#m_grade').val();
    var m_div =$('#m_div').val();
    var m_status = $('#m_status').val();
    vals = {
        "id": db_id,
        "name": m_name,
        "age": m_age,
        "school": m_school,
        "grade": m_grade,
        "div": m_div,
        "status": m_status
    }
    console.log(vals);
    console.log(JSON.stringify(vals));
    fetch('http://localhost:3000/student_details',{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(vals)
    })
    .then(response =>{
        if(response.ok){
            alert("Data Edited Successfully");
            window.location.replace("index.html");
        }
        else{
            alert("HTTP-Error: " + response.status);
        }
    });
    console.log("Done");
})



//On button click -edit
function edit(r_id,db_id){
var table = $('#d_table').DataTable();
var data = table.row(r_id).data();
var ans ="?"+db_id+"&"+data[1]+"&"+data[2]+"&"+data[3]+"&"+data[4]+"&"+data[5]+"&"+data[6]; 
var url = "edit.html";
window.location.replace(url+ans);
}

//Delete record
function delete_rec(id_val){
    console.log('in the api');
    console.log(id_val);
    let val = {
        id: id_val
    }
    fetch('http://localhost:3000/student_details',{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
        body:  JSON.stringify(val)
    })
    .then(response =>{
        if(response.ok){
            location.reload();
            alert("Record Deleted Successfully");
        }
        else{
            alert("HTTP-Error: " + response.status);
        }
    });
}


//Export to excel
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