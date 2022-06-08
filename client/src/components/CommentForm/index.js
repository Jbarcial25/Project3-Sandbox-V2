import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import Auth from '../../utils/auth';
import { CREATE_COMMENT } from '../../utils/mutations';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { FaComment } from 'react-icons/fa';

import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Container
} from '@chakra-ui/react';

const CommentForm = ({ postId }) => {

  //Styles
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [createComment, { error }] = useMutation(CREATE_COMMENT);

  const refresh = function () {
    document.location.reload()
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createComment({
        variables: {
          postId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  }
  
  return(
    <>
    {Auth.loggedIn() ? (
      <Container maxW='container.sm'>
        <form className='form' id='post' onSubmit={handleFormSubmit}>
          <InputGroup
                  size='lg'
                  boxShadow='lg'
              >
                <Input h='100px'
                    name="commentText"
                    value={commentText}
                    backgroundColor='RGBA(0, 0, 0, 0.16)'
                    variant='filled'
                    placeholder='Type something here... '
                    onChange={handleChange}
                />
                <InputRightElement mr={5} p='50px'>
                    <IconButton icon={<FaComment />}
                        type='submit'
                        onClick={refresh}
                        size='lg'
                        backgroundColor={isDark ? '#ECE8DF' : '#BFAE98'}
                        color={isDark ? '#5E4D3B' : '#E8DFD8'} 
                    />
                </InputRightElement>
            </InputGroup>
        </form>
      </Container>

    // <div>
    //   {Auth.loggedIn() ? (
    //     <>
    //     <form
    //         className="flex-row justify-center justify-space-between-md align-center"
    //         onSubmit={handleFormSubmit}
    //       ></form>
    //     <Text mb='8px'>What are your comment on this post? {value}</Text>
    //       <Textarea
    //       value={commentText}
    //       onChange={handleChange}
    //       placeholder='Here is a sample placeholder'
    //       size='sm'
    //       />
    //     </>
        ) : (
          <p>
              You need to be logged in to share your thoughts. Please{' '}
              <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </p>
        )}
    </>
  );
};

export default CommentForm
