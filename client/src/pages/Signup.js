import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axios } from 'axios';
import { Flex, VStack } from '@chakra-ui/layout';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import {
  Input,
  Box,
  FormControl,
  FormLabel,
  Button,
  ButtonGroup,
  InputGroup,
  InputRightElement,
  useToast,
  Tooltip,
} from '@chakra-ui/react';

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useNavigate();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [info, setInformation] = useState();

  const { colorMode, toggleColorMode } = useColorMode();
  const textcolor = useColorModeValue('#E8DFD8', 'yellow.900');
  const bgcolor = useColorModeValue('#ECE8DF', '#BFAE98');
  const isDark = colorMode === 'dark';

  const submitHandler = async () => {
    setInformation(true);
    if (!username || !email || !password || !confirmpassword) {
      toast({
        title: 'Invalid information. Please try again.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setInformation(false);
      return;
    }

    if (password !== confirmpassword) {
      toast({
        title: 'Password must match',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/user/signup',
        {
          username,
          email,
          password,
        },
        config
      );

      toast({
        title: 'Successfully signed up!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setInformation(false);
      history.push('/profile');
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
        <FormControl isRequired id='username' pb={8}>
          <FormLabel>Username</FormLabel>
          <InputGroup
            size='md'
            backgroundColor={bgcolor}
            color={textcolor}
            boxShadow='lg'
          >
            <Input
              placeholder='Enter your username'
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <FormControl isRequired id='email' pb={8}>
          <FormLabel>Email Address</FormLabel>
          <InputGroup
            size='md'
            backgroundColor={bgcolor}
            color={textcolor}
            boxShadow='lg'
          >
            <Input
              value={email}
              type='email'
              placeholder='Enter your email address'
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <FormControl isRequired id='password' pb={8}>
          <FormLabel>Password</FormLabel>
          <Tooltip
            label='Must be a minimum of eight characters, 
                at least one uppercase letter, 
                one lowercase letter, 
                one number and 
                one special character'
          >
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
          </Tooltip>
        </FormControl>

        <FormControl isRequired id='password' pb={5}>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup
            size='md'
            backgroundColor={bgcolor}
            color={textcolor}
            boxShadow='lg'
          >
            <Input
              type={show ? 'text' : 'password'}
              placeholder='Confirm password'
              onChange={(e) => setConfirmpassword(e.target.value)}
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
              className='signupBtn'
              backgroundColor={isDark ? '#ECE8DF' : '#BFAE98'}
              color={isDark ? '#5E4D3B' : '#E8DFD8'}
              boxShadow='lg'
              width='100%'
              variant='outline'
              style={{ marginTop: 15 }}
              onClick={submitHandler}
              isLoading={info}
            >
              Signup
            </Button>
          </ButtonGroup>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Signup;
