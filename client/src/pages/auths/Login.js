import { useState } from 'react';
import { axios } from 'axios';
import { Link } from 'react-router-dom';
import { Flex, Stack, VStack, Spacer, Container } from '@chakra-ui/layout';
import {
  Input,
  Box,
  FormControl,
  FormLabel,
  Button,
  ButtonGroup,
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

import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../../utils/mutations'

import Auth from '../../utils/auth'

const Login = (props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [info, setInformation] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode();
  const textcolor = useColorModeValue('#BFAE98', '#E8DFD8');
  const bgcolor = useColorModeValue('RGBA(0, 0, 0, 0.16)', 'RGBA(0, 0, 0, 0.36)');
  const isDark = colorMode === 'dark';

  const [formState, setFormSTate] = useState({ email: '', password: '' })
  const [login, { error, data }] = useMutation(LOGIN_USER)

  const handleChange = (event) => {
    const { name, value } = event.target
    
    setFormSTate({
      ...formState,
      [name]: value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setInformation(true);


    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      setInformation(false);
    } catch (e) {
      console.error(e)
    }
    setInformation(false);
    setFormSTate({
      email: '',
      password: ''
    })
  };
  //Added
  return (
    <Flex flexDirection='column' p='50px' pl='200px'>
      {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
      <Box
        border='2px'
        borderRadius='md'
        boxShadow='lg'
        color={textcolor}
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
              color='yellow.900'
              name='email'
              type='email'
              value={formState.email}
              placeholder='Enter your email address'
              onChange={handleChange}
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
            color='yellow.900'
              name='password'
              value={formState.password}
              onChange={handleChange}
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
      )}

      {error && (
        <div className="my-3 p-3 bg-danger text-white">
          {error.message}
        </div>
      )}
    </Flex>
  );
};

export default Login;
