const { User, Post, } = require('../models')


const resolvers = {
    Query: {
        getPosts: async () =>{
            return await Post.find({})
        }
    }
};


module.exports = resolvers;