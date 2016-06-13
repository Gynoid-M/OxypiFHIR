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
			//reference: { type: mongoose.Schema.Types.ObjectId, ref: 'patientSchema'}
			reference: {type: String}
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
	   // reference: {type: mongoose.Schema.Types.ObjectId, ref: 'deviceSchema'}
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
	var patientSchema = new mongoose.Schema({
		resourceType: {type:String},
		id: {type: String,
			 unique: true,
			 index: true
			},
		text: {
		status: {type: String},
		div: {type: String},
		},
		identifier:{type:Array},
		active:{type: Boolean},
		name: {type:Array},
		telecom:{type: Array},
		gender:{type: String},
		_gender:{
			fhir_comments:{type: Array},

		},
		birthDate: {type: String},
		_birthDate: {
			extension:{type: Array}
		},
		deceasedBoolean: {type: Boolean},
		address: {type:Array},
		//photo: {type: String},
		contact:{type: Array},
		careProvider: {
			//reference: {type: mongoose.Schema.Types.ObjectId, ref: 'practicionerSchema'}
			reference: {type: String}
		}
		});

	var deviceSchema = new mongoose.Schema({
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
		type: {
			coding: {type:Array},
			text: {type: String}
		},
		note: {type: Array},
		status: {type: String},
		manufacturer: {type: String},
		model: {type: String},
		lotNumber: {type: String},
		contact: {type: Array}
	});
	//We will store a physician
	var practitionerSchema = new mongoose.Schema({
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
		name: {
			use: {type:String},
			family: {type:Array},
			given: {type:Array},
			suffix: {type:Array},
		},
		telecom: {type:Array},
		address: {type:Array},
		gender: {type: String},
		birthDate: {type: String},
		practitionerRole: {type: Array},
		speciality: {type:Array}

	});

	mongoose.model('Observation', observacionSchema);
	mongoose.model('Patient', patientSchema);
	mongoose.model('Device',deviceSchema);
	mongoose.model('Practitioner', practitionerSchema);

// Once we have Scheme built, we connect to DB
mongoose.connect('mongodb://localhost/fhir', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  console.log('Connected to Database');
});
};