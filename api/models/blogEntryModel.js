'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BlogEntrySchema = new Schema({
    content: {
        type: String,
        required: 'please enter the post body'
    },
    title: {
        type: String,
        required: 'please enter the post title'
    },
    author: {
        type: String,
        required: 'author name required'
    },
    preview: {
        type: String,
        default: ''
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    file: {
        type: [String],
        default: []
    },
    status: {
        type: [{
          type: String,
          enum: ['pending', 'active', 'archived']
        }],
        default: ['pending']
    }
});

module.exports = mongoose.model('BlogEntries', BlogEntrySchema);
