// utiles
const [User, Book] = require('../models/User')
const helperFunctions = require('../heplerFunctions/helperFunctions')

async function seedUsers() {

    const fadi = await helperFunctions.createAuthor('fadi', 'fadi@gmail.com');
    const lina = await helperFunctions.createAuthor('lina', 'lina@gmail.com');

    const fadiBook1 = await helperFunctions.createBook(
        title = "Learning python",
        description = "a great books for mastering python language",
        status = 'RECOMMENDED TO ME',
        img = 'https://images-na.ssl-images-amazon.com/images/I/41nRJEUxePS._SX379_BO1,204,203,200_.jpg',
        authInfo = fadi._id
    );

    const fadiBook2 = await helperFunctions.createBook(
        title = "Python for data anaylsis",
        description = "a great books for mastering data analysis",
        status = 'RECOMMENDED TO ME',
        img = 'https://www.oreilly.com/library/view/python-for-data/9781449323592/orm_front_cover.jpg',
        authInfo = fadi._id
    );

    const linaBook1 = await helperFunctions.createBook(
        title = "Modern comfort food",
        description = "a great books to learn modern cooks",
        status = 'LIFE-CHANGING',
        img = 'https://food.fnr.sndimg.com/content/dam/images/food/products/2020/11/25/rx_modern-comfort-food-a-barefoot-contessa-cookbook.jpeg.rend.hgtvcom.616.822.suffix/1606320175160.jpeg',
        authInfo = lina._id
    );
}

module.exports = seedUsers

// let fadiData = await User.
//     find({ name: 'fadi' })
// // .populate("books")
// // .exec((error, user) => {
// //     if (error) return console.log(error)
// //     id = user[0]._id
// //     return id
// //     // console.log('await User %s', user[0]._id)
// // })
// console.log(fadiData)


// books = await Book.
//     find({})
//     .populate("authInfo")
// // .exec((error, user) => {
// //     if (error) return console.log(error)
// //     console.log('await Book. %s', user);
// // })


// let data = books.filter(user => user.authInfo.name == 'fadi')

// console.log(data)


// // nested schema
// const User = require('../models/User');
// function seedUsers() {
//     const fadi = new User({
//         userName: 'Fadi',
//         userEmail : 'fadi@gmail.com',
//         books:[
//             {
//                 title: "Learning python",
//                 description: "a great books for mastering python language",
//                 status:'RECOMMENDED TO ME',
//                 img: 'https://images-na.ssl-images-amazon.com/images/I/41nRJEUxePS._SX379_BO1,204,203,200_.jpg'
//             },
//             {
//                 title: "Python for data anaylsis",
//                 description: "a great books for mastering data analysis",
//                 status:'RECOMMENDED TO ME',
//                 img: 'https://www.oreilly.com/library/view/python-for-data/9781449323592/orm_front_cover.jpg'
//             },
//         ]
//     });

//     const lina = new User({
//         userName: 'Lina',
//         userEmail : 'lina@gmail.com',
//         books:[
//             {
//                 title: "Modern comfort food",
//                 description: "a great books for mastering data cooks",
//                 status:'LIFE-CHANGING',
//                 img: 'https://food.fnr.sndimg.com/content/dam/images/food/products/2020/11/25/rx_modern-comfort-food-a-barefoot-contessa-cookbook.jpeg.rend.hgtvcom.616.822.suffix/1606320175160.jpeg'
//             },
//         ]
//     });

//     fadi.save()
//     lina.save()
// };

// module.exports = seedUsers