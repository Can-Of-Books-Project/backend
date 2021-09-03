const [User, Book] = require('../models/User')

const helperFunctions = {}

helperFunctions.createAuthor = async (name, email) => {

    const author = new User({ name, email });
    await author.save( async error => {
        if (error) return false
    });
    return author
}

helperFunctions.createBook = async (title, description, status, img, authInfo) => {

    const book = new Book({ title, description, status, img, authInfo })
    await book.save(async error => {
        if (error) return false
    });
    return book
}

helperFunctions.userExist = async (email) => {
    return await User.find({email:email}, (error, result) => {
        if (error) {
            console.log(error);
        }
        return result
    })
}



module.exports = helperFunctions