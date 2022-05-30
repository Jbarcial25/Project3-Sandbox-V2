const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: Date
});


const User = model('User', userSchema);

module.exports = User;