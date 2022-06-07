import React from 'react';
import { Avatar, AvatarGroup, Box, FormControl, FormLabel, FormHelperText, Input, InputGroup, InputRightElement, InputRightAddon, IconButton, Text } from '@chakra-ui/react';
import { FaSun, FaMoon, FaGithub, FaUser, FaPaperPlane, FaHeart, FaTrashAlt } from 'react-icons/fa';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { Link as RouteLink } from 'react-router-dom';

const ProfileList = ({ user, posts, showUsername = true }) => {

    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark';
    const textcolor = useColorModeValue('yellow.900', '#E8DFD8');
    const bgcolor = useColorModeValue('RGBA(0, 0, 0, 0.16)', 'RGBA(0, 0, 0, 0.36)');

    if (!posts.length) {
        return (
            <Text 
            className='indie'
            fontWeight='bold'
            p='20px'
            fontSize='xl'
            color={textcolor}
            textAlign='center'
                > 
                   Hello No Posts Yet!
            </Text>
        )
    }

    return (
        
        <Box m={3}>

            {posts &&
                posts.map((post) => (
                   
                    <FormControl id='comment' key={post._id} isReadOnly p={3}>
                        {showUsername ? (
                            <>
                                <FormLabel color={textcolor}>
                                    <AvatarGroup>
                                        <Avatar 
                                            bg='#1D454E'
                                            boxSize={7}
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

                                <InputGroup
                                    size='md'
                                    boxShadow='lg'
                                >
                                    <Input h='65px' backgroundColor='RGBA(0, 0, 0, 0.16)'
                                        variant='filled'
                                        type='comment'
                                        placeholder={post.postText}
                                    />
                                    <InputRightElement mr={5} p='33px'>
                                        <IconButton
                                            icon={<FaHeart />} 
                                            backgroundColor={isDark ? '#ECE8DF' : '#BFAE98'}
                                            color={textcolor} />
                                        <IconButton 
                                            icon={<FaTrashAlt />} 
                                            backgroundColor={isDark ? '#ECE8DF' : '#BFAE98'}
                                            color={textcolor} />
                                    </InputRightElement>
                                </InputGroup>
                            </>
                        ) : (
                            <Text 
                                className='indie'
                                fontWeight='bold'
                                p='20px'
                                fontSize='xl'
                                color={textcolor}
                                textAlign='center'
                            > 
                                You have not created any posts yet!
                            </Text>
                        )}
                          
                    </FormControl>
            ))}
            
        </Box>
    );
};

export default ProfileList;