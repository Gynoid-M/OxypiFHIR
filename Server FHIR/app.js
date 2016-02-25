var express = require("express")
app = express(),
bodyParser = require("body-parser"),
methodOverride = require("method-override");
mongoose = require("mongoose");

// Connection to DB
mongoose.connect('mongodb://localhost/observacion', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  console.log('Connected to Database');
});

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride());


// Import Models and controllers
var models     = require('./models/fhirmodel')(app, mongoose);
var ObservacionCtrl = require('./controllers/fhircontroller');

//Example/Main route
var router = express.Router();
router.get('/', function(req,res) {
	res.send("Soy Node y Express con HL7 FHIR DTSU2");

});
app.use(router);

// API routes
var observacion = express.Router();

app.post('/fhircontroller',ObservacionCtrl.addObservation)
  .get('/fhircontroller',ObservacionCtrl.showObservation);
  //.post(TVShowCtrl.addTVShow);

/*tvshows.route('/fhircontroller/:id')
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);*/

//app.use('/api', tvshows);

//Server Start
app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
