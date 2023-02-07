import {Box, Text, IconButton, Icon} from 'native-base';
import { Ionicons } from '@expo/vector-icons'; 
import React from 'react'

type Props = {
  navigation: any
  route: any
  back: any
  options: any
}

const ChatHeader: React.FC<Props> = ({navigation, route, back, options}) => {
  const [type, setType] = React.useState(route.params.type);
  const handleGoBack = React.useCallback(()=>{
    navigation.goBack();
  }, [navigation]);
  return (
    <Box 
      _light={{bg:"light.50"}}
      safeAreaTop 
      safeAreaX 
      paddingX={1}  
      flexDirection="row" 
      justifyContent="space-between"
      borderBottomWidth={0.5}
      borderBottomColor="light.300"

      >
        <IconButton 
          icon={<Icon as={Ionicons} name="ios-chevron-back" color="light.800" size="xl"/>}
          rounded="full"
          _pressed={{
            opacity: 0.5,
            bg:"none"
          }}
          onPress={handleGoBack}
        />
        <IconButton 
          icon={<Icon as={Ionicons} name={type === 'new' ? "ios-share-outline" : "ios-trash-outline"} color="light.800" size="xl"/>}
          rounded="full"
          _pressed={{
            opacity: 0.5,
            bg:"none"
          }}
        />
    </Box>
  )
}

export default ChatHeader