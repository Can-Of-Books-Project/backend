'use strict';

const mongoose = require('mongoose');

// Schema
const bookSchema = new mongoose.Schema({
    title: {type: String, required:true},
    description: {type: String, required: true},
    status: {type:String, uppercase:true, enum: ['LIFE-CHANGING', 'FAVORITE FIVE', 'RECOMMENDED TO ME']},
    img: {type:String}
});

const userSchema = new mongoose.Schema(({
    userName: {type:String, required:true},
    userEmail: {type:String, required:true},
    books: [bookSchema]
}));

// Collection
const userModel = mongoose.model('user', userSchema);

module.exports = userModel