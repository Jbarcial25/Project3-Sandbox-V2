import { Stack, VStack } from '@chakra-ui/layout';
import { Box, Link, IconButton, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { FaSun, FaMoon, FaGithub, FaPaperPlane, FaHeart, FaTrashAlt } from 'react-icons/fa';

import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';

import Login from './Login';
import Signup from './Signup';


export default function Authspage({ loggedIn, setLoggedIn }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const textcolor = useColorModeValue('#E8DFD8', 'yellow.900');
  const bgcolor = useColorModeValue('#ECE8DF', '#BFAE98');
  const isDark = colorMode === 'dark';

  return (
    <VStack className='background'>
        <Box p={5} ml='auto'>
            <Link href='https://github.com/a-vitug/react-app'>
            <IconButton ml={2} icon={<FaGithub />} isRound='true'></IconButton>
            </Link>

            <IconButton
            ml={8}
            icon={isDark ? <FaSun /> : <FaMoon />}
            isRound='true'
            onClick={toggleColorMode}
            ></IconButton>
        </Box>

      <Wrap color={textcolor}>
        <Stack pt='180px' textShadow='2px 2px #BFAE98'>
          <WrapItem className='halimun'>
            <Text fontSize='90px'>welcome</Text>
          </WrapItem>
          <WrapItem noOfLines={2} textAlign='center'>
            <Text className='gloria' fontSize='60px'>
              to
            </Text>
            <Text className='gloria' fontSize='70px'>
              noteful
            </Text>
          </WrapItem>
        </Stack>

        <Tabs align='end' variant='unstyled'>
            <TabList m={3}>
                <Tab 
                    m={1}
                    border='2px'
                    borderRadius='md'
                    boxShadow='lg'
                    color='#BDD1B6'
                    fontWeight='bold'
                    >
                        Login
                </Tab>
                <Tab
                    m={1}
                    border='2px'
                    borderRadius='md'
                    boxShadow='lg'
                    color='#BDD1B6'
                    fontWeight='bold'
                    >
                        Signup
                </Tab>
            </TabList>
            <TabPanels>
              
                <TabPanel>
                    <Login />
                </TabPanel>
                <TabPanel>
                    <Signup />
                </TabPanel>
            </TabPanels>
            </Tabs>
      </Wrap>

    </VStack>
  );
};

// export default Authspage;
