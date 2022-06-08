import React from 'react';
import {
    Box,
    Link,
    Stack,
    Text,
    Spacer,
    Flex,
  } from '@chakra-ui/react';
  import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';

const Footer = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const textcolor = useColorModeValue('#BFAE98', '#E8DFD8');
  const bgcolor = useColorModeValue('RGBA(0, 0, 0, 0.16)', 'RGBA(0, 0, 0, 0.36)');

return (
    <Box boxShadow='md'
    backgroundColor={isDark ? "#F4F4F4" : "#BFAE98" }
      color={isDark ? "#BFAE98" : "#F4F4F4"}> 
      <Flex p={6}>
        <Box as="kbd" fontWeight="bold">
        <Stack direction={'row'} spacing={6}>
          <Link href={'https://github.com/a-vitug'}>Allyson </Link>
          <Link href={'https://github.com/Jbarcial25'}>Jasper </Link>
          <Link href={'https://github.com/KJustin03'}>Kyle </Link>
          <Link href={'https://github.com/aldreanelafont'}>Aldreane </Link>
          <Link href={'https://github.com/microjess'}>Jessi </Link>
        </Stack>
        </Box>
        <Spacer />
        <Box><Text as="samp" fontWeight="bold" >© 2022 Noteful Dev Team. All rights reserved</Text></Box>
      </Flex>
    </Box>
  );
};

export default Footer;


