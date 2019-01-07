var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');

let users= fs.readFileSync('file.json')
users = JSON.parse(users)





module.exports = router;
