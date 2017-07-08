// first get the environment variables
require('dotenv/config');

const express = require('express');
const app = express();
// const expressSession = require('express-session');
const bodyParser = require('body-parser');

// Body Parser 
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const expressValidator = require('express-validator');

// validator
app.use(expressValidator());
// Session
// app.use(expressSession({
// 	secret: process.env.SECRET,
// 	resave: false,
// 	saveUninitialized: false
// }));

// global to access anywhere
var session;

const topicController = require('./controllers/c_topic.js');
const loginController = require('./controllers/c_login.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
//app.use(favicon(__dirname + '/public/images/.ico'));

// views is directory for all template files
app.set('views', __dirname + '/views/pages');
app.set('view engine', 'ejs');

/******************************* Pages ***********************************/
app.get('/', function (req, res) { res.sendFile(__dirname + '/public/html/home.html'); });

app.get('/home.html', function (req, res) { res.sendFile(__dirname + '/public/html/home.html'); });

app.get("/admin", loginController.handelLoginPage);

app.get("/addTopic", topicController.handelNewTopicPage);

/******************************* Endpoints ******************************/
app.get('/topics', topicController.handelAll);

// "/display?id=1"
app.get('/display', topicController.handelTopicQuery);

// "/display/for loop"
app.get("/display/:topic", topicController.handelTopicParams);

// "/search?id=1"
app.get('/search', topicController.handelSearchQuery);

// "/search/for loop"
app.get("/search/:search", topicController.handelSearchParams);

app.post("/add", topicController.handelAddTopic);

// login for the administrator
app.post("/login", loginController.handelLogin);
app.post("/logout", loginController.handelLogout);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});