var express = require('express');
var router = express.Router();



/* ROUTES */
router.get('/', buscarTexto);


function buscarTexto(req,res){
    
	res.json(req.query.name);
        console.log(req)
}
module.exports = router;
