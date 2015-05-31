var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');


/* ROUTES */
router.get('/', buscarTexto);

function buscarTexto(req, res) {
    //res.json("holi");
    res.json(req.query.value);
    createClient();
}
function createClient() {
    var client = new elasticsearch.Client({
        host: 'localhost:9200',
        log: 'trace'
    });
    sendPing(client)
}
function sendPing(client) {
    client.ping({
        // ping usually has a 3000ms timeout 
        requestTimeout: Infinity,
        // undocumented params are appended to the query string 
        hello: "elasticsearch!"
    }, function (error) {
        if (error) {
            console.trace('elasticsearch cluster is down!');
        } else {
            console.log('All is well');
        }
    });
}


module.exports = router;
