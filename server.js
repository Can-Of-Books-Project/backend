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
    response.status(200).send("Ok")
})


const seedUsers = require('./seeds/seedUsers');
// seedUsers()

// way 1
// CRUD application
// const books = require("./modules/Books.js");
// app.get('/books', Book.list);
// app.post('/books', Book.add);
// app.delete('/books/:id', Book.delete);
// app.put('/books/:id', Book.update);


// way 2. web app (API)
const booksRouter = require('./routes/booksRouter.js')

// middlewear for the wholl app
const logger = require('./middlewear/loggerMiddlewear')
app.use(logger);

app.use('/api', booksRouter);





const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
app.listen(PORT, () => {
    console.log(`listening on PORT: ${PORT}`);
    mongoose.connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    console.log("connected to db")
    });
})