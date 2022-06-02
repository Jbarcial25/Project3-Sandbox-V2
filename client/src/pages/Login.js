import { useState } from 'react';
import { axios } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Flex, Stack, VStack, Spacer, Container } from '@chakra-ui/layout';
import {
  Input,
  Box,
  FormControl,
  FormLabel,
  Button,
  ButtonGroup,
  Link,
  IconButton,
  InputGroup,
  InputRightElement,
  useToast,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { FaSun, FaMoon, FaGithub } from 'react-icons/fa';

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [info, setInformation] = useState(false);
  const history = useNavigate();

  const { colorMode, toggleColorMode } = useColorMode();
  const textcolor = useColorModeValue('#E8DFD8', 'yellow.900');
  const bgcolor = useColorModeValue('#ECE8DF', '#BFAE98');
  const isDark = colorMode === 'dark';

  const submitHandler = async () => {
    setInformation(true);
    if (!email || !password) {
      toast({
        title: 'Please Fill all the Fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setInformation(false);
      return;
    }

    // console.log(email, password);
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/user/login',
        { email, password },
        config
      );

      // console.log(JSON.stringify(data));
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setInformation(false);
      history.push('/chats');
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setInformation(false);
    }
  };

  return (
    <Flex flexDirection='column' p='50px' pl='200px'>
      <Box
        border='2px'
        borderRadius='md'
        boxShadow='lg'
        color={isDark ? '#5E4D3B' : '#E8DFD8'}
        p={20}
      >
        <FormControl id='email' isRequired pb='40px'>
          <FormLabel>Email Address</FormLabel>
          <InputGroup
            size='md'
            backgroundColor={bgcolor}
            color={textcolor}
            boxShadow='lg'
          >
            <Input
              color='black'
              value={email}
              type='email'
              placeholder='Enter your email address'
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <FormControl id='password' isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup
            size='md'
            backgroundColor={bgcolor}
            color={textcolor}
            boxShadow='lg'
          >
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={show ? 'text' : 'password'}
              placeholder='Enter password'
            />
            <InputRightElement width='4.5rem'>
              <Button
                h='1.75rem'
                size='sm'
                onClick={handleClick}
                backgroundColor={isDark ? '#ECE8DF' : '#BFAE98'}
                color={isDark ? '#5E4D3B' : '#E8DFD8'}
              >
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <VStack>
          <ButtonGroup pt={5} alignItems='center'>
            <Button
              backgroundColor={isDark ? '#ECE8DF' : '#BFAE98'}
              color={isDark ? '#5E4D3B' : '#E8DFD8'}
              boxShadow='lg'
              width='100%'
              variant='outline'
              style={{ marginTop: 15 }}
              onClick={submitHandler}
              isLoading={info}
            >
              Login
            </Button>
          </ButtonGroup>
          <Box></Box>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Login;
