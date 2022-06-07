import { useState } from 'react';
import { axios } from 'axios';
import { useToast } from '@chakra-ui/toast';
import { useNavigate, Navigate, useParams, Link as RouteLink } from 'react-router-dom';
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
  Wrap,
  WrapItem,
  Icon,
  Tooltip,
  Tag,
  TagLabel,
} from '@chakra-ui/react';

import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { FaSun, FaMoon, FaGithub, FaUser, FaPaperPlane, FaHeart, FaTrashAlt, FaHouseUser, FaPowerOff, FaLandmark, } from 'react-icons/fa';

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_POSTS, QUERY_SINGLE_POST, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import PostList from '../components/PostList';
import ProfileList from '../components/ProfileLists';

const Profile = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const textcolor = useColorModeValue('#BFAE98', '#E8DFD8');
  const bgcolor = useColorModeValue('RGBA(0, 0, 0, 0.16)', 'RGBA(0, 0, 0, 0.36)');

  const toast = useToast();
  const navigate = useNavigate();
  const [pic, setPic] = useState(false);
  const [userPic, setUserPic] = useState();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to='/profile' />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <Text 
        className='indie'
        fontWeight='bold'
        p='20px'
        fontSize='xl'
        color={textcolor}
        textAlign='center'
      > 
        You need to be logged in to see this.
    </Text>
    );
  }

  // const { loading, data } = useQuery(QUERY_ME, QUERY_POSTS);
  // const user = data?.user || [];


  // uploads 's profile picture
  const uploadPic = (pics) => {
    setUserPic(true);
    if (pics === undefined) {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }
    console.log(pics);
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'noteful-app');
      data.append('cloud_name', 'av-code');
      fetch('https://api.cloudinary.com/v1_1/av-code/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setUserPic(false);
        })
        .catch((err) => {
          console.log(err);
          setUserPic(false);
        });
    } else {
      toast({
        title: 'Invalid image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
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
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: 'Successfully uploaded your profile picture',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUserPic(false);
      navigate.push('/profile');
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setUserPic(false);
    }
  };

  return (
    <Stack p={5} className={isDark ? 'darkbg': 'lightbg'}>
      <Flex w='100%'>
          <Link href='https://github.com/a-vitug/react-app'>
            <IconButton
              ml={8}
              icon={<FaGithub />}
              isRound='true'
              backgroundColor={bgcolor}
            ></IconButton>
          </Link>

          <IconButton
            ml={8}
            icon={isDark ? <FaSun /> : <FaMoon />}
            isRound='true'
            onClick={toggleColorMode}
            backgroundColor={bgcolor}
          ></IconButton>

        <Spacer></Spacer>

        {/* if logged in */}
        {Auth.loggedIn() ? (
          <>
            <RouteLink to='/'>
              <Tooltip label='Home'>
                <IconButton
                  ml={8}
                  icon={<FaLandmark />}
                  isRound='true'
                  backgroundColor={bgcolor}
                >
                </IconButton>
              </Tooltip>
            </RouteLink>
            
            <Tooltip label='Logout'>
              <IconButton onClick={logout}
                ml={8}
                icon={<FaPowerOff />}
                backgroundColor={bgcolor}
                isRound='true'
              >
              </IconButton>
            </Tooltip>
            
            
          </>
          // else logged out
        ) : (
          <>
            
          </>
        )}
          
      </Flex>

      <Wrap  >

        {/* upload 's profile picture */}
        <WrapItem pl={65}>
          <Flex flexDirection='column' p='170px'>
            {/* renders user's name */}
            <Text 
              p={3}
              color='#1D454E'
              fontSize='2xl'
              className='indieFlower' 
              textAlign='center'
            >
              Hello, I'm {user.username}!
            </Text>

            <Tag colorScheme='whiteAlpha'></Tag>

            <Box border='1px' p='10px'>
              <FormControl id='pic'>
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                  type='file'
                  p={1.5}
                  accept='image/*'
                  onChange={(e) => uploadPic(e.target.files[0])}
                />
              </FormControl>
              <Button
                backgroundColor='#BDD1B6'
                style={{ marginTop: 15 }}
                onClick={upload}
                isLoading={userPic}
              >
                {' '}
                Upload{' '}
              </Button>
            </Box>

          </Flex>
        </WrapItem>
        
        <WrapItem>
          <Flex flexDirection='column' pt='120px'>
            <Text 
                textShadow={isDark ? '2px 2px #BFAE98' : '2px 2px #E8DFD8'}
                className='gloria' 
                p='30px'
                fontSize='6xl'
                color={textcolor}
                > 
                  Share your thoughts!
            </Text>
            <Center>
                <Box w='100%'>
                    <FormControl id='post'>
                        <InputGroup
                            size='lg'
                            boxShadow='lg'
                        >
                            <Input h='100px'
                                backgroundColor='RGBA(0, 0, 0, 0.16)'
                                variant='filled'
                                type='post'
                                placeholder='Type something here... '
                                // onChange={(e) => setEmail(e.target.value)}
                            />
                            <InputRightElement mr={5} p='50px'>
                                <IconButton icon={<FaPaperPlane />} 
                                size='lg'
                                    backgroundColor={isDark ? '#ECE8DF' : '#BFAE98'}
                                    color={isDark ? '#5E4D3B' : '#E8DFD8'} />
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                </Box>
            </Center>
          </Flex>
        </WrapItem>

        <Divider></Divider>
        
        <Grid templateColumns='repeat(5, 1fr)' gap={5}>

          {/* paid ads */}
          <GridItem colSpan={1}>
              <Box m={3}>
                  <Link href='https://buy.stripe.com/test_aEU7sD5at8bBali004'>
                      <Image src={isDark ? './images/dark4.png' : './images/adss4.png'} />
                  </Link>
              </Box>
          </GridItem>

          <GridItem colSpan={3}>
              <Text 
                  className='indie'
                  fontWeight='bold'
                  p='20px'
                  fontSize='3xl'
                  color={textcolor}
                  > 
                      Your posts go here...
              </Text>
              
              {/* user's post list */}
              {loading ? (
                  <Box m={3}>
                    No Posts yet!
                  </Box>
                ) : (
                  <ProfileList
                    user={user}
                    posts={user.posts}
                  />
                )}

              
          </GridItem>

          {/* paid ads */}
          <GridItem colEnd={6}>
              <Box m={5}>
                  <Link href='https://buy.stripe.com/test_eVaaEP7iBajJ9he8wx'>
                      <Image src={isDark ? './images/dark3.png' : './images/adsss3.png'} />
                  </Link>
                  
              </Box>
          </GridItem>

        </Grid>

      </Wrap>

    </Stack>
  );
};

export default Profile;
