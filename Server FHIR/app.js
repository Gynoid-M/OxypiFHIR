var express = require("express")
app = express(),
bodyParser = require("body-parser"),
methodOverride = require("method-override");
mongoose = require("mongoose");

// Connection to DB
mongoose.connect('mongodb://localhost/fhir', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  console.log('Connected to Database');
});

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({"type":"fhir"}));
app.use(methodOverride());


// Import Models and controllers
var models     = require('./models/fhirmodel')(app, mongoose);
var ObservationCtrl = require('./controllers/Observation');
var PatientCtrl = require('./controllers/Patient');
var DeviceCtrl = require('./controllers/Device');
var PractitionerCtrl = require('./controllers/Practitioner');
//Example/Main route
var router = express.Router();
router.get('/', function(req,res) {
	res.send("Soy Node y Express con HL7 FHIR DTSU2");

});
app.use(router);

// API routes
var observacion = express.Router();

//Observation op
app.post('/Observation',ObservationCtrl.addObservation)
  .get('/Observation',ObservationCtrl.showObservation)
  .get('/Observation/:id', ObservationCtrl.showObservationbyId);
//Device op
app.post('/Device', DeviceCtrl.addDevice);
//Patient op
app.post('/Patient',PatientCtrl.addPatient)
    .get('/Patient', PatientCtrl.showPatient)
    .get('/Patient/:id',PatientCtrl.showPatientbyId);

app.post('/Practitioner', PractitionerCtrl.addPractitioner);

/*tvshows.route('/fhircontroller/:id')
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);*/

//app.use('/api', tvshows);

//Server Start
app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
