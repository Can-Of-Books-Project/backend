require('dotenv').config();
const { decryptWithAES } = require('../heplerFunctions/crypto')

// No need for req and res parameters if you wont use it
const myLogger = async function (req, res, next) {
    let { key } = req.body;
    
    if (key === undefined) {
        next("Access Denied")
        return
    }
    
    
    let decrypt_key = decryptWithAES(key)
    console.log('decrypt_key', decrypt_key)

    let SECRET_KEY = process.env.SECRET_KEY
    if(SECRET_KEY === decrypt_key) {
        next()
        return
    } else {
        next("Access Denied")
        return
    }

}

module.exports = myLogger;
