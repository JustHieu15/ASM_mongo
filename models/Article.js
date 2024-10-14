const mongoose = require('mongoose');
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    slug: {
        type: String,
        unique: true
    },
    originalLink: {
        type: String,
        default: ''
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['duyet', 'chua_duyet', 'da_xoa'],
        default: 'chua_duyet'
    }
});

module.exports = mongoose.model('Article', articleSchema);
