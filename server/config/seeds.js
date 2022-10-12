const db = require('./connection');
const { User, Post, Category } = require('../models');

db.once('open', async () => {
    await Category.deleteMany();

    const categories = await Category.insertMany([
        { name: 'Breakfast' },
        { name: 'Lunch' },
        { name: 'Dinner' },
        { name: 'Dessert' },
        { name: 'Soup' },
    ]);

    console.log('Categories seeded');

    await User.deleteMany();

    const user = await User.create({
        username: 'test1',
        email: 'test1@test.com',
        password: 'test111'
    });

    console.log('User seeded');

    await Post.deleteMany();

    const posts = await Post.insertMany([
        {
            postTitle: 'Fried Eggs',
            postBody: `<h2>Simple Fried Eggs</h2><p><br><img src="https://ourbestbites.com/wp-content/uploads/2015/01/how-to-fry-an-egg-2-copy.jpg.webp"><br></p><ul><li>Get eggs</li><li>Cook eggs</li><li>Eat</li></ul><p>\t</p>`,
            categories: [categories[0]._id],
            username: user.username
        },
        {
            postTitle: 'Coconut',
            postBody: `<h2>Something Else</h2><p><br><img src="https://i5.walmartimages.ca/images/Enlarge/634/387/6000198634387.jpg" width=100><br></p><ul><li>Buy coconut</li><li>Open it</li><li>Eat</li></ul><p>\t</p>`,
            categories: [categories[0]._id],
            username: user.username
        },
        {
            postTitle: 'Buffalo Chicken Wings',
            postBody: `<h2>Buffalo Chicken Wings</h2><p><br><img src="https://www.recipetineats.com/wp-content/uploads/2019/01/Baked-Buffalo-Wings_0.jpg" width=300><br></p><ul><li>Pat dry</li><li>Baking Powder</li><li>bake on low then high</li></ul><p>\t</p>`,
            categories: [categories[1]._id, categories[2]._id],
            username: user.username
        },
        {
            postTitle: 'Roast Beef with Peppers',
            postBody: `<h2>Roast Beef with Peppers</h2><p><br><img src="https://cookingwithcurls.com/wp-content/uploads/2017/07/Instant-Pot-Italian-Beef-has-all-the-flavors-of-the-original-while-being-paleo-and-whole-30-compliant-cookingwithcurls.com_.jpg" width=300><br></p><ul><li>In a Dutch oven, brown roast on all sides in oil over medium-high heat; drain. Combine the water, bouillon, oregano, garlic, salt and pepper; pour over roast.</li><li>Cover and bake at 350° for 3 hours or until meat is tender. Remove roast to a warm serving platter. Let stand 10 minutes before slicing.</li><li>Meanwhile, in a large skillet, saute peppers in butter until tender. Serve peppers and pan juices with the roast. If desired, garnish with fresh oregano sprigs.</li></ul><p>\t</p>`,
            categories: [categories[1]._id, categories[2]._id],
            username: user.username
        }
    ]);

    await User.findByIdAndUpdate(
        { _id: user._id },
        { $push: { posts: [posts[0]._id, posts[1]._id, posts[2]._id, posts[3]._id] } },
        { new: true }
    );

    console.log('Post seeded');

    await Post.findByIdAndUpdate(
        { _id: posts[0]._id },
        {
            $push: {
                comments: {
                    commentBody: "Great recipe!",
                    username: user.username
                }
            }
        },
        { new: true }
    );

    console.log('Comment seeded')

    process.exit();
})