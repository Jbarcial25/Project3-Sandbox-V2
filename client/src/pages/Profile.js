import { useState } from 'react';
import { axios } from 'axios';
import { useToast } from '@chakra-ui/toast';
import { useNavigate } from 'react-router-dom';
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
} from '@chakra-ui/react';

import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { FaSun, FaMoon, FaGithub, FaUser, FaPaperPlane, FaHeart, FaTrashAlt } from 'react-icons/fa';

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_POSTS, QUERY_SINGLE_POST, QUERY_ME } from '../utils/queries';
import ProfileList from '../components/ProfileLists';

const Profile = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const textcolor = useColorModeValue('yellow.900', '#E8DFD8');
  const bgcolor = useColorModeValue('RGBA(0, 0, 0, 0.16)', 'RGBA(0, 0, 0, 0.36)');
  const toast = useToast();
  const navigate = useNavigate();

  const [pic, setPic] = useState(false);
  const [user, setUser] = useState();

  // uploads user's profile picture
  const uploadPic = (pics) => {
    setUser(true);
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
          setUser(false);
        })
        .catch((err) => {
          console.log(err);
          setUser(false);
        });
    } else {
      toast({
        title: 'Invalid image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setUser(false);
      return;
    }
  };

  const upload = async () => {
    setUser(true);
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/user',
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
      setUser(false);
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
      setUser(false);
    }
  };

  const { loading, data } = useQuery(QUERY_ME);
  const me = data?.me || [];

  return (
    <Stack p={5}>
      <Flex w='100%'>
        <Spacer></Spacer>
        <IconButton
          ml={8}
          icon={<FaUser />}
          isRound='true'
          backgroundColor={bgcolor}
        ></IconButton>

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
      </Flex>

      <Wrap spacing='30px'>
        {/* upload user's profile picture */}
        <WrapItem>
          <Flex flexDirection='column' p='170px'>
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
                isLoading={user}
              >
                {' '}
                Upload{' '}
              </Button>
            </Box>
          </Flex>
        </WrapItem>
        
        <WrapItem>
          <Box m='30px'>
            <Text 
                textShadow='2px 2px #BFAE98'
                className='gloria' 
                p='30px'
                pl='100px'
                fontSize='6xl'
                color={textcolor}
                > 
                    What's on your mind? 
            </Text>
            <Center>
                <Box p='30px' w='80%'>
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
          </Box>
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
                      Here's some news for you...
              </Text>

              {/* user's posts */}
              {loading ? (
                  <Box m={3}>
                    No Posts
                  </Box>
                ) : (
                  <ProfileList 
                    me={me}
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
