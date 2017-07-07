const logicModel = require('../models/m_topic.js');

/**************************************************************************
* get all of the topics
**************************************************************************/
function handelAll(req, res) {
	
	console.log("Return topics");

	logicModel.getTopics(function(err, result) {
		res.json(result);
	});
}

/**************************************************************************
* get a single topic with parameters ie (/for loop)
**************************************************************************/
function handelTopicParams(req, res) {
	
	console.log("Return from parameters topic");

	var topic = req.params.topic;

	logicModel.getTopic(topic, function(err, result) {
		res.json(result);
	});
}

/**************************************************************************
* get a single topic with query ie (?search=for loop)
**************************************************************************/
function handelTopicQuery(req, res) {
	
	console.log("Return from query topic");

	var topic = req.query.topic;

	logicModel.getTopic(topic, function(err, result) {
		res.json(result);
	});
}

/**************************************************************************
* get results of the searched topics with parameters ie (/for)
**************************************************************************/
function handelSearchParams(req, res) {
	
	console.log("Return from parameters search");

	var search = req.params.search;

	logicModel.searchTopic(search, function(err, result) {
		res.json(result);
	});
}

/**************************************************************************
* get results of the searched topics with query ie (?search=for)
**************************************************************************/
function handelSearchQuery(req, res) {
	
	console.log("Return from query search");

	var search = req.query.search;

	logicModel.searchTopic(search, function(err, result) {
		res.json(result);
	});
}

/**************************************************************************
* get results of the searched topics with query ie (?search=for)
**************************************************************************/
function handelAddTopic(req, res) {

	console.log("in Handel New ");
}

/**************************************************************************
* Display the form to add new content to the website
**************************************************************************/
function handelNewTopicPage(req, res) {
  res.render('addTopic');
}

/**************************************************************************
* send out the functions
**************************************************************************/
module.exports = {
	
	handelAll: 				handelAll,
	handelTopicParams: 	handelTopicParams,
	handelTopicQuery: 	handelTopicQuery,
	handelSearchParams:  handelSearchParams,
	handelSearchQuery: 	handelSearchQuery,
	handelAddTopic: 		handelAddTopic,
	handelNewTopicPage: 	handelNewTopicPage
};