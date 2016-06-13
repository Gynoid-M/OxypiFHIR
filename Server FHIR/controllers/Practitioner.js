var mongoose = require('mongoose');  
var Practitioner  = mongoose.model('Practitioner');

//POST
exports.addPractitioner = function(req,res){
   var practitioner = new Practitioner({
    resourceType: req.body.resourceType,
    id: req.body.id,
    text: req.body.text,
    identifier: req.body.identifier,
    name: req.body.name,
    telecom: req.body.telecom,
    addres: req.body.addres,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    practitionerRole: req.body.practitionerRole,
    speciality: req.body.speciality
    
    });
    practitioner.save(function(err, practitioner) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(practitioner);
    });

}

//GET
exports.showPractitionerbyId = function(req,res){
    Practitioner.findById(req.params.id, function(err, practitioner){
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(practitioner);
    });
}