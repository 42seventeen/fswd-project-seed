var express = require('express'),
  router = express.Router()
  Webcast = require('../../models').Webcast;
  User = require('../../models').User;
  Channel = require('../../models').Channel;

router.get('/', function(req,res){
  Webcast.scope('scheduled').findAll({order: '"webcastDate" ASC'})
  .then(function(webcasts){
    Webcast.scope('past').findAll()
    .then(function(pastWebcasts){
      Channel.findAll()
      .then(function(channels){
        User.scope('producers').findAll()
        .then(function(producers){
          User.scope('devs').findAll()
          .then(function(developers){
            res.render('webcast/index',
            { title: 'Webcasts',
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

router.get('/dashboard', function(req,res){
  Webcast.scope('scheduled','datesASC').findAll({
    include: [ Channel, User ]
  })
  .then(function(webcasts){
    Webcast.scope('past','datesDESC').findAll()
    .then(function(pastWebcasts){
      Channel.findAll()
      .then(function(channels){
        User.scope('producers','alphabetize').findAll()
        .then(function(producers){
            User.scope('devs','alphabetize').findAll()
          .then(function(developers){
            console.log('======\n',producers,'\n======\n');
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

router.get('/detail/:webcast_id', function(req,res){
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

router.get('/new', function(req, res){
  Channel.findAll()
  .then(function(channels){
    User.findAll({ where: { role: 'Producer' } })
    .then(function(producers){
      User.findAll({ where: { role: 'Developer' } })
      .then(function(developers){
        res.render('webcast/new', { title: 'Webcast Detail', channels: channels, producers: producers, developers: developers });
      });
    });
  });
});

router.get('/update/:webcast_id', function(req, res){
  Webcast.findOne({ where: {id: req.params.webcast_id} })
  .then(function(webcast){
    Channel.findAll()
    .then(function(channels){
      User.findAll({ where: { role: 'Producer' } })
      .then(function(producers){
        User.findAll({ where: { role: 'Developer' } })
        .then(function(developers){
          res.render('webcast/update',
          { title: 'Update ' + webcast.title,
            webcast: webcast,
            channels: channels,
            producers: producers,
            developers: developers });
        });
      });
    });
  });
});



router.post('/update/:webcast_id', function(req, res){
  Webcast.findOne({ where: {id: req.params.webcast_id} })
  .then(function(webcast){
    webcast.title = req.body.title;
    webcast.webcastDate = req.body.webcastDate;
    webcast.venue = req.body.venue;
    webcast.clientName = req.body.clientName;
    webcast.clientEmail = req.body.clientEmail;
    webcast.ChannelId = req.body.ChannelId;
    webcast.UserId = req.body.UserId;
    webcast.devId = req.body.devId;
    return webcast.save()
    .then(function(webcast){
      res.redirect('/webcast/detail/' + webcast.id);
    });
  });
});

router.post('/new', function(req, res){
  console.log('REQUEST BODY\n', req.body);
  Webcast.create(
    req.body
  ).then(function(){
    res.redirect('/');
  })
});

module.exports = router;
