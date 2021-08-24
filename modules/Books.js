'use strict';
const Books = {}
const User = require('../models/User');

Books.getAllUsers = (req, res) => {
    res.send("Works")
} 

module.exports = Books