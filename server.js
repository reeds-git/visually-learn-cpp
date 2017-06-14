const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 9000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views/pages');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('home');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});