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

//POST - Create Patient
exports.addPatient = function(req,res){
   var patient = new Patient({
    resourceType: req.body.resourceType,
    id: req.body.id,
    text: req.body.text,
    identifier: req.body.identifier,
    system: req.body.system,
    value: req.body.value,
    period: req.body.period,
    effective: req.body.effective,
    assigner: req.body.assigner,
    active: req.body.active,
    name: req.body.name,
    telecom: req.body.telecom,
    gender: req.body.gender,
    _gender: req.body._gender,
    birthDate: req.body.birthDate,
    _birthDate: req.body._birthDate,
    deceasedBoolean: req.body.deceasedBoolean,
    address: req.body.address,
    photo: req.body.photo,
    contact: req.body.contact,
    managingOrganization: req.body.managingOrganization

});

    patient.save(function(err, patient) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(patient);
    });
}
//POST - Create Device
exports.addDevice = function(req,res){
   var device = new Device({
    resourceType: req.body.resourceType,
    id: req.body.id,
    text: req.body.text,
    identifier: req.body.identifier,
    type: req.body.type,
    note: req.body.note,
    status: req.body.status,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    lotNumber: req.body.lotNumber,
    contact: req.body.contact,
    });
    device.save(function(err, device) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(device);
    });

}






