const logicModel = require('../models/logic.js');

function handelAll(req, res) {
	
	console.log("Return topics");

	logicModel.getTopics(function(err, result) {
		res.json(result);
	});
}

function handelTopicParams(req, res) {
	
	console.log("Return from parameters topic");

	var topic = req.params.topic;

	logicModel.getTopic(topic, function(err, result) {
		res.json(result);
	});
}

function handelTopicQuery(req, res) {
	
	console.log("Return from query topic");

	var topic = req.query.topic;

	logicModel.getTopic(topic, function(err, result) {
		res.json(result);
	});
}

function handelSearchParams(req, res) {
	
	console.log("Return from parameters search");

	var search = req.params.search;

	logicModel.searchTopic(search, function(err, result) {
		res.json(result);
	});
}

function handelSearchQuery(req, res) {
	
	console.log("Return from query search");

	var search = req.query.search;

	logicModel.searchTopic(search, function(err, result) {
		res.json(result);
	});
}

module.exports = {
	
	handelAll: handelAll,
	handelTopicParams: handelTopicParams,
	handelTopicQuery: handelTopicQuery,
	handelSearchParams: handelSearchParams,
	handelSearchQuery: handelSearchQuery
};