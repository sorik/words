/* global module */
module.exports = function(app){
  'use strict';

  app.get('/data/news/:id', function(req, res) {
    var db = req.db;

    var id = req.param('id');
    db.get('newstestcollection')
      .findById(id, function(err, doc) {
        if(err) {
          res.send(500, {message: 'mongodb returns error' + err.message});
        } else {
          res.json(doc);
        }
      });
  });

  app.get('/data/news', function(req, res) {
    var db = req.db;

    db.get('newstestcollection')
      .find({}, {}, function(err, docs) {
        if(err) {
          res.send(500, {message: 'mongodb returns error' + err.message});
        } else {
          res.json(docs);
        }
    });
  });

  app.post('/data/news', function(req, res){

    var db = req.db;
    db.get('newstestcollection')
      .insert(
        {
          title: req.body.title,
          content: req.body.content,
          timestamp: new Date()
        },
        function(err) {
          if (err) {
              res.send(500, {message: 'mongodb returns error' + err.message});
          } else {
            res.send(200);
          }
      });
  });
};