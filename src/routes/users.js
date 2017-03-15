let express = require('express');
let router = express.Router();
let User = require('../models/user');
let jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
let hash = require('password-hash');
let userconfig = require('../config'); // get our config file

router.use(function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.route('/users')
.get(function(req, res, next){
  User.find(function(err, users){
    if(err){
      return next(err);
    } else {
      res.json(users);
    }
  });
});
router.route('/users:id')
  .delete(function(req, res, next){//This deletes the user
    User.remove({_id: req.params.id}, function(err, user){
      if(err){
        return next(err);
      } else {
        res.json({title: 'user was successfully deleted!'});
      }
    });
  })
  .put(function(req, res, next){ //This is the admin toggle
    User.find({_id: req.params.id}, function(err, users){
      if(err){
        return next(err);
      } else {
        let user = users[0];
        user.isadmin = !user.isadmin;
        user.save(function(err, gif, next){
          if(err){
            return next(err);
          } else {
            res.json(user);
          }
        });
      }
    });
  });


module.exports = router;
