
const pg = require('pg');

var config = {};

if (process.env.DATABASE_URL) {

	pg.defaults.ssl = true;
	config = { connectionString : process.env.DATABASE_URL };
}
else
{
	config = {
	  user: process.env.USER_NAME, //env var: PGUSER
	  database: process.env.DB_NAME, //env var: PGDATABASE
	  password: process.env.PWORD, //env var: PGPASSWORD
	  host: process.env.HOST_N, // Server hosting the postgres database
	  port: process.env.PORT_N, //env var: PGPORT
	  max: 10, // max number of clients in the pool
	  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
	};
}

//this initializes a connection pool
//it will keep idle connections open for 30 seconds
//and set a limit of maximum 10 idle clients
const pool = new pg.Pool(config);

/**********************************************************************
* get the list of all topics
**********************************************************************/
function getTopics(callback) {
	  
	var qStr = 'SELECT id, name FROM topic;';

  	pool.query(qStr, function (err, result) {

  		if(err) {
  		    console.error(err.stack);
  		} else {

 		   var results = [];

 		   for (var i = result.rows.length - 1; i >= 0; i--) {
 		   	results.push({  cid: result.rows[i].id, 
 		   						name: result.rows[i].name });
 		   }

 			callback(null, results);
 		}
   });
}

/**********************************************************************
* get a specific topic
**********************************************************************/
function getTopic(topic, callback) {

	topic = sanatize(topic);

	var qStr = 'SELECT name, description, help_tip, location FROM topic WHERE name = $1;';

  	var results = pool.query(qStr, 
  	 	[topic], function (err, result) {

  		if(err) {
  		    console.error(err.stack);
  		} else {

 		   var results = [];

 		   for (var i = result.rows.length - 1; i >= 0; i--) {

				results.push({  name: result.rows[i].name,
							description: result.rows[i].description, 
								help_tip: result.rows[i].help_tip,
								location: result.rows[i].location });
			}

 			callback(null, results);
 		}
   });
}

/**********************************************************************
* search for a topic
**********************************************************************/
function searchTopic(search, callback) {

	search = sanatize(search);
	
	if (search == "Error") {

			var result = [{ cid: 0, name: "No results found. Please search again."}];
 			callback(null, result);
 			return;
	}

	search = '%'+search+'%';

	var qStr = 'SELECT id, name FROM topic WHERE name LIKE $1;';

  	var results = pool.query(qStr, 
  	 	[search], function (err, result) {

  		if(err) {
  		    console.error(err.stack);
  		} else {

 		   var results = [];

 		   for (var i = result.rows.length - 1; i >= 0; i--) {
					results.push({  
						 cid: result.rows[i].id,
						name: result.rows[i].name });
				}
 		  
 		  	if (results[0] == null) {

 		  		results.push({
						 cid: 0,
						name: "No results found. Please search again."});
 		  	}

 			callback(null, results);
 		}
   });
}

/**********************************************************************
* lowercase and remove everything but letters and spaces
**********************************************************************/
function sanatize(topic) {

	if (topic == "" || topic == null) {
		return "Error";
	}

	var clean = topic.toLowerCase();

	clean = clean.replace(/[^a-z ]/g,'');

	return clean;
}

/**********************************************************************
* add the topic information to the website
**********************************************************************/
function addTopic(req1, callback) {

	var result = validateNewTopic(req1);
	var errorList = [];

	if (result.data === null) {

		for (i in result.errors) {

			errorList[i] = result.errors[i].msg;
		}

		callback(null, errorList);

	} else {

		var values = [
			result.data.topicName, 
			result.data.description, 
			result.data.tip, 
			result.data.location
			];

		var qStr = "INSERT INTO topic(name, description, help_tip, location) VALUES ($1,$2,$3,$4);";
		
	  	var results = pool.query(qStr, values, function (err, result) {

	  		if(err) {

	  		    errorList = ["*Unable to add because the topic is a duplicate"];
			
			} else {

				errorList = ["Topic added"];
			}

			callback(null, errorList);
	   });
	}
}

/**********************************************************************
* Validate the fields to prevent malicious attacks
**********************************************************************/
function validateNewTopic(req2) {
	
	var obj = {

		errors: null,
		data: null,
		success: false
	};

	/****************************  Validate ************************/
	req2.checkBody('topicName', '*Enter a topic name').notEmpty();
	req2.checkBody('topicName', '*Topics includes spaces and letters').matches(/^[A-Za-z ]+$/,"i");

	req2.checkBody('location', '*Enter a picture file name').notEmpty();
	req2.check('location', '*File names must include letters and "." i.e. (file.gif)').matches(/^[A-Za-z0-9-]+\.[A-Za-z]{3}$/,"i");

	req2.checkBody('description', '*Enter a description').notEmpty();

	var error = req2.validationErrors();

	if (error) {

		obj.errors = error;

	} else {
		
		/********************* sanitize *************************
		* Prevent injection attacks
		*********************************************************/
		req2.sanitize('topicName').escape();
		req2.sanitize('location').escape();
		req2.sanitize('description').escape();
		req2.sanitize('tip').escape();

		req2.sanitize('topicName').trim();
		req2.sanitize('location').trim();
		req2.sanitize('description').trim();
		req2.sanitize('tip').trim();

		var results = {

			topicName: req2.body.topicName,
			location: req2.body.location,
			description: req2.body.description,
			tip: req2.body.tip
		};

		obj.data = results;
		obj.success = true;
	}

	return obj;
}

/**********************************************************************
* send out the functions
**********************************************************************/
module.exports = {

	getTopics: getTopics,
	getTopic: getTopic,
	searchTopic: searchTopic,
	addTopic: addTopic
};