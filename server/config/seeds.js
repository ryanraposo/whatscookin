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
        password: 'test123'
    });

    console.log('User seeded');

    await Post.deleteMany();

    const post = await Post.create({

        postTitle: 'Fried eggs',
        postText: `&lt;p&gt;1 tablespoon oil&lt;br&gt;1/2 cup chopped tomatoes&lt;br&gt;Finely minced hot pepper, to taste&lt;br&gt;Salt to taste&lt;br&gt;2 scallions, white &amp;amp; green parts, sliced wafer thin&lt;br&gt;2 large eggs, room temperature, lightly beaten&amp;nbsp;&lt;/p&gt;
            &lt;p style=&quot;text-align:start;&quot;&gt;1. Add oil to pan and place over medium heat until the oil is hot. Toss in tomatoes and hot pepper along with salt to taste, stir to mix then reduce heat to low and cook until the tomatoes are soft.&lt;/p&gt;
            &lt;p style=&quot;text-align:start;&quot;&gt;2. Mix scallions with eggs and then add to pan with tomatoes; raise the heat just a little and cook, gently scrambling the eggs with the tomato mixture. Cook until the eggs are cooked through with big tender pieces of egg.&amp;nbsp;&lt;/p&gt;`,
        categories: [categories[0]._id],
        author: user._id
    });

    await User.findByIdAndUpdate(
        { _id: user._id },
        { $push: { posts: post._id } },
        { new: true }
    );

    console.log('Post seeded');

    process.exit();
})