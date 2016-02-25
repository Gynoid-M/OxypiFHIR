/*This is de Client FHIR for the Raspberry Pi, who will capture the oxymeter data. 
Then, will catch the max and the min read data to send via HTTP PUT (better HTTPS, for that we need to create certificates ),
 because we are CREATEing a new resource with an asociate id

 ---ORDER OF SECUENCE --- 
1 - test, we will do it with HTTP PUT. 
2 - test, when all is already implemented, we encrypt the connection. In other words, we will use HTTPS connection. 
*/
var http = require('http');
var sort = require('node-sort');
var fs = require('fs');



/*
 ------------
|PUT REQUEST|
 -----------
In other words, create two recourses  of OBSERVATION where we send two values: max value of oxygen and min value of oxygen recording during 24 hours.
We remind that is not an emergency case of use, this application is useful in a typical analysis in outpatient diagnostics for preventing future issues.
We need to generate the ids, for example, sat02 and some random digits, to make this id unique. 
---------------------------------------------------------------- 
NOTE: Of course in the future we need to encrypt this message.

*/

var http = require ('http');
var body = JSON.stringify({	
		resourceType:"Observation",
		id: "satO2",
		text: {
			status: "generated",
			div: "<div></div>"
		},
		identifier: [
    	{
      		system:  "http://goodcare.org/observation/id",
      		value: "o1223435-10"
    	}
  		]
  		,

		status: "final" ,
		code:  	{ 
			coding:[ 
			{
				system: "https://rtmms.nist.gov",
		        code: "150456",
		        _code: {
		        fhir_comments: ["      mdc      "]
	          
	        },
		        display:"MDC_PULS_OXIM_SAT_O2"
			}]
		},
		subject: { 
			reference: ""
			//_def: { type: mongoose.Schema.Types.ObjectId, ref: 'def' 
			//donde 'def' es el nombre del objeto a referenciar
		 },
		effective: "" ,
		valueQuantity: 	{
		 value: 95,
		 unit: "%",
		 system: "https://rtmms.nist.gov",
		 code: "262688"
		 },
		 interpretation: {
		    coding:[ 
		      {
			        system :"http://hl7.org/fhir/v2/0078",
			        code: "N",
			        display:"Normal (applies to non-numeric results)"
		      }
	    	]},
		device: {
			reference: "DeviceMetric/example"
		},
		referenceRange: [
		    {
		      low: {
		        value: 95,
		        unit: "%",
		        system: "https://rtmms.nist.gov",
		        code: "262688"
		      },
		      high: {
		        value: 99,
		        unit: "%",
		        system: "https://rtmms.nist.gov",
		        code: "262688"
		      }
		    }
		  ]
	});
//we need verifying the headers.
var headers = {
	'Content-Type': 'application/json',
	'Content-Length': body.length
};

var options = {
	host: 'localhost',
	path:'/fhircontroller',
	port: 3000,
	method: 'POST',
	headers: headers 
};

//We need cover FHIR response specifications. 
var callback = function(response){
	var str = '';
	response.on('data', function(chunk){
		str +=chunk;
	});
	response.on('end', function(){
		console.log(str);
	});
}

http.request(options, callback).write(body);
