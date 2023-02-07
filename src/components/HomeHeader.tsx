import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Avatar, Box, Heading, Icon,IconButton } from 'native-base';
import {Octicons } from '@expo/vector-icons';


const HomeHeader: React.FC = () => {
  return (
    <Box _light={{bgColor:"light.50"}} padding={2.5} safeAreaX safeAreaTop flexDirection="row" alignItems="center" justifyContent="space-between">
      
      <IconButton size="md" bg="muted.200" borderRadius="full"
        variant="solid" icon={<Icon as={Octicons } name="three-bars" color="muted.600" />}
        _pressed={{
          bg: "muted.100"
        }}
      />
      {/* <Heading>
          Home
      </Heading> */}
          <Avatar
            bg="red.900"
            size="md"
          >
            JP
          </Avatar>
    </Box>

  )
}
export default HomeHeader;

