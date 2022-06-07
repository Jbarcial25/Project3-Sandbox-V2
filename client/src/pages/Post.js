import React, { Component } from 'react';
import { Flex, Stack, VStack, Spacer } from '@chakra-ui/layout';
import {
  Input,
  Box,
  Center,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Button,
  ButtonGroup,
  IconButton,
  Image,
  Link,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  StackDivider,
  Text,
  Textarea,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { FaSun, FaMoon, FaGithub, FaUser, FaPaperPlane, FaHeart, FaTrashAlt, FaArrowCircleLeft } from 'react-icons/fa';

import CommentList from '../components/CommentList'
import { QUERY_SINGLE_POST } from '../utils/queries';

import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const Post = () => {
    
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark';
    const textcolor = useColorModeValue('#BFAE98', '#E8DFD8');
    const bgcolor = useColorModeValue('RGBA(0, 0, 0, 0.16)', 'RGBA(0, 0, 0, 0.36)');

    const { postId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_POST, {
        variables: { postId: postId },
      });

    const post = data?.post || {}

    if (loading) {
    return <div>Loading...</div>;
  }

    return (
        <Stack className='postbg' pt={100}>
            
            <Container p={5} maxW='container.sm'>
                <IconButton icon={<FaArrowCircleLeft />} isRound='true' />
                <Box m={3}>
                    <FormControl isReadOnly id='comment' >
                        <FormLabel color={textcolor}> {post.postAuthor} </FormLabel>
                        <InputGroup
                            size='md'
                            boxShadow='lg'
                        >
                            <Input h='65px' backgroundColor={bgcolor}
                                variant='filled'
                                type='comment'
                                placeholder = {post.postText}
                            />
                        </InputGroup>
                    </FormControl>
                </Box>

                <Divider></Divider>
                
                  <CommentList
                    comments={post.comments}
                  />

                {/* user #2's comment */}
                {/* <Box m={10}>
                    <FormControl isReadOnly id='comment' >
                        <FormLabel color={textcolor}> username2 </FormLabel>
                        <InputGroup
                            size='md'
                            boxShadow='lg'
                        >
                            <Input h='65px' backgroundColor={bgcolor}
                                variant='filled'
                                type='comment'
                                placeholder='cool post'
                            />
                            
                        </InputGroup>
                    </FormControl>
                </Box> */}

                {/* user #3's comment */}
                {/* <Box m={10}>
                    <FormControl isReadOnly id='comment' >
                        <FormLabel color={textcolor}> {post.postAuthor}  </FormLabel>
                        <InputGroup
                            size='md'
                            boxShadow='lg'
                        >
                            <CommentList h='65px' backgroundColor={bgcolor}
                                variant='filled'
                                type='comment'
                                comments = {post.comments}
                            />
                        </InputGroup>
                    </FormControl>
                </Box> */}

                {/* user #4's comment */}
                {/* <Box m={10}>
                    <FormControl isReadOnly id='comment' >
                        <FormLabel color={textcolor}> {post.postAuthor} </FormLabel>
                        <InputGroup
                            size='md'
                            boxShadow='lg'
                        >
                            <CommentList h='65px' backgroundColor={bgcolor}
                                variant='filled'
                                type='comment'
                                comments={post.comments}
                            />
                            
                        </InputGroup>
                    </FormControl>
                </Box> */}

            </Container>
        </Stack>
        
    );
};

export default Post;