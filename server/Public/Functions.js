/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function sendData() {
    $.ajax({
        method: "GET",
        url: "/routes/",
        data: {name: "John", location: "Boston"}
    })
            .done(function (msg) {
                alert("Data Saved: " + msg);
            });
                
}