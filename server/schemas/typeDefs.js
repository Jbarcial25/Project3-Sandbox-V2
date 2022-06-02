const { gql } = require('apollo-server-express');


const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        posts: [Post]!
    }

    type Post {
        _id: ID
        postText: String
        postAuthor: String
        createdAt: String
        comments: [Comment]!
        likes: [Like]
        likeCount: Int!
    }

    type Comment {
        _id: ID
        commentText: String
        commentAuthor: String
        createdAt: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Like {
        _id: ID!
        username: User
        createAt: String
    }

    type Query {
        users: [User]
        user(username: String!): User
        posts(username: String): [Post]
        post(postId: ID!): Post
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addPost(postText: String!): Post
        removePost(postId: ID!): Post
        likePost(postId: ID!): Post
    }
`;

module.exports = typeDefs;