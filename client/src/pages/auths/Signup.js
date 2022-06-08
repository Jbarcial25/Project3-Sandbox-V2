import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  Tooltip,
} from '@chakra-ui/react';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth'

const Signup = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const textcolor = useColorModeValue('#BFAE98', '#E8DFD8');
  const bgcolor = useColorModeValue('RGBA(0, 0, 0, 0.16)', 'RGBA(0, 0, 0, 0.36)');
  const isDark = colorMode === 'dark';

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [image, setImage] = useState('');
  const [userPic, setUserPic] = useState('');
  const navigate = useNavigate();

  // uploads 's profile picture
  //added somethings
  useEffect(() => {
    if(userPic) {
      submitHandler()
    }
  }, [userPic])

  const uploadPic = () => {
    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'noteful-app');
      data.append('cloud_name', 'av-code');
      fetch('https://api.cloudinary.com/v1_1/av-code/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUserPic(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setUserPic(false);
      return;
    }
  };

  const upload = async () => {
    setUserPic(true);
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/profile',
        {
          image,
        },
        config
      );
      console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUserPic(false);
      navigate.push('/profile');
    } catch (error) {

      setUserPic(false);
    }
  };

  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    pic: userPic,
  });
  const [addUser, { error, data }] = useMutation(ADD_USER)

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    })
  }

  const submitHandler = async (event) => {
    // event.preventDefault();
    console.log(formState)
    try {

      const { data } = await addUser({
        variables: {
          ...formState
        }
      })

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e)
    }
  };

  const sendForm = () => {
    if (image) {
      uploadPic()
    } else {
      submitHandler()
    }
  }

  //added
  return (
    <Flex flexDirection='column' p='50px' pl='200px'>
      {data ? (
        <p>
          Success! You may now head{' '}
          <Link to="/profile">back to the homepage.</Link>
        </p>
      ) : (
        <Box
          border='2px'
          borderRadius='md'
          boxShadow='lg'
          color={textcolor}
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
                color='yellow.900'
                name="username"
                value={formState.name}
                placeholder='Enter your username'
                onChange={handleChange}
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
                color='yellow.900'
                name="email"
                value={formState.email}
                type='email'
                placeholder='Enter your email address'
                onChange={handleChange}
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
                  color='yellow.900'
                  name="password"
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
            </Tooltip>
          </FormControl>

          {/* <Box >
              <FormControl id='pic'>
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                  type='file'
                  p={1.5}
                  accept='image/*'
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </FormControl>
              <Button
                backgroundColor='#BDD1B6'
                style={{ marginTop: 15 }}
                onClick={handleClick}
                isLoading={userPic}
              >
                {' '}
                Upload{' '}
              </Button>
            </Box> */}

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
              >
                Signup
              </Button>
            </ButtonGroup>
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

export default Signup;
