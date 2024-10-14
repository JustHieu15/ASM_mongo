const mongoose = require('mongoose');
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        enum: ['hoạt động', 'đã xóa'],
        default: 'hoạt động'
    }
});

module.exports = mongoose.model('Category', categorySchema);
