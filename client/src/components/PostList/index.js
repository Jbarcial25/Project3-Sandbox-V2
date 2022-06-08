import { Avatar, AvatarGroup, Box, FormControl, FormLabel, Input, InputGroup, InputRightElement, InputRightAddon, IconButton, Text, Tag, TagLabel, Divider } from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';

import React from 'react';
import { useMutation } from '@apollo/client';
import { Link as RouteLink } from 'react-router-dom';

import { REMOVE_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';


const PostList = ({
    posts,
    showUsername = true,
}) => {

    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark';
    const textcolor = useColorModeValue('yellow.900', '#E8DFD8');
    const bgcolor = useColorModeValue('RGBA(0, 0, 0, 0.16)', 'RGBA(0, 0, 0, 0.36)');
    
    const refresh = function () {
        document.location.reload()
    }

    console.log(QUERY_ME)
    const [removePost, { error }] = useMutation(REMOVE_POST, {
        update(cache, { data: { removePost } }) {
            try {
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: removePost }
                });
            } catch (e) {
                console.error(e);
            }
        },
    })

    const handleRemovePost = async (postId) => {
        try {
            const { data } = await removePost({
                variables: { postId }

            });
        } catch (err) {
            console.error(err);
        }
    };
    if (!posts.length) {
        return <h3>No posts yet!</h3>;
    }

    return (

        <Box m={10}>

            {posts &&
                posts.map((post) => (
                    <FormControl key={post._id} isReadOnly id='comment' p={3} >

                        {/* renders the username */}
                            {showUsername ? (
                                <>
                                    {/* this links to the actual post page */}                                
                                    <RouteLink to={`/post/${post._id}`}>

                                        {/* this is the post author */}
                                        <FormLabel color={textcolor}>
                                            <AvatarGroup>
                                                <Avatar 
                                                    bg='#1D454E'
                                                    color='#E8DFD8'
                                                    boxSize={7}
                                                    name={post.postAuthor}
                                                >
                                                </Avatar>
                                                <Text pl={5} className='indieFlower'>
                                                    {post.postAuthor}
                                                </Text>
                                                <Text ml='auto'>
                                                    {post.createdAt}
                                                </Text>
                                            </AvatarGroup>
                                        </FormLabel>
                                    </RouteLink>
                                    
                                        
                                    <InputGroup
                                        size='md'
                                        boxShadow='lg'
                                    >
                                        <Input h='65px' backgroundColor={bgcolor}
                                            variant='filled'
                                            type='comment'
                                            // posts text
                                            placeholder={post.postText}
                                        />
                                        <InputRightElement mr={5} p='33px'
                                            onClick= {refresh}>
                                            {/* <IconButton
                                                icon={<FaHeart />} 
                                                backgroundColor={isDark ? '#ECE8DF' : '#BFAE98'}
                                                color={isDark ? '#5E4D3B' : '#E8DFD8'} /> */}
                                            <IconButton 
                                                icon={<FaTrashAlt />} 
                                                backgroundColor={isDark ? '#ECE8DF' : '#BFAE98'}
                                                color={isDark ? '#5E4D3B' : '#E8DFD8'}
                                                onClick={() => handleRemovePost(post._id)} />
                                        </InputRightElement>
                                    </InputGroup>


                                    <Divider></Divider>
                                </>

                                ) : (
                                    <>
                                        <Box m={3}>
                                            You have no posts yet
                                        </Box>
                                    </>
                                )}
                                
                                
                    </FormControl>

                ))}

        </Box>

    );
};

export default PostList;