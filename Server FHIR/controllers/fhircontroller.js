//File: controllers/tvshows.js
var mongoose = require('mongoose');  
var Observacion  = mongoose.model('Observacion');



//POST - Create a New Observation
exports.addObservation = function(req, res) {  
   
   // console.log('POST');
    //console.log(req.body);
    console.log(req.body.identifier);

    var observacion = new Observacion({
    resourceType: req.body.resourceType,
    id: req.body.id,
    text: req.body.text,
    identifier: req.body.identifier,
    status: req.body.status,
    code: req.body.code,
    subject: req.body.subject,
    effective: req.body.effective,
    valueQuantity: req.body.valueQuantity,
    interpretation: req.body.interpretation,
    device: req.body.device,
    referenceRange: req.body.referenceRange});

    observacion.save(function(err, observacion) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(observacion);
    });
};

//GET - Show me the observation

exports.showObservation = function (req,res){
	Observacion.find(function(err,observ){
		if (err) res.send(500, err.message);
		console.log('GET')
		res.status(200).jsonp(observ);
	});
}





