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
        data: {value: textValue}
    })
            .success(function (msg) {
                printResult(msg);
            });
            
                
}
function printResult(msg){
    jQuery('#result').html('');
    positionate()
    msg.map(function(element){
        var title=element._source.title;
        var content=element._source.text;
       $('#result').append("<div class='theme'><p class='title'>"+title+"</p><p class='content'>"+content+"...<a onclick='loadAllContent("+element._source.title+")'> Leer más"+"</p></div>");  
    })
    //$('#result').append("<p id='title'>"+msg[0]._source.name+"</p><p id='content'>"+msg[0]._source.text+"</p>");
    
}
function positionate(){
        //$('#result').css("border","solid 2px")
        $('#container').css("margin-top","0px");
        $('#logo1').css("height","95px");
        $('.input-group').css("top", "-2px;");
    
}
function loadAllContent(){
    alert("holagitano");
}
    