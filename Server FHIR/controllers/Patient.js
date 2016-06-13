
var mongoose = require('mongoose');  
var Patient = mongoose.model('Patient');


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
    careProvider: req.body.careProvider});

    patient.save(function(err, patient) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(patient);
    });
}
exports.showPatient = function(req,res){
    Patient.find(function(err,patient){
        if(err) return res.send(500, err.message);
        console.log('GET')
        res.status(200).jsonp(patient);
    });
}
exports.showPatientbyId = function(req, res){
     Patient.findById(req.params.id, function(err, patient){
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(patient);
    });
}