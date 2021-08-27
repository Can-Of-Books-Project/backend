const [User, Book] = require('../models/User')

const helperFunctions = {}

helperFunctions.createAuthor = async (name, email) => {

    const author = new User({ name, email });
    await author.save( async error => {
        if (error) return console.log('XXXXXXX error createAuthor XXXXXXX', error)
    });
    return author
}

helperFunctions.createBook = async (title, description, status, img, authInfo) => {

    const book = new Book({ title, description, status, img, authInfo })
    await book.save(async error => {
        if (error) return console.log('XXXXXXX error createBook XXXXXXX', error)
    });
    return book
}

module.exports = helperFunctions