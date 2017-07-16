const logicModel = require('../models/m_topic.js');

/**************************************************************************
* get all of the topics
**************************************************************************/
function handelAll(req, res) {
	
	logicModel.getTopics(function(err, result) {
		res.json(result);
	});
}

/**************************************************************************
* get a single topic with parameters ie (/for loop)
**************************************************************************/
function handelTopicParams(req, res) {
	
	req.sanitize('topic').escape();

	// trims spaces before and after
	req.sanitize('topic').trim();

	var topic = req.params.topic;

	logicModel.getTopic(topic, function(err, result) {
		res.json(result);
	});
}

/**************************************************************************
* get a single topic with query ie (?search=for loop)
**************************************************************************/
function handelTopicQuery(req, res) {
	
	req.sanitize('topic').escape();

	// trims spaces before and after
	req.sanitize('topic').trim();

	var topic = req.query.topic;

	logicModel.getTopic(topic, function(err, result) {
		res.json(result);
	});
}

/**************************************************************************
* get results of the searched topics with parameters ie (/for)
**************************************************************************/
function handelSearchParams(req, res) {
	
	req.sanitize('search').escape();

	// trims spaces before and after
	req.sanitize('search').trim();

	var search = req.params.search;

	logicModel.searchTopic(search, function(err, result) {
		res.json(result);
	});
}

/**************************************************************************
* get results of the searched topics with query ie (?search=for)
**************************************************************************/
function handelSearchQuery(req, res) {
	
	req.sanitize('search').escape();

	// trims spaces before and after
	req.sanitize('search').trim();

	var search = req.query.search;

	logicModel.searchTopic(search, function(err, result) {
		res.json(result);
	});
}

/**************************************************************************
* get results of the searched topics with query ie (?search=for)
**************************************************************************/
function handelAddTopic(req, res) {

	logicModel.addTopic(req, function(err, result) {
		res.json(result);
	});
}

/**************************************************************************
* Display the form to add new content to the website
**************************************************************************/
function handelNewTopicPage(req, res) {

	if (req.session.active == "yes") {

		res.render('addTopic');

	} else {

		res.render('login');
	}
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