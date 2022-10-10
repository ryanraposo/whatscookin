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
    
    const post = await Post.create({
        postTitle: 'Fried Eggs',
        postBody: `<h2>Simple Fried Eggs</h2><p><br><img src="https://ourbestbites.com/wp-content/uploads/2015/01/how-to-fry-an-egg-2-copy.jpg.webp"><br></p><ul><li>Get eggs</li><li>Cook eggs</li><li>Eat</li></ul><p>\t</p>`,
        categories: [categories[0]._id],
        username: user.username
    });

    await User.findByIdAndUpdate(
        { _id: user._id },
        { $push: { posts: post._id } },
        { new: true }
    );

    console.log('Post seeded');

    await Post.findByIdAndUpdate(
        { _id: post._id },
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