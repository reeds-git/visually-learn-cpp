
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
	  
	console.log('Connected to postgres!');

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

	console.log("x topic = " + topic);

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
	  
	search = '%'+search+'%';

	console.log("x search = " + search);

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
 		  
 			callback(null, results);
 		}
   });
}

/**********************************************************************
* lowercase and remove everything but letters and spaces
**********************************************************************/
function sanatize(topic) {

	clean = topic.toLowerCase();

	clean = clean.replace(/[^a-z ]/g,'');

	return clean;
}

/**********************************************************************
* send out the functions
**********************************************************************/
module.exports = {

	getTopics: getTopics,
	getTopic: getTopic,
	searchTopic: searchTopic
};