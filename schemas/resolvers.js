const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('posts');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('post');
        },
        posts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Post.find(params).sort({ createdAt: -1 });
        },
        post: async (parent, { postId }) => {
            return Post.findOne({ _id: postId });
        },
        me: async (parant, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('posts')
            }
            throw new AuthenticationError('You need to be logged in')
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this address');
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError('No user/email found')
            }

            const token = signToken(user);

            return { token, user };
        },
        addPost: async (parent, { postText }, context) => {
            if (context.user) {
                const post = await Post.create({
                    postText,
                    postAuthor: context.user.username,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { posts: postText._id } }
                );

                return post;
            }
            throw new AuthenticationError('You need to be logged in!')
        },
        removePost: async (parent, { postId }, context) => {
            if (context.user) {
                const post = await Post.findOneAndDelete({
                    _id: postId,
                    postAuthor: context.user.username,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { posts: post._id } }
                );

                return post;
            }

            throw new AuthenticationError('You need to be logged in!')
        },
        likePost: async (parent, { postId }, context) => {
            if (context.user) {
                const post = await Post.findById({
                    _id: postId,
                    postAuthor: context.user.username,
                });

                if (post) {
                    if (post.likes.find((like) => like.username === username)) {

                        post = post.likes.filter((like) => like.username !== username)
                    } else {

                        const user = post.postAuthor

                        post.likes.push({
                            user  
                        });
                    }

                    await post.save();
                    return post;

                } else throw new UserInputError('Post not found')
            }
        },
    }
}


module.exports = resolvers;