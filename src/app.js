
var express = require('express');
var path = require('path');

require('mongodb');
var monk = require('monk');
var db = monk(process.env.MONGOLAB_URI || 'localhost:27017/words');

var bodyParser = require('body-parser');

var app = express();

app.set('views', path.join(__dirname, 'views'));

app.use(function(req, res, next) {
    req.db = db;
    next();
});

app.use(express.static(__dirname + '/public'));
app.use(express.static('bower_components'));
app.use(express.static(__dirname + '/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

require('./routes')(app);
require('./database/news_repository')(app);

app.listen(process.env.PORT || 8004);
console.log('server is running');

