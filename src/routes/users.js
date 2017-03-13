let express = require('express');
let router = express.Router();
let User = require('../models/user');
let jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
// let userconfig = require('../config'); // get our config file
let hash = require('password-hash');
let userconfig = require('../config'); // get our config file




module.exports = router;
