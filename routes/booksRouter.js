'use strict';
const express = require('express');
const app = express()
const router = express.Router();
const logger = require('../middleware/loggerMiddleware')




const {createAuthor, createBook, userExist} = require('../heplerFunctions/helperFunctions')
const [User, Book] = require('../models/User');

// middlewear for a spacific rout
router.get('/all',logger, async (request, response) => {
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


router.post('/booksByEmail', async (request, response, next) => {
    let userEmail = request.body.authorEmail;
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
                // 204 No Content
                response.status(204).send(true)
            }
            let data = result.filter(user => user.authInfo.email == userEmail)
            response.status(200).send(data);

        })
})

router.get('/bookByTitle', async (request, response, next) => {
    let { title } = request.body;
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
    if (!img) {
        img = 'https://pngimg.com/uploads/book/book_PNG2114.png'
    }
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


router.post('/delete/:id', async (request, response, next) => {
    const { id } = request.params;
    await Book
        .deleteOne({ _id: id }, (error, result) => {
            if (error) {
                console.log(error);
                // 400 Bad Request
                response.status(400).send(false)
            };
            if ( (result.deletedCount == 0) && result.ok == 1) {
                // 204 No Content
                response.status(204).send(true)
            }
            if (result.deletedCount == 1) {
                response.status(200).send(true);
            }
        })
})

router.post('/addUser', async (request, response, next) => {
    let { name, email } = request.body
    userExist(email).then(result => {
        if (!result.length) {
            createAuthor(name, email).then( (result) => {
                if (!result) response.status(400).send(false)
                response.status(200).send(true);
            })
        }
        else {
            // 208 Already Reported (WebDAV)
            response.status(208).send(true);
        }
    })

    
    
    // let { name, email } = request.body
    // let newUser = await new User({ name, email })
    // newUser.save(err => response.status(400).send(false))
    // response.status(200).send(true);
})


router.post('/addBook', async (request, response, next) => {

    let { title, description, status, img, email } = request.body
    let authInfo = await User.find({ email }, (error, result) => {
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
    if (!img) {
        img = 'https://pngimg.com/uploads/book/book_PNG2114.png'
    }
    let body = { title, description, status, img, authInfo }
    const newBook = await new Book
        ( body, (error, result) => {
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
