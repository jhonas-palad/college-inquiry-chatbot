
import React from 'react'
import { Avatar, Box, Icon,IconButton } from 'native-base';
import {Octicons } from '@expo/vector-icons';


const HomeHeader: React.FC = (props: any) => {
  const {navigation} = props;
  const gotoSettings = () =>{
    navigation.navigate('settings');
  }
  return (
    <Box _light={{bgColor:"light.50"}} padding={2.5} safeAreaX safeAreaTop flexDirection="row" alignItems="center" justifyContent="space-between">
      
      <IconButton size="md" bg="muted.200" borderRadius="full"
        onPress={gotoSettings}
        variant="solid" icon={<Icon as={Octicons } name="three-bars" color="muted.600" />}
        _pressed={{
          bg: "muted.100"
        }}
      />
          <Avatar
            size="md"
            source={require('./icon.png')}
          >
            
          </Avatar>
    </Box>

  )
}
export default HomeHeader;

