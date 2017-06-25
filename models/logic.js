
const pg = require('pg');

var config = {
  user: process.env.USER_NAME, //env var: PGUSER
  database: process.env.DB_NAME, //env var: PGDATABASE
  password: process.env.PWORD, //env var: PGPASSWORD
  host: process.env.HOST_N, // Server hosting the postgres database
  port: process.env.PORT_N, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

//this initializes a connection pool
//it will keep idle connections open for 30 seconds
//and set a limit of maximum 10 idle clients
const pool = new pg.Pool(config);

function getTopics(callback) {
	  
	console.log('Connected to postgres!');

	var qStr = 'SELECT name FROM topic;';

  	pool.query(qStr, function (err, result) {

  		if(err) {
  		    console.error(err.stack);
  		} else {

 		   var results = [];

 		   for (var i = result.rows.length - 1; i >= 0; i--) {
 		   	results.push({ name: result.rows[i].name });
 		   }
 		  
 			console.log(JSON.stringify(results));
 			callback(null, results);
 		}
   });
}

function getTopic(topic, callback) {

	console.log("x topic = " + topic);


	var qStr = 'SELECT name, description, help_tip, location FROM topic t JOIN image i ON i.topic_id=t.id WHERE name = $1;';

  	 var results = pool.query(qStr, 
  	 	[topic], function (err, result) {

  		if(err) {
  		    console.error(err.stack);
  		} else {

 		   var results = [];

 		   for (var i = result.rows.length - 1; i >= 0; i--) {
					results.push({  name: result.rows[i].name,  
								discription: result.rows[i].discription, 
										  url: result.rows[i].url });
				}
 		  
 			callback(null, results);
 		}
   });
}

function searchTopic(search, callback) {
	  
	search = '%'+search+'%';

	console.log("x search = " + search);


	var qStr = 'SELECT name FROM topic WHERE name LIKE $1;';

  	 var results = pool.query(qStr, 
  	 	[search], function (err, result) {

  		if(err) {
  		    console.error(err.stack);
  		} else {

 		   var results = [];

 		   for (var i = result.rows.length - 1; i >= 0; i--) {
					results.push({  name: result.rows[i].name });
				}
 		  
 			callback(null, results);
 		}
   });
}

module.exports = {

	getTopics: getTopics,
	getTopic: getTopic,
	searchTopic: searchTopic
};