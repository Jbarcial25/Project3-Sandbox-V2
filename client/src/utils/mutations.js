import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password){
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_POST = gql`
    mutation addPost($postText: String!) {
        addPost(postText: $postText){
            _id
            postText
            postAuthor
            createdAt
                comments {
                    _id
                    commentText
                }
        }
    }
`;

export const CREATE_COMMENT = gql`
    mutation createComment($postId: ID!, $commentText: String!, $commentAuthor: String!) {
        createComment(postId: $postId, commentText: $commentText, commentAuthor: $commentAuthor) {
            _id
            postText
            postAuthor
            createdAt
            comments {
                _id
                commentText
                createdAt
            }
        }
    }
`;

export const REMOVE_POST = gql`
    mutation removePost($postId: ID!) {
        removePost(postId: $postId) {
            _id
            postText
            postAuthor
        }
    }
`

export const REMOVE_COMMENT = gql`
    mutation removeComment($postId: ID!, $commentId: ID!) {
        removeComment(postId: $postId, commentId: $commentId) {
            _id
            postText
            postAuthor
            comments {
                    _id
                    commentText
            }
        }
    }
`