const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    author: String,
    authorUID: String,
    album: { type: [String], default: [] },
    location: { type: String, default: "" },
    content: { type: String, default: "" },
    tags: { type: [String], default: [] },
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    date: { type: Date, default: new Date() },
});

module.exports = Post = mongoose.model('Posts', postSchema);