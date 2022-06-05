import React from 'react';
import { Box, FormControl, FormLabel, FormHelperText, Input, InputGroup, InputRightElement, InputRightAddon, IconButton, Text } from '@chakra-ui/react';
import { FaSun, FaMoon, FaGithub, FaUser, FaPaperPlane, FaHeart, FaTrashAlt } from 'react-icons/fa';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';


const ProfileList = ({ me }) => {

    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark';
    const textcolor = useColorModeValue('yellow.900', '#E8DFD8');
    const bgcolor = useColorModeValue('RGBA(0, 0, 0, 0.16)', 'RGBA(0, 0, 0, 0.36)');

    if (!me.length) {
        return (
            <Text 
            className='indie'
            fontWeight='bold'
            p='20px'
            fontSize='xl'
            color={textcolor}
            textAlign='center'
                > 
                    No Posts Yet!
            </Text>
        )
    }

    return (
        <Box m={3}>
            {me &&
                me.map((me) => (
                   
                    <FormControl id='comment' key={me._id}>
                        <FormLabel color={textcolor}> {me.username} </FormLabel>
                        <InputGroup
                            size='md'
                            boxShadow='lg'
                        >
                            <Input h='65px' backgroundColor='RGBA(0, 0, 0, 0.16)'
                                variant='filled'
                                type='comment'
                                placeholder={me.post.postText}
                            />
                            <InputRightAddon mr={5} p='33px'>
                                <IconButton
                                    icon={<FaHeart />} 
                                    backgroundColor={isDark ? '#ECE8DF' : '#BFAE98'}
                                    color={textcolor} />
                                <IconButton 
                                    icon={<FaTrashAlt />} 
                                    backgroundColor={isDark ? '#ECE8DF' : '#BFAE98'}
                                    color={textcolor} />
                            </InputRightAddon>
                        </InputGroup>
                        <FormHelperText>likes</FormHelperText>  
                    </FormControl>
            ))}
            
        </Box>
    );
};

export default ProfileList;