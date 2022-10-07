const { Schema, model } = require('mongoose');

const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema(
  {
    postTitle: {
      type: String,
      required: true,
    },
    postText: {
      type: String,
      required: 'Your blog post needs text!',
      minlength: 1,
      //maxlength: 280
    },
    image: {
      type: String,
    },
    // The categories will be set in the front end (the names of them)
    categories: [{
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }],
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);



const Post = model('Post', postSchema);

module.exports = Post;