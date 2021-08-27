'use strict';
require('dotenv').config();

const 
    express = require('express'),
    app = express(),
    cors = require('cors'),
    mongoose = require('mongoose')

app.use(cors());
app.use(express.json());


app.get('', (request, response) => {
    response.send(200).send("Ok")
})

// const books = require("./modules/Books.js");
const booksRouter = require('./routes/booksRouter.js')

const seedUsers = require('./seeds/seedUsers');
// seedUsers()


// CRUD application
// app.get('/books', Book.list);
// app.post('/books', Book.add);
// app.delete('/books/:id', Book.delete);
// app.put('/books/:id', Book.update);


// 2. web app (API)
app.use('/api', booksRouter);





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