/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function checkIfEnter(event){
    if(event.charCode==13) checkEmptyField();
}
function checkEmptyField(){
    var textValue= $('#textToFind').val();
    textValue=="" ? $('#alert1').fadeIn(): sendData(textValue);
}
function showHelp(){
    $('#alert2:visible').length==0 ? $('#alert2').fadeIn() : $('#alert2').fadeOut();
}
function sendData(textValue) {
    $.ajax({
        method: "GET",
        url: "/routes/",
        data: {value: textValue, location: "Boston"}
    })
            .done(function (msg) {
                alert("Data Saved: " + msg);
            });
                
}