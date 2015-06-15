/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var disqus_shortname = 'enotesearcher';
var disqus_identifier; //made of post id and guid
var disqus_url; //post permalink

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
        var id=element._id;
        var summary=element.highlight.text;
        var insert="<div class='theme'><p class='title'>"+title+"</p><p class='content'>"+summary+"...<a onclick=loadAllContent('"+id+"'); > Leer más"+"</p></div>";
        
        /*var clickme = "onclick="+'"'+"loadAllContent("+"'"+content+"'"+");"+'"';
        var insert="<div class='theme'><p class='title'>"+title+"</p><p class='content'>"+summary+"<a "+clickme+" > Leer más"+"</p></div>";
        */   
       $('#result').append(insert);  
       
       
    })
   
}
function positionate(){
        //$('#result').css("border","solid 2px")
        $('#container').css("margin-top","0px");
        $('#logo1').css({"height":"95px","top":"10px"});
        $('.input-group').css("top", "-2px;");
    
}
var i =1;
function loadAllContent(id){
    hiddeAll();
    var text;
    var disqus="<div id='disqus_thread'></div><script type='text/javascript'>var disqus_shortname = 'enotesearcher';(function() {var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);})();</script>";
 
    $.ajax({
        method: "GET",
        url: "/routes/searchById",
        data: {value: id}
    })
            .success(function (msg) {
                //printResult(msg);
                $('#completeResult').css("display","block");
                $('#completeResult').html("<div id='completeTitle'>"+msg.title+"</div><hr><div id='completeText'>"+msg.text+"</div><a id='arrowBack' onclick='goBack()'class='glyphicon glyphicon-arrow-left'> Atras</a><br>"+disqus);     
                $('#logo1').css({"height":"125px","position":"relative","left":"-15px","top":"20px"});  
                i++;
            });
            loadDisqus($('#arrowBack'),id,'https://enotesearcher-adrian93.c9.io/'+id);

            
   // $('#logo2').append("<div>"+text+"</div>");        
}
function loadDisqus(source, identifier, url) {
    console.log("source",source, "identifier", identifier, "url",url);

/*if (window.DISQUS) {

   jQuery('#disqus_thread').insertAfter(source); //append the HTML after the link

   //if Disqus exists, call it's reset method with new parameters
   window.DISQUS.reset({
      reload: true,
      config: function () {
      this.page.identifier = identifier;
      this.page.url = url;
      }
   });

} else {
*/
   //insert a wrapper in HTML after the relevant "show comments" link
   jQuery('<div id="disqus_thread"></div>').insertAfter(source);
   disqus_identifier = identifier; //set the identifier argument
   disqus_url = url; //set the permalink argument

   //append the Disqus embed script to HTML
   var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
   dsq.src = 'https://' + disqus_shortname + '.disqus.com/embed.js';
   jQuery('head').append(dsq);

//}
};
function hiddeAll(){
    $('.input-group-addon, #helpIcon, #textToFind').css("visibility","hidden");
    $('#result').css("display","none");
}
function goBack(){
    $('#completeResult').css("display","none");
    $('.input-group-addon, #helpIcon, #textToFind').css("visibility","visible");
    $('#result').css("display","block");
    $('iframe').remove();
    
}
    