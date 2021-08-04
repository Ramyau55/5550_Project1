var SERVER_URL = 'http://dev.cs.smu.ca:8112';
function add(){
 var uniname = $("#uniname").val();
 var uniaddress = $("#uniaddress").val();
 var uniphone = $("#uniphone").val(); 

    //Validations
    if (uniname == '') {
        alert("Please enter the name of the university!");
        $("#uniname").focus();
        return false;
    }
    if (uniaddress == '') {
        alert("Please enter the address of the university!");
        $("#uniaddress").focus();
        return false;
    }
    if (uniphone == '') {
        alert("Please enter the phone number of the university!");
        $("#uniphone").focus();
        return false;
    }
    var tokens = uniphone.split('-');

    for (var i = 0; i < tokens.length; i++) {
        if (isNaN(tokens[i])) {
            alert("Please use only numbers or hyphens!");
            $("#uniphone").focus();
            return false;
        }//end if
    }//end for
    var firstChar = uniaddress.trim().substr(0, 1);

    if (isNaN(firstChar)) {
        alert("Address should start with a number!");
        $("#uniaddress").focus();
        return false;
    }
    if (validCharForStreetAddress(uniaddress)) {
        alert("Address should contain letters!");
        $("#uniaddress").focus();
        return false;
    }
    var universityInfo = {
        "Name": document.getElementById("uniname").value ,
        "Address": document.getElementById("uniaddress").value ,
        "Phone": document.getElementById("uniphone").value ,
    };

        $.post(SERVER_URL + "/addUniversity",
                        universityInfo,
                        function (data) {
                        alert(data);
        });

}
function validCharForStreetAddress(c) {
    if(",#-/ !@$%^*(){}|[]\\".indexOf(c) >= 0){
        return true
    }
    var regExp = /[a-zA-Z]/g;
    if(!regExp.test(c)){
        return true
    }
}


function remove(){
var name = $("#uniname").val();
if (name == '') {
        alert("Please enter the name of the university!");
        $("#uniname").focus();
        return false;
    }
var universityInfo = {
            "Name": document.getElementById("uniname").value  };
    $.post(SERVER_URL + "/deleteUniversity",
                        universityInfo,
                        function (data) {
if(data['n']==0){
alert("Record Not Found");
}
else{
alert("Record deleted");
}
        });

//now clean up the form
        $("#uniname").val('');
        $("#uniaddress").val('');
        $("#uniphone").val('');
    return;
}

function displayRecords(ele){
    alert(1)
$("#displayTable").html(
                "   <tr>" +
                "<th>Name</th>" +
                "     <th>Address</th>" +
                "     <th>Phone</th>" +
                "   </tr>"
        );
if(ele.id=="0"){
var name = $("#search").val();
console.log("tables")
if (name == '') {
        alert("Please enter the name of the university!");
        $("#uniname").focus();
        return false;
    }
    var universityInfo = {
                "Name": document.getElementById("search").value  };
    $.post(SERVER_URL + "/searchUniversity",
                            universityInfo,
                            function (data) {
                            var table = document.getElementById('displayTable');
            var universities = (data);
            if(universities.length==0){
                    alert("University is not present")
            return;
            }
            //go through each record
            for (var i = 0; i < universities.length; i++) {
                var name = universities[i].Name;//Name attribute
                var address = universities[i].Address; // Address attribute
                var phone = universities[i].Phone; //PhoneNumber attribute
                var r = table.insertRow();
                r.insertCell(-1).innerHTML = name;
                r.insertCell(-1).innerHTML = address;
                r.insertCell(-1).innerHTML = phone; 
            }
            });
    }
    else{
    $.post(SERVER_URL + "/searchAllUniversity",
                            function (data) {
                            var table = document.getElementById('displayTable');
            var universities = (data);
    if(universities.length==0){
    alert("University is not present")
    return;
    }
            //go through each record
            for (var i = 0; i < universities.length; i++) {
                var name = universities[i].Name;//Name attribute
                var address = universities[i].Address; // Address attribute
                var phone = universities[i].Phone; //PhoneNumber attribute
                var r = table.insertRow();
                r.insertCell(-1).innerHTML = name;
                r.insertCell(-1).innerHTML = address;
                r.insertCell(-1).innerHTML = phone;
            }
            });
    
    }
    
}
    
    