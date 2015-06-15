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
router.get('/', searchText);
router.get('/searchById', searchById);

function searchText(req, res) {
    //res.json("holi");
    //res.json(req.query.value);
    /*createClient(req.query.value,function(response){
        res.json(response);
    });*/
    createClient(req.query.value, res);
}
function searchById(req, res){
    var client = new elasticsearch.Client({
        host: 'localhost:9200',
        log: 'trace'
    });
    client.get({
        index:"notes",
        type: "document",
        id: req.query.value
    }, function (error, response) {
        res.json(response._source)
    });
}
function createClient(texto1/*,callback*/,res) {
    var client = new elasticsearch.Client({
        host: 'localhost:9200',
        log: 'trace'
    });
    return search(client,texto1/*,callback*/,res);
    //deleteIndex(client);
    //createIndex(client);
}
function createIndex(client) {
    client.index({
        index: 'notes',
        type: 'document',
        body: {
            "title": 'Vientos del puebl',
            "text": texto
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
                   query:texto,
                   "analyzer":"myAnalyzer"
                   
                },
                
            },
        "highlight" : {
            "fragment_size":300,
            "fields" : {
            "text" : {}
        }
    }
            
        },
        
    }).then(function (resp) {
        console.log(resp.hits.hits)
        res.json(resp.hits.hits);
    }, function (err) {
        console.log(err.message);
    });
}
function deleteIndex(client){
    client.indices.delete({index: 'notes'});
}
module.exports = router;
