'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  Schemas
const bookSchema = new Schema({
    title: {type: String, required:true},
    description: {type: String, required: true},
    status: {type:String, uppercase:true, enum: ['LIFE-CHANGING', 'FAVORITE FIVE', 'RECOMMENDED TO ME']},
    img: {type:String},
    authInfo: { type:Schema.Types.ObjectId, ref:'user' }
});

const userSchema = new Schema(({
    name: {type:String, required:true},
    email: {type:String, required:true},
    // books: [{ type:Schema.Types.ObjectId, ref:'book' }]
}));

// Collection
const UserModel = mongoose.model('user', userSchema);
const BookModel = mongoose.model('book', bookSchema);

module.exports = [ UserModel, BookModel ]

/////--------------------------------------------------------------------------------/////
// old works - nested Shcema
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Schema
// const bookSchema = new Schema({
//     title: {type: String, required:true},
//     description: {type: String, required: true},
//     status: {type:String, uppercase:true, enum: ['LIFE-CHANGING', 'FAVORITE FIVE', 'RECOMMENDED TO ME']},
//     img: {type:String}
// });

// const userSchema = new Schema(({
//     userName: {type:String, required:true},
//     userEmail: {type:String, required:true},
//     books: [bookSchema],

// }));

// // Collection
// const userModel = mongoose.model('user', userSchema);

// module.exports = userModel
