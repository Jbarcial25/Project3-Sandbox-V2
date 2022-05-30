const { Schema, model } = require('mongoose')


const postSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    createdAt: {
        type: Date
    },
    comments: [
        {
            body: String,
            username: String,
            createdAt: String,
        }
    ],
    likes: [
        {
            username: String,
        },
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
});

const Post = model('Post', postSchema)

module.exports = Post