/*This is de Client FHIR for the Raspberry Pi, who will capture the oxymeter data. 
Then, will catch the max and the min read data to send via HTTP PUT (better HTTPS, for that we need to create certificates ),
 because we are creating (CREATE operation)  a new resource with an asociate id

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

//Need to add the device and patient links
var http = require ('http');
var ObservationResource = JSON.stringify ({	
		resourceType:"Observation",
		id:"satO2-4",
		text: {
			status: "generated",
			div: "<div></div>"
		},
		identifier: [
    	{
      		system:  "http://goodcare.org/observation/id",
      		value: "o1223435-10"
    	}
  		],

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
			reference: "http://192.168.1.12:3000/Patient"
			},
		effective: "" ,
		valueQuantity: 	{
		 value: 99,
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
			reference: "http://192.168.1.12:3000/Device"
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
	'Content-Type': 'application/json+fhir',
	'Content-Length': ObservationResource.length
};

var options = {
	host: '192.168.1.12',
	path:'/Observation',
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

http.request(options, callback).write(ObservationResource);

