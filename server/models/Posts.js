const { Schema, model } = require('mongoose');

const dateFormat = require('../utils/dateFormat');

const postsSchema = new Schema(
  {
    postTitle:{
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
    categories: {
        type: String,
        required: true
    },
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



const Posts = model('Posts', postsSchema);

module.exports = Posts;