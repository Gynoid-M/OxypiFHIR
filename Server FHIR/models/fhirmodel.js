/*
Definition of Observation, Patient, Device and Data DB models. They describes the JSON document template for the specific response.
*/

exports = module.exports = function(app, mongoose) {


	var observacionSchema = new mongoose.Schema({
		 
		resourceType: {type:String},
		id: {type: String,
			 unique: true,
			 index: true
			},
		text: {
			status: {type: String},
			div: {type: String},
		},
		identifier: {type: Array},

		status: { type: String},
		code:  	{ 
		 coding:{type: Array}
		},
		subject: { 
			reference: {type:String}
			//_def: { type: mongoose.Schema.Types.ObjectId, ref: 'def' 
			//donde 'def' es el nombre del objeto a referenciar
		 },
		effective: {type: String},
		valueQuantity: 	{
		 value: {type: Number},
		 unit: {type: String},
		 system: {type: String},
		 code: {type: String}
		 },
		 interpretation: {
	    coding:{type: Array}
  		},
	  device: {
	    reference: {type: String}
	  },
	  referenceRange: [
	    {
	      low: {
	        value: {type: Number},
	        unit: {type: String},
	        system: {type: String},
	        code: {type: String}
	      },
	      high: {
	        value: {type: Number},
	        unit: {type: String},
	        system: {type: String},
	        code: {type: String}
	      }
	    }
	  ]
	});
	//var pracienteSchema = new mongoose.Schema({});
	//var dispositivoSchema = new mongoose.Schema({});
	/*var datosSchema = new mongoose.Schema({
		SPO2: {type: Number},
		RPM: {type: Number}
	});*/

	

	mongoose.model('Observacion', observacionSchema);

// Once we have Scheme built, we connect to DB
mongoose.connect('mongodb://localhost/observacion', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  console.log('Connected to Database');
});
};