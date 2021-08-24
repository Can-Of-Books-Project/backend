const User = require('../models/User');

function seedBooksData() {
    const fadi = new User({
        userName: 'Fadi',
        userEmail : 'fadi@gmail.com',
        books:[
            {
                title: "Learning python",
                description: "a great books for mastering python language",
                status:'RECOMMENDED TO ME',
                img: 'https://images-na.ssl-images-amazon.com/images/I/41nRJEUxePS._SX379_BO1,204,203,200_.jpg'
            },
            {
                title: "Python for data anaylsis",
                description: "a great books for mastering data analysis",
                status:'RECOMMENDED TO ME',
                img: 'https://www.oreilly.com/library/view/python-for-data/9781449323592/orm_front_cover.jpg'
            },
        ]
    });

    const lina = new User({
        userName: 'Lina',
        userEmail : 'lina@gmail.com',
        books:[
            {
                title: "Modern comfort food",
                description: "a great books for mastering data cooks",
                status:'LIFE-CHANGING',
                img: 'https://food.fnr.sndimg.com/content/dam/images/food/products/2020/11/25/rx_modern-comfort-food-a-barefoot-contessa-cookbook.jpeg.rend.hgtvcom.616.822.suffix/1606320175160.jpeg'
            },
        ]
    });
};

module.exports = seedBooksData