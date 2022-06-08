import React, { Component } from 'react';
import { Flex, Stack, VStack, Spacer } from '@chakra-ui/layout';
import {
  Input,
  Avatar,
  AvatarGroup,
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
  useDisclosure,
  Wrap,
  WrapItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Fade,
} from '@chakra-ui/react';

import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { FaSun, FaMoon, FaGithub, FaUser, FaPaperPlane, FaHeart, FaTrashAlt, FaArrowCircleLeft, FaComment } from 'react-icons/fa';

import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'
import { QUERY_SINGLE_POST } from '../utils/queries';

import { useQuery } from '@apollo/client';
import { Link as RouteLink, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Post = () => {
    
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark';
    const textcolor = useColorModeValue('#BFAE98', '#E8DFD8');
    const bgcolor = useColorModeValue('RGBA(0, 0, 0, 0.16)', 'RGBA(0, 0, 0, 0.36)');
    const { isOpen, onToggle } = useDisclosure()

    const { postId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_POST, {
        variables: { postId: postId },
      });

    const post = data?.post || {}

    if (loading) {
    return <div>Loading...</div>;
  }

    return (
        <>

        <Stack className='postbg' pt={100}>
            
            
            <Container p={5} maxW='container.sm'>
                <Box textAlign='right' p={10}>
                    <RouteLink to='/'>
                        <IconButton icon={<FaArrowCircleLeft />} 
                            isRound='true' 
                            backgroundColor={isDark ? '#ECE8DF' : '#BFAE98'}
                            color={isDark ? '#5E4D3B' : '#E8DFD8'} 
                        />
                    </RouteLink>
                </Box>

                <Box m={3}>
                    <FormControl isReadOnly id='comment' >
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
                
                {/* renders post's comments */}
                <CommentList
                    comments={post.comments}
                    postId={post._id}
                />

                {/* renders comment form */}
                <Container p={5} textAlign='right'>
                    <Button className='indieFlower' onClick={onToggle} backgroundColor='#C98860' color='#F4F4F4'>
                        Add a comment
                    </Button>
                    <Fade in={isOpen}>
                        <Box
                            p='10px'
                            mt='4'
                            rounded='md'
                        >
                            <CommentForm postId={post._id} />
                        </Box>
                    </Fade>
                </Container>
                

                

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


            </Container>
        </Stack>
        </>
    );
};

export default Post;