import React from 'react';
import {
    Input,
    Avatar,
    AvatarGroup,
    Box,
    FormControl,
    FormLabel,
    IconButton,
    InputGroup,
    InputRightElement,
    Text,
} from '@chakra-ui/react';

import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { FaTrashAlt } from 'react-icons/fa';

import { useMutation } from '@apollo/client';
import { REMOVE_COMMENT } from '../../utils/mutations';
import { QUERY_ME} from '../../utils/queries'

const CommentList = ({ comments, postId }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark';
    const textcolor = useColorModeValue('#BFAE98', '#E8DFD8');
    const bgcolor = useColorModeValue('RGBA(0, 0, 0, 0.16)', 'RGBA(0, 0, 0, 0.36)');
    
    const refresh = function () {
        document.location.reload()
    }

    const [removeComment, { error }] = useMutation(REMOVE_COMMENT, {
        updata(cache, { data: { removeComment }}) {
            try {
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: removeComment}
                })
            } catch (e) {
                console.error(e);
            }
        },
    })

    const handleRemoveComment = async (commentId, postId) => {
        try {
            const { data } = await removeComment ({
                variables: {
                    postId,
                    commentId
                }
            })
        } catch (e) {
            console.error(e)
        }
    }

    if (!comments.length) {
        return (
            <Text 
                className='indie'
                fontWeight='bold'
                p='20px'
                fontSize='xl'
                color={textcolor}
                textAlign='center'
                > 
                No Comments yet!
            </Text>
        )
    };

    return(
        <Box m={10}>
            {comments &&
                comments.map((comment) => (

                    <FormControl p={3} key={comment._id} isReadOnly id='comment' >
                        <FormLabel color={textcolor}>
                            <AvatarGroup>
                                <Avatar 
                                    bg='#1D454E'
                                    color='#E8DFD8'
                                    boxSize={7}
                                    name={comment.commentAuthor}
                                >
                                </Avatar>
                                <Text pl={5} className='indieFlower'>
                                    {comment.commentAuthor}
                                </Text>
                                <Text ml='auto'>
                                    {comment.createdAt}
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
                                placeholder={comment.commentText}
                            />
                            <InputRightElement mr={5} p='33px' 
                                onClick= {refresh}
                            >
                                <IconButton 
                                    icon={<FaTrashAlt />} 
                                    backgroundColor={isDark ? '#ECE8DF' : '#BFAE98'}
                                    color={isDark ? '#5E4D3B' : '#E8DFD8'}
                                    onClick={() => handleRemoveComment(comment._id, postId)} 
                                />
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
            ))}
        </Box>
    )
   
     
};



export default CommentList;