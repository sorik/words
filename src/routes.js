module.exports = function(app){
  var path = require('path');

  app.get('/', function(req, res) {
    res.sendfile(path.join(__dirname, 'index.html'));
  });
}
