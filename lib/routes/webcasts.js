var express = require('express'),
  router = express.Router()
  Webcast = require('../../models').Webcast;
  User = require('../../models').User;
  Channel = require('../../models').Channel;

router.get("/", function(req, res){
    res.redirect('/dashboard');
});

router.get("/dashboard", function(req,res){
  Webcast.findAll({
    where: { webcastDate: {$gte: new Date()} },
    include: [ Channel, User ]
  })
  .then(function(webcasts){
    Webcast.findAll({
      where: { webcastDate: {$lte: new Date()} }
    })
    .then(function(pastWebcasts){
      Channel.findAll()
      .then(function(channels){
        User.findAll({
          where: {role: "Producer"}
        })
        .then(function(producers){
          User.findAll({
            where: {role: "Developer"}
          })
          .then(function(developers){
            res.render('webcast/dashboard',
            { title: 'Webcast Dashbaord',
              webcasts: webcasts,
              channels: channels,
              pastWebcasts:pastWebcasts,
              producers:producers,
              developers:developers
            });
          });
        });
      });
    });
  });
});

router.get("/detail/:webcast_id", function(req,res){
  console.log('======\nReqBody\n',req.body);
  Webcast.findOne({
    where: {id: req.params.webcast_id},
    include: [ Channel,User ]
  })
  .then(function(webcast){
    User.findOne({ where: {id: webcast.devId} })
    .then(function(dev){
      console.log('======\nReqBody\n',webcast);
      res.render('webcast/detail', { title: webcast.title, webcast: webcast, dev:dev });
    });
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

router.get("/update/:webcast_id", function(req, res){
  Webcast.findOne({ where: {id: req.params.webcast_id} })
  .then(function(webcast){
    Channel.findAll()
    .then(function(channels){
      User.findAll({ where: { role: "Producer" } })
      .then(function(producers){
        User.findAll({ where: { role: "Developer" } })
        .then(function(developers){
          res.render('webcast/update',
          { title: "Update " + webcast.title,
            webcast: webcast,
            channels: channels,
            producers: producers,
            developers: developers });
        });
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
