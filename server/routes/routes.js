var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');
var fs = require('fs');
var ruta=process.cwd()+"/server/fichero.txt";

var texto;

fs.readFile(ruta, 'utf8', function(err, data) {
    if( err ){
        console.log("ERROR "+err);
    }
    else{
        texto=data;
    }
});


/* ROUTES */
router.get('/', buscarTexto);

function buscarTexto(req, res) {
    //res.json("holi");
    //res.json(req.query.value);
    /*createClient(req.query.value,function(response){
        res.json(response);
    });*/
    createClient(req.query.value, res);
    
    createClient(req.query.value,function(parametro){
        res.json()
    });
    
}





function createClient(texto1/*,callback*/,res) {
    var client = new elasticsearch.Client({
        host: 'localhost:9200',
        log: 'trace'
    });
    return search(client,texto1/*,callback*/,res);
    //deleteIndex(client);
}
function createIndex(client) {
    client.index({
        index: 'notes',
        type: 'document',
        body: {
            name: 'Tema 2',
            text: texto
        }
    }, function (error, response) {
        console.log(response);
    });
}
function search(client,texto/*,callback*/,res) {
    client.search({
        index: 'notes',
        type: 'document',
        body: {
            query: {
                query_string:{
                   query:texto
                }
            }
        }
    }).then(function (resp) {
        res.json(resp.hits.hits);
    }, function (err) {
        console.log(err.message);
    });
}
function deleteIndex(client){
    client.indices.delete({index: 'indiceABorrar'});
}


module.exports = router;
