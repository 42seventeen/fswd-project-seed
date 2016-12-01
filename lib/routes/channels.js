var express = require('express'),
  router = express.Router(),
  Webcast = require('../../models').Webcast;
  User = require('../../models').User;
  Channel = require('../../models').Channel;

router.get('/', function(req, res){
  console.log(req.session);
  Channel.findAll()
  .then(function(channels) {
    console.log('------------\n,', channels);
    res.render('channel/index', { title: "Channel Dashboard", channels:channels })
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

router.get('/update/:channel_id', function(req, res){
  console.log('------------\n, REQUEST Body\n,', req.body);
  Channel.findById(req.params.channel_id)
  .then(function(channel){
    console.log(channel);
    res.render('channel/update',{ title: "Update Channel", channel:channel })
  });
});

router.post('/update/:channel_id', function(req, res){
  console.log('------------\nUpdate REQUEST\n', req.body);
  Channel.findById(req.params.channel_id)
  .then(function(channel){
    req.body;
    console.log('****\mreq.body\n',req.body);
    return channel.save();
    res.redirect('/channels');
  });
});

module.exports = router;
