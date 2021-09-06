
// No need for req and res parameters if you wont use it
const myLogger = function (req, res, next) {
    if (!req.query.length) {
        next("Access Denied")
    }else{
        
        console.log('LOGGED')
        next()
    }
}

module.exports = myLogger;
