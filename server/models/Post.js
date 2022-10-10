const { Schema, model } = require('mongoose');
const commentsSchema = require('./Comments');
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
    },
    comments: [commentsSchema] 
  },
  {
    toJSON: {
      getters: true
    }
  }
);

// returns the length of the comments array that is found for a post
postSchema.virtual('commentsSchema').get(function() {
  return this.comments.length;
});

const Post = model('Post', postSchema);

module.exports = Post;