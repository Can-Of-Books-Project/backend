'use strict';
var express = require('express');
var router = express.Router();

const [User, Book] = require('../models/User');

router.get('/all', async (request, response, next) => {
    // User.find({}, (error, result) => {
    //     if (error) {
    //         // 400 Bad Request
    //         res.status(400).send
    //     }
    //     response.status(200).send(result)
    // })

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
    console.log(title)
    await Book
        .find({ title })
        .populate("authInfo")
        .exec((error, result) => {
            if (error) {
                console.log('400 Bad Request', error);
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

router.post('/update', async (request, response, next) => {
    // const { index } = request.params;
    let { title, description, status, img, index } = request.body
    const book = await Book
        .find({ _id: '6129561331d7f9ff62f4a0ae' }, (error, result) => {

            if (error) {
                console.log('400 Bad Request', error);
                // 400 Bad Request
                response.status(400).send(false)
            };
            if (!result.length) {
                // 204 No Content
                response.status(204).send(false)
            }

            let newData = {
                title, description, status, img,
                ...result,
            }
            result = newData
  
            result.save()
            response.status(200).send(result);
        })

})

module.exports = router