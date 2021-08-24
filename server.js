'use strict';
require('dotenv').config();

const 
    express = require('express'),
    app = express(),
    cors = require('cors'),
    mongoose = require('mongoose')

app.use(cors());

const books = require("./modules/Books.js");
const booksRouter = require('./modules/booksRouter.js')

const seedBooksData = require('./seeds/BooksSeed');

// one way
// app.get('/api/books/', books.getAllUsers);

// another way
// routs
app.use('/api/books/', booksRouter);





const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`listening on PORT: ${PORT}`);
    mongoose.connect('mongodb://localhost:27017/bookapprazan', {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    console.log("connected to db")
    });
})