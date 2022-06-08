import Authspage from './auths/Authspage';
import { Flex, Stack, HStack, Heading, Grid, GridItem, Spacer } from '@chakra-ui/layout';
import { Avatar, AvatarGroup, IconButton, Link, Box, Divider,  Image, InputGroup, FormControl, FormLabel, Input, Text, Tooltip } from '@chakra-ui/react';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { Link as RouteLink } from 'react-router-dom';

import { FaSun, FaMoon, FaGithub, FaUser, FaPowerOff, FaUserPlus } from 'react-icons/fa';

// swiper elements
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination, EffectFade } from 'swiper';
import 'swiper/css';

import { useQuery } from '@apollo/client';
import {  QUERY_POSTS} from '../utils/queries';
import Auth from '../utils/auth';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

export default function Homepage({ loggedIn, setLoggedIn }) {

    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark';
    const textcolor = useColorModeValue('#BFAE98', '#E8DFD8');
    const bgcolor = useColorModeValue('RGBA(0, 0, 0, 0.16)', 'RGBA(0, 0, 0, 0.36)');

    const outerBoxStyles = {
        background:
          'url(../img/background.png) center/cover no-repeat',
    }

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    const { loading, data } = useQuery(QUERY_POSTS)
    const posts = data?.posts || [];

    return (
        <Stack p={5} className={isDark ? 'hdarkbg': 'hlightbg'}>
            <Box  backdropBlur='3px' borderRadius='md' >

            {/* if logged in */}
            {Auth.loggedIn() ? (
                <>
                    <Flex w='100%'>
                        <Link href='https://github.com/a-vitug/react-app'>
                            <IconButton ml={2} icon={<FaGithub />} backgroundColor={bgcolor} isRound='true'></IconButton>
                        </Link>
                        
                        <IconButton ml={8} icon={isDark ? <FaSun /> : <FaMoon />} backgroundColor={bgcolor} isRound='true' onClick={toggleColorMode}></IconButton>
                    
                            <Spacer></Spacer>
                                <RouteLink to='/profile'>
                                    <Tooltip label='My Account'>
                                        <IconButton 
                                            ml={8}
                                            icon={<FaUser />}
                                            backgroundColor={bgcolor}
                                            isRound='true'
                                        >
                                        </IconButton>
                                    </Tooltip>
                                </RouteLink>

                                <Tooltip label='Logout'>
                                    <IconButton
                                        onClick={logout}
                                        ml={8}
                                        icon={<FaPowerOff />}
                                        backgroundColor={bgcolor}
                                        isRound='true'
                                    ></IconButton>
                                </Tooltip>

                    </Flex>

                    <Box p='100px' m='50px' mx={300}>
                        <Text 
                            textShadow={isDark ? '2px 2px #BFAE98' : '2px 2px #E8DFD8'}
                            className='gloria' 
                            p='30px'
                            pl='100px'
                            fontSize='6xl'
                            color={textcolor}
                            > 
                                What's on your mind? 
                        </Text>
                        
                        {/* renders post form */}
                        <Box textAlign='center'>
                            <PostForm />
                        </Box>
                    </Box>

                    <Divider />

                    <Grid templateColumns='repeat(5, 1fr)' gap={5}>
                        {/* paid ads */}
                        <Box m={3}>
                            <Link href='https://buy.stripe.com/test_aEU7sD5at8bBali004'>
                                <Image src={isDark ? './images/dark4.png' : './images/adss4.png'} />
                            </Link>
                        </Box>

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
                            <Box>
                                <RouteLink to="/post"></RouteLink>
                            </Box>

                            {/*POSTS LIST */}
                                    {loading ? (
                                        <div> loading....</div>
                                    ) : (
                                        <PostList
                                            posts={posts}
                                            title='here are some posts'
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
                
                </>

            // else logged out
            ) : (
                <>
                    <Flex w='100%'>

                        <Spacer></Spacer>

                        <RouteLink to='/authspage'>
                            <Tooltip label='Login'>
                                <IconButton // onClick={() => setLoggedIn(!loggedIn)}
                                    ml={8}
                                    icon={<FaUserPlus />}
                                    backgroundColor={bgcolor}
                                    isRound='true'
                                >
                                </IconButton>
                            </Tooltip>
                        </RouteLink>

                        <Link href='https://github.com/a-vitug/react-app'>
                            <IconButton ml={8} icon={<FaGithub />} backgroundColor={bgcolor} isRound='true'></IconButton>
                        </Link>
                        
                        <IconButton ml={8} icon={isDark ? <FaSun /> : <FaMoon />} backgroundColor={bgcolor} isRound='true' onClick={toggleColorMode}></IconButton>

                    </Flex>
                    

                    <Grid m={8} mx={100} templateColumns='repeat(4, 1fr)' gap={1}>
                        <GridItem colSpan={2}>
                            <Swiper modules={[Autoplay, Navigation, Pagination, EffectFade]}
                                autoplay={{ disableOnInteraction: false}}
                                navigation={true}
                                pagination={{clickable: true}}
                                loop
                                effect={'fade'}
                                speed={800}
                                slidesPerView={2}
                                id='first'
                                
                            >
                                <SwiperSlide>
                                    <Image w='100%' h='100%' objectFit='cover' src='./images/4.png' />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image w='100%' h='100%' objectFit='cover' src='./images/2.png' />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image w='100%' h='100%' objectFit='cover' src='./images/6.png' />
                                </SwiperSlide>
                                
                                
                            </Swiper>
                        </GridItem>
                           
                        <GridItem colStart={3} colEnd={6}>
                            <Swiper modules={[Autoplay, Navigation, Pagination, EffectFade]}
                                autoplay={{disableOnInteraction: false}}
                                navigation={true}
                                pagination={{clickable: true}}
                                loop
                                effect={'fade'}
                                speed={800}
                                slidesPerView={1}
                                id='second'
                            >
                                <SwiperSlide>
                                    <Image w='100%' h='100%' objectFit='cover' src='./images/5.png' />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image w='100%' h='100%' objectFit='cover' src='./images/3.png' />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image w='100%' h='100%' objectFit='cover' src='./images/7.png' />
                                </SwiperSlide>
                            </Swiper>
                        </GridItem>
                            

                    </Grid>

                    <Box backdropFilter='auto' backdropBlur='3px' borderRadius='md'>

                        <Divider />

                        <Grid templateColumns='repeat(5, 1fr)' gap={5}>

                            {/* paid ads */}
                            <Box m={5}>
                                <Link href='https://buy.stripe.com/test_6oE5kveL363t796cMO'>
                                    <Image src={isDark ? './images/dark1.png' :'./images/ad1.png'} />
                                </Link>
                            </Box>
                            <GridItem colSpan={3}>
                                <Text 
                                    className='indie'
                                    fontWeight='bold'
                                    p='20px'
                                    fontSize='3xl'
                                    color={textcolor}
                                    > 
                                        Check out some user's opinions
                                </Text>

                                {/* user's post 1 */}
                                <Box m={3}>
                                    <FormControl isReadOnly id='comment' >
                                        <FormLabel color={textcolor}> 
                                            <AvatarGroup>
                                                <Avatar 
                                                    bg='#1D454E'
                                                    color='#E8DFD8'
                                                    boxSize={7}
                                                    name='Xxhera'
                                                >
                                                </Avatar>
                                                <Text pl={5} className='indieFlower'>
                                                    xxhera
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
                                                placeholder='wow this is a great app! '
                                            />
                                        </InputGroup>
                                    </FormControl>
                                </Box>

                                {/* user's post 2 */}
                                <Box m={3}>
                                    <FormControl isReadOnly id='comment' >
                                        <FormLabel color={textcolor}>
                                            <AvatarGroup>
                                                <Avatar 
                                                    bg='#1D454E'
                                                    color='#E8DFD8'
                                                    boxSize={7}
                                                    name='Alexaaa'
                                                >
                                                </Avatar>
                                                <Text pl={5} className='indieFlower'>
                                                    alexaaa
                                                </Text>
                                                <Text ml='auto'>
                                                    
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
                                                placeholder='this is my very first post yay ~~~ '
                                            />
                                            
                                        </InputGroup>
                                    </FormControl>
                                </Box>

                                {/* user's post 3 */}
                                <Box m={3}>
                                    <FormControl isReadOnly id='comment' >
                                        <FormLabel color={textcolor}> 
                                            <AvatarGroup>
                                                <Avatar 
                                                    bg='#1D454E'
                                                    color='#E8DFD8'
                                                    boxSize={7}
                                                    name='casper'
                                                >
                                                </Avatar>
                                                <Text pl={5} className='indieFlower'>
                                                    casper
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
                                                placeholder='everyone did such a good job!'
                                            />
                                        </InputGroup>
                                    </FormControl>
                                </Box>

                            </GridItem>
                            {/* paid ads */}
                            <GridItem colEnd={6}>
                                <Box m={3}>
                                    <Link href='https://buy.stripe.com/test_bIY7sDbyR4Zp652003'>
                                        <Image src={isDark ? './images/dark2.png' : './images/ads2.png' } />
                                    </Link>
                                </Box>
                            </GridItem>

                        </Grid>
                    </Box>
   
                </>
                
            )} 
            
            
        </Box>
        </Stack>
    );
}