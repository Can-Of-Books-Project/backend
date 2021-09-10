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

helperFunctions.haveSameData = function (obj1, obj2) {
    const obj1Length = Object.keys(obj1).length;
    const obj2Length = Object.keys(obj2).length;

    if (obj1Length === obj2Length) {
        return Object.keys(obj1).every(
            key => obj2.hasOwnProperty(key)
                && obj2[key] === obj1[key]);
    }
    return false;
}



module.exports = helperFunctions