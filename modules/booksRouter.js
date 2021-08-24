'use strict';
var express = require('express');
var router = express.Router();


const User = require('../models/User');

console.log("booksRouter")
router.get('all/', (request, response, next) => {
    // response.status(200)
    response.send("ok")
});


module.exports = router