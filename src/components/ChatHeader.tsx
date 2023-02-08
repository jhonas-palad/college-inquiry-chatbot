import {Box, Text, IconButton, Icon} from 'native-base';
import { Ionicons } from '@expo/vector-icons'; 
import React from 'react';
import type{ ChatMessageParams } from '../data'; 
import { ChatHistoryContent, ChatHistoryData } from '../context/ChatHistoryProvider';
import { useChatHistory } from '../hooks';
import { storeChatHistory, getChatHistory } from '../api/AsyncStorage';
type Props = {
  navigation: any
  route: any
  back: any
  options: any,
  chatMsgs: ChatMessageParams[]
}

const ChatHeader: React.FC<Props> = ({navigation, route, back, options, chatMsgs}) => {
  const [type, setType] = React.useState(route.params.type);
  const {setChatHistory} = useChatHistory() as ChatHistoryContent;
  const handleGoBack = React.useCallback(()=>{
    const setData = async () => {
      try{

        const storedData = await storeChatHistory(chatMsgs);
        setChatHistory(storedData as ChatHistoryData);
      }catch(err){
        console.log(err);
      }
    }
    console.log(route);
    if(chatMsgs.length && !route.params?.chatHistoryId){
      setData();
    }
    navigation.goBack();
  }, [navigation, chatMsgs]);
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