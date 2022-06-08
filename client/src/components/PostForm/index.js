import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { Input, InputGroup, InputRightElement, IconButton, } from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';

import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

console.log(QUERY_ME)

const PostForm = () => {

    //Styles
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark';


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
            console.log('hello?');

            setPostText('');
        } catch (err) {
            console.log(err);
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
        <>
            {Auth.loggedIn() ? (
                <form className='form' id='post' onSubmit={handleFormSubmit}>
                    <InputGroup
                            size='lg'
                            boxShadow='lg'
                        >
                            <Input h='100px'
                               name="postText"
                               value={postText}
                               backgroundColor='RGBA(0, 0, 0, 0.16)'
                               variant='filled'
                               placeholder='Type something here... '
                               onChange={handleChange}
                            />
                            <InputRightElement mr={5} p='50px'>
                                <IconButton icon={<FaPaperPlane />}
                                    type='submit'
                                    onClick={refresh}
                                    size='lg'
                                    backgroundColor={isDark ? '#ECE8DF' : '#BFAE98'}
                                    color={isDark ? '#5E4D3B' : '#E8DFD8'} 
                                />
                            </InputRightElement>
                        </InputGroup>
                </form>

            ) : (
                <p>
                    You need to be logged in to share your Posts. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}

        </>
    );
};
export default PostForm;