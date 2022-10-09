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
        postTitle: 'Fried eggs',
        postBody: `<h1>Lorem Ipsum</h1><p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p><p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAACoFBMVEUAAAAGAP8GAf8HAv8IA/8JBP8KBf8LBv8MB/8NCP8OCf8PCv8QC/8RDP8SDf8TDv8UD/8VEP8WEf8XEv8YE/8ZFP8aFf8bFv8cF/8dGP8eGf8fGv8gG/8hHP8iHf8jHv8kH/8lIP8mIf8nIv8oI/8pJP8qJf8rJv8sJ/8tKP8uKf8vKv8vK/8wLP8xLf8yLv8zL/80MP81Mf83M/84NP85Nf86Nv87N/88OP89Of8+Ov8/O/9APP9BPf9CPv9DP/9EQP9FQf9GQv9HQ/9JRf9KRv9LR/9NSf9`,
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