var express = require('express'),
  router = express.Router(),
  Webcast = require('../../models').Webcast;
  User = require('../../models').User;
  Channel = require('../../models').Channel;

router.get('/', function(req, res){
  console.log(req.session);
  Channel.findAll({
    include: [ Webcast ]
  })
  .then(function(channels) {
    res.render('channel/index', { title: "Channel Dashboard", channels:channels })
  });
});

router.get('/new', function(req, res) {
  res.render('channel/new', { title: "New Channel" });
});

router.post('/new', function(req,res) {
  Channel.create(
    req.body
  ).then(function () {
      res.redirect('/channels');
  })
});

router.get('/detail/:channel_id', function(req, res){
  Channel.findById(req.params.channel_id)
    .then(function(channel){
      Webcast.findAll({
        where: {ChannelId: req.params.channel_id}
      })
      .then(function(webcasts){
        res.render('channel/detail', { title: channel.name, channel:channel, webcasts: webcasts} )
      })
    })

})

router.get('/update/:channel_id', function(req, res){
  Channel.findById(req.params.channel_id)
  .then(function(channel){
    console.log(channel);
    res.render('channel/update',{ title: "Update Channel", channel:channel })
  });
});

router.post('/update/:channel_id', function(req, res){
  console.log(req.body,' :: ',req.body.channelserviceID);
  Channel.findById(req.params.channel_id)
  .then(function(channel){
    channel.name = req.body.name;
    channel.URL = req.body.channelURL;
    channel.note = req.body.note;
    channel.serviceID = req.body.channelserviceID;
    return channel.save()
    .then(function(){
      res.redirect('/channels/detail/' + channel.id);
    });
  });
});

module.exports = router;
