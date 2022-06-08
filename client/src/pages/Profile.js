import { useState, useEffect } from 'react';
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
import PostForm from '../components/PostForm';
import ProfileList from '../components/ProfileLists';

const Profile = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const textcolor = useColorModeValue('#BFAE98', '#E8DFD8');
  const bgcolor = useColorModeValue('RGBA(0, 0, 0, 0.16)', 'RGBA(0, 0, 0, 0.36)');

  const toast = useToast();
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [userPic, setUserPic] = useState([]);

  useEffect (() => {
    fetch('/mypost', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then( res => res.json() )
      .then(result => {
        console.log(result)
        setUserPic(result.mypost)
    })
  }, [])

  useEffect (() => {
    if(image) {
      const data = new FormData()
      data.append('file', image);
      data.append('upload_preset', 'noteful-app');
      data.append('cloud_name', 'av-code');
      fetch('https://api.cloudinary.com/v1_1/av-code/image/upload', {
        method: 'post',
        body: data,
      })
      .then(res => res.json())
      .then(data => {
        fetch('/updatepic', {
            method: "put",
            headers: {
              "Content-Type":"application/json",
              "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
              pic: data.url
            })
        })
        .then(res => res.json())
          .then(result => {
            console.log(result)
            localStorage.setItem("user",JSON.stringify({ pic: result.pic }))
            //window.location.reload()
        })
    
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [image])

  const updatePhoto = (file) => {
    setImage(file)
  }

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


  return (
    <Stack p={5} className={isDark ? 'hdarkbg': 'hlightbg'}>
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

      <VStack  >

        {/* upload 's profile picture */}
          <Grid p={40} templateColumns='repeat(4, 1fr)' gap={5}>
            {/* renders user's name */}
            <GridItem w='100%' h='100%' colSpan={1}>
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

            {/* user's profile pic */}
            <Box boxSize='300px' border='10px' borderStyle='inset'>
              <Image src='https://res.cloudinary.com/av-code/image/upload/v1654647494/default-pic.png'></Image>
            </Box>
            {/* <Box border='1px' p='10px'>
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
            </Box> */}
          </GridItem>
          <GridItem pl={20} w='100%' h='100%' colSpan={3}>
            <Text 
                textShadow={isDark ? '2px 2px #BFAE98' : '2px 2px #E8DFD8'}
                className='gloria' 
                p='30px'
                fontSize='6xl'
                color={textcolor}
                > 
                  Share your thoughts!
            </Text>

            {/* renders post form */}
            <Box textAlign='center'>
                <PostForm />
            </Box>
        </GridItem>
        </Grid>
        
        

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

              <Box>
                  <RouteLink to="/post"></RouteLink>
              </Box>
              
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

      </VStack>

    </Stack>
  );
};

export default Profile;
