var express = require('express'),
  router = express.Router()
  Webcast = require('../../models').Webcast;
  User = require('../../models').User;
  Channel = require('../../models').Channel;

router.get("/", function(req, res){
    res.redirect('/dashboard');
});

router.get("/dashboard", function(req,res){
  console.log(req.session);
  Webcast.findAll({
    include: [ Channel, User ]
  })
  .then(function(webcasts){
    console.log('======\nWEBCASTS\n', webcasts);
    res.render('webcast/dashboard', { title: 'Webcast Dashbaord', webcasts: webcasts });
  });
});

router.get("/detail/:webcast_id", function(req,res){
  console.log('======\nReqBody\n',req.body);
  Webcast.findOne({
    where: {id: req.params.webcast_id},
    include: [ Channel ]
  })
  .then(function(webcast){
    console.log('======\nReqBody\n',webcast);
    res.render('webcast/detail', { title: "Webcast Detail", webcast: webcast });
  });
});

router.get("/new", function(req, res){
  Channel.findAll()
  .then(function(channels){
    User.findAll({ where: { role: "Producer" } })
    .then(function(producers){
      User.findAll({ where: { role: "Developer" } })
      .then(function(developers){
        res.render('webcast/new', { title: "Webcast Detail", channels: channels, producers: producers, developers: developers });
      });
    });
  });
});

router.post("/new", function(req, res){
  console.log('REQUEST BODY\n', req.body);
  Webcast.create(
    req.body
  ).then(function(){
    res.redirect('/');
  })
});

module.exports = router;
