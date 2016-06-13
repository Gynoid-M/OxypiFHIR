var mongoose = require('mongoose');  
var Observation  = mongoose.model('Observation');


//POST - Create a New Observation
exports.addObservation = function(req, res) {  
   
   // console.log('POST');
    //console.log(req.body);
    console.log(req.body.identifier);

    var observacion = new Observation({
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

//GET - Show me all the observations

exports.showObservation = function (req,res){
	Observation.find(function(err,observation){
		if (err) res.status(500).send(err.message);
		console.log('GET')
		res.status(200).jsonp(observation);
	});
}

//Get - Show me all the observations

exports.showObservationbyId = function(req, res){
    var query = Observation.where('{id:req.params.id}')
    query.findOne(function(err,observation){
        if(err) res.status(500).send(err.message);
        res.status(200).jsonp(observation)
    });

}