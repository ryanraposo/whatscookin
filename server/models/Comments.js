const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Comment model: body (text content), username (author), and date to identify when comment was made. 
const commentsSchema = new Schema(
  {
    commentsBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = commentsSchema;