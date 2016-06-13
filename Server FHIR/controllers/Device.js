var mongoose = require('mongoose');  
var Device  = mongoose.model('Device');


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



