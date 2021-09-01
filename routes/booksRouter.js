'use strict';
var express = require('express');
var router = express.Router();

const [User, Book] = require('../models/User');

router.get('/all', async (request, response, next) => {
    await Book
        .find()
        .populate("authInfo")
        .exec((error, result) => {
            if (error) {
                console.log(error)
                response.status(400).send(false)
            }
            response.status(200).send(result)
        })
});

router.get('/allAuthers', async (request, response, next) => {
    await User.find({}, (error, result) => {
        if (error) {
            console.log(error);
            response.status(400).send(false)
        }
        response.status(200).send(result)
    })
});


router.get('/booksByAuthor', async (request, response, next) => {
    let userName = request.query.author;
    await Book
        .find()
        .populate({
            path: 'authInfo',
            // match: {name: userName}
            // match: {name: { $in :userName}}
        })
        .exec((error, result) => {
            if (error) {
                console.log(error);
                // 400 Bad Request
                response.status(400).send(false)
            };
            if (!result.length) {
                // 401 Unauthorized
                response.status(401).send(false)
            }
            let data = result.filter(user => user.authInfo.name == userName)
            response.status(200).send(data);

        })
})

router.get('/bookByTitle', async (request, response, next) => {
    let { title } = request.query;
    await Book
        .find({ title })
        .populate("authInfo")
        .exec((error, result) => {
            if (error) {
                console.log(error);
                // 400 Bad Request
                response.status(400).send(false)
            };
            if (!result.length) {
                // 204 No Content
                response.status(204).send(false)
            }
            response.status(200).send(result);

        })
})

router.post('/update/:id', async (request, response, next) => {

    const { id } = request.params;
    let { title, description, status, img } = request.body
    const book = await Book
        .findByIdAndUpdate(id, { title, description, status, img }, (error, result) => {
            if (error) {
                console.log(error);
                // 400 Bad Request
                response.send(false)
            };
            if (!result) {
                // 204 No Content
                response.send(false)
            }
        })
    response.send(book);
})

router.delete('/delete/:id', async (request, response, next) => {
    const { id } = request.params;
    await Book
        .deleteOne({ _id: id }, (error, result) => {
            if (error) {
                console.log(error);
                // 400 Bad Request
                response.status(400).send(false)
            };
            if (!result.deletedCount && result.ok) {
                // 204 No Content
                response.status(204).send(true)
            }
            if (result.deletedCount) {
                response.status(200).send(true);
            }
        })
})

router.post('/delete/:id', async (request, response, next) => {
    const { id } = request.params;
    await Book
        .deleteOne({ _id: id }, (error, result) => {
            if (error) {
                console.log(error);
                // 400 Bad Request
                response.status(400).send(false)
            };
            if (!result.deletedCount && result.ok) {
                // 204 No Content
                response.status(204).send(true)
            }
            if (result.deletedCount) {
                response.status(200).send(true);
            }
        })
})

router.post('/addUser', async (request, response, next) => {
    let { name, email } = request.body
    let newUser = await new User({ name, email })
    newUser.save(err => response.status(400).send(false))
    response.status(200).send(true);
})


router.post('/addBook', async (request, response, next) => {

    let { title, description, status, img, name } = request.body
    let authInfo = await User.find({ name }, (error, result) => {
        if (error) {
            console.log(error);
            response.status(400).send(false);
        }
        // if (!result.length) { // if returned empty array => no user matched 
        //     response.status(404).send(false);
        // }

        // return authInfo[0]._id
        return result
    })
    authInfo = authInfo[0]._id
    let data = { title, description, status, img, authInfo }
    const newBook = await new Book
        (data, (error, result) => {
            if (error) {
                console.log(error);
                // 400 Bad Request
                response.status(400).send(false)
            }
            return result
        })
    newBook.save()
    response.status(200).send(true);
})

module.exports = router
