var express = require('express'),
  router = express.Router()
  Webcast = require('../../models').Webcast;

router.get("/", function(req, res){
    res.redirect('/dashboard');
});

router.get("/dashboard", function(req,res){
  console.log(req.session);
  Webcast.findAll({
    //include: [ User ]
  })
  .then(function(webcasts){
    console.log(webcasts);
    res.render('webcast/dashboard', { title: "Webcast Dashbaord", webcasts: webcasts });
  });
});

router.get("/new", function(req, res){
  res.render('webcast/new');
});

router.post("/new", function(req, res){
  console.log('REQUEST BODY\n', req.body);
  Webcast.create(
    req.body
  ).then(function(){
    res.redirect('webcast/dashboard');
  })
});

module.exports = router;
