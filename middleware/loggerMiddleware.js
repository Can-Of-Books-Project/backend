
const [User] = require('../models/User');

// No need for req and res parameters if you wont use it
const myLogger = async function (req, res, next) {

    let email = req.body.authorEmail;
    if (!email) {
        next("Only for Authenticated users");
        return
    }

    await User.find({ email }, (error, result) => {
        if (error) {
            console.log(error);
            // status code : 500 (Internal Server Error)
            next("Internal Server Error");
        };

        if (!result.length) {
            next("Access Denied");
        } else {
            console.log('LOGGED');
            next();
        }


    });

}

module.exports = myLogger;
