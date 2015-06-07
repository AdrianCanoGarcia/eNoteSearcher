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
    
}





function createClient(texto1/*,callback*/,res) {
    var client = new elasticsearch.Client({
        host: 'localhost:9200',
        log: 'trace'
    });
    return search(client,texto1/*,callback*/,res);
    // deleteIndex(client);
    //putMappings(client);
    //createIndex(client);
    
}
function putMappings(client){
    client.indices.create({
    index:"notes",
    type: "document",
    "settings" : {
        "analysis" : {
            "analyzer" : {
                "myAnalyzer" : {"tokenizer" : "standard","filter" : [ "snowball", "asciifolding"/*, "ebes_stop"*/ ]}
            }/*,
            "filter" : {
                "ebes_stop" : {"type" : "stop","stopwords_path" : "ebes_stop.txt"}
            }*/
        }
    },
    "mappings" : {
        "note": {
                "properties": {
                    "title": {
                                "type": "string",
                                "term_vector": "with_positions_offsets_payloads",
                                "store" : "yes",
                                "index_analyzer" : "myAnalyzer1"
                         },
                    "text": {
                                "type": "string",
                                "term_vector": "with_positions_offsets_payloads",
                                "store" : "yes",
                                "index_analyzer" : "myAnalyzer1"
                         }
                 }
            }
    }
    });
}
function createIndex(client) {
    client.index({
        index: 'notes',
        type: 'document',
        body: {
            "title": 'Tema 2',
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
                   "analyzer" :"myAnalyzer"
                   
                },
                
            },
        "highlight" : {
            "fragment_size" : 300,
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
