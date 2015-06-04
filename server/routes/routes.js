var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');


/* ROUTES */
router.get('/', buscarTexto);



function buscarTexto(req, res) {
    //res.json("holi");
    res.json(req.query.value);
    createClient(req.query.value);
}
function createClient(texto) {
    var client = new elasticsearch.Client({
        host: 'localhost:9200',
        log: 'trace'
    });
    createIndex(client,texto);
}
function createIndex(client) {
    client.index({
        index: 'Notes',
        type: 'document',
        body: {
            name: 'Los Cobardes',
            text: 'Solos se quedan los hombres al calor de las batallas,\n\
                   y vosotros, lejos de ellas,queréis ocultar la infamia,\n\
                   pero el color de cobardes no se os irá de la cara.'
        }
    }, function (error, response) {
        console.log(response);
    });
}
function buscar(client,texto) {
    client.search({
        index: 'sample',
        type: 'document',
        body: {
            query: {
                query_string:{
                   query:texto
                }
            }
        }
    }).then(function (resp) {
        console.log(resp.hits.hits[0]._source.text);
    }, function (err) {
        console.log(err.message);
    });
}


module.exports = router;
