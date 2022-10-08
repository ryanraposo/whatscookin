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

    const users = await User.create([
        {
            username: 'test1',
            email: 'test1@test.com',
            password: 'test111'
        }
    ]);

    console.log('User seeded');

    await Post.deleteMany();

    const post = await Post.create({
            postTitle: 'Fried eggs',
            postText: 
            `<h1>Lorem Ipsum</h1><p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
            </p><p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAACoFBMVEUAAAAGAP8GAf8HAv8IA/8JBP8KBf8LBv8MB/8NCP8OCf8PCv8QC/8RDP8SDf8TDv8UD/8VEP8WEf8XEv8YE/8ZFP8aFf8bFv8cF/8dGP8eGf8fGv8gG/8hHP8iHf8jHv8kH/8lIP8mIf8nIv8oI/8pJP8qJf8rJv8sJ/8tKP8uKf8vKv8vK/8wLP8xLf8yLv8zL/80MP81Mf83M/84NP85Nf86Nv87N/88OP89Of8+Ov8/O/9APP9BPf9CPv9DP/
            9EQP9FQf9GQv9HQ/9JRf9KRv9LR/9NSf9OSv9PS/9QTP9RTf9STv9TT/9UUP9VUf9WUv9XU/9YVP9ZVf9ZVv9aV/9bWP9cWf9dWv9eW/9gXf9hXv9iX/9kYf9lY
            v9mY/9nZP9pZv9qZ/9raP9saf9tav9ua/9vbP9wbf9xbv9yb/9zcP90cf91cv92c/93dP95dv96d/97eP98ef99ev9+e/9/fP+CgP+Dgf+Egv+Fg/+Gh
            P+Hhf+Ihv+Jh/+Miv+Pjf+Qjv+Rj/+Ukv+Vk/+WlP+Xlf+Ylv+Zl/+amP+bmf+cmv+dm/+fnf+ioP+jof+kov+lo/+mpP+pp/+qqP+rqf+sqv+sq/+t
            rP+urf+vrv+wr/+zsv+0s/+1tP+3tv+4t/+5uP+6uf+7uv+8u/+9vP++vf+/vv/Av//Cwf/Ew//FxP/Gxf/Hxv/Ix//JyP/Kyf/Lyv/My//NzP/Ozf/
            Pzv/Qz//R0P/U0//V1P/X1//Y2P/Z2f/a2v/b2//c3P/d3f/e3v/f3//g4P/h4f/i4v/j4//k5P/l5f/m5v/n5//q6v/r6//s7P/t7f/u7v/v7//w8P/x
            8f/y8v/z8//09P/19f/29v/39//5+f/6+v/7+//8/P/9/f/+/v////+RzUsgAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1AgMFiMWbQsdEgAAAB10RVh0Q
            29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAGfUlEQVR42u2b+X8TVRTFOUnaNF2gAkLVVopSoFDAStnLphQBF5CqyKIoYAUVEBERRWoVEFkUQQTFD
            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"></p><p><br></p><p><br></p>`,
            categories: [categories[0]._id],
            username: users[0].username 
    });
    
    await User.findByIdAndUpdate(
        { _id: users[0]._id},
        { $push: { posts: post._id }},
        { new: true }
    );

    console.log('Post seeded');

    process.exit();
})