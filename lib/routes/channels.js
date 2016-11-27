var express = require('express'),
  router = express.Router(),
  Channel = require('../../models').Channel;

router.get('/', function(req, res){
  console.log(req.session);
  Channel.findAll()
  .then(function(channels) {
    res.render('index', { title: "Webcast Dashbaord", channels:channels })
  });
});

router.get('/new', function(req, res) {
  res.render('channel/new', { title: "New Channel" });
});

router.post('/new', function(req,res) {
  console.log('------------\n, REQUEST Body\n,', req.body);
  Channel.create(
    req.body
  ).then(function () {
      res.redirect('/channels');
  })
});

module.exports = router;
