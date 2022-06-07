import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';

import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

console.log(QUERY_ME)

const PostForm = () => {

    //Styles
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark';
    const textcolor = useColorModeValue('yellow.900', '#E8DFD8');
    const bgcolor = useColorModeValue('RGBA(0, 0, 0, 0.16)', 'RGBA(0, 0, 0, 0.36)');
    const color = useColorModeValue('#ECE8DF', '#BFAE98')


    const refresh = function () {
        document.location.reload()
    }

    const [postText, setPostText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addPost, { error }] = useMutation(ADD_POST, {
        update(cache, { data: { addPost } }) {
            try {
                const { posts } = cache.readQuery({ query: QUERY_POSTS });

                cache.writeQuery({
                    query: QUERY_POSTS,
                    data: { posts: [addPost, ...posts] },
                });
            } catch (e) {
                console.error(e);
            }

            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, posts: [...me.posts, addPost] } },
            });
        },
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        console.log('this worked')
        try {
            const { data } = await addPost({
                variables: {
                    postText,
                    postAuthor: Auth.getProfile().data.username,
                },
            });

            setPostText('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'postText' && value.length <= 160) {
            setPostText(value);
            setCharacterCount(value.length);
        }
    };

    return (
        <div>
            <h3>What's on your mind?</h3>

            {Auth.loggedIn() ? (
                <>
                    <p>
                        Character Count: {characterCount} / 160
                    </p>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <textarea
                                name="postText"
                                placeholder="Here's a new thought..."
                                value={postText}
                                style={{ lineHeight: '1.5', resize: 'vertical' }}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div>
                            <button type='submit'
                            onClick={refresh}>
                                click to post
                            </button>
                        </div>
                        {error && (
                            <div>
                                {error.message}
                            </div>
                        )}
                    </form>
                </>
            ) : (
                <p>
                    You need to be logged in to share your Posts. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </div>
    )
};
export default PostForm;