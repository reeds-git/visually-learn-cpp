// first get the environment variables
require('dotenv/config');

const express = require('express');
const app = express();

const topicController = require('./controllers/model.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
//app.use(favicon(__dirname + '/public/images/.ico'));

// views is directory for all template files
app.set('views', __dirname + '/views/pages');
app.set('view engine', 'ejs');

app.get('/', function (req, res) { res.sendFile(__dirname + '/public/html/home.html'); });

app.get('/home.html', function (req, res) { res.sendFile(__dirname + '/public/html/home.html'); });

app.get('/topics', topicController.handelAll);

// "/display?id=1"
app.get('/display', topicController.handelTopicQuery);

// "/display/for loop"
app.get("/display/:topic", topicController.handelTopicParams);

// "/search?id=1"
app.get('/search', topicController.handelSearchQuery);

// "/search/for loop"
app.get("/search/:search", topicController.handelSearchParams);

// "/display/12"
// app.post('/new_topic', function (req, res) {

// 	console.log("Create a new topic");

// 	var id = req.params.id;
// 	console.log("Returning view at id = "+ id);
		
// 	var result = {id: id, title:"For Loop"};

// 	res.json(result);
// })

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});