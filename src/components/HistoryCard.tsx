import { HStack, Text, Box, Pressable, Icon, Heading } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import uuid from 'react-native-uuid'
import React from 'react'
import { ChatMessageParams } from '../data'
import { useNavigation } from '@react-navigation/native'
import { ChatHistoryData } from '../context/ChatHistoryProvider';
type Props = {
    chatHistory: ChatHistoryData,
}

const HistoryCard : React.FC<Props> = ({chatHistory}) => {
    const navigation = useNavigation();
    const [msgInfo ] = React.useState({title: chatHistory.messages[0].msg, response: chatHistory.messages[1]?.msg ?? "Empty"});
    const handleOnPress = React.useCallback(()=> {
        navigation.navigate('chat' as never, {type:'old', chatHistoryId: chatHistory.id} as never);
    },[msgInfo]);
    return (
        <Pressable
            _pressed={
                {
                    opacity: 0.6
                }
            }
            onPress={handleOnPress}
            flexDirection="row"
            key={uuid.v4().toString()}
            marginBottom={2}
            padding={3.5} 
            alignItems="center" 
            position="relative" 
            bg="light.200" 
            borderRadius={12}>
            <Box>
                <Icon as={AntDesign} name="questioncircle" size="md" color=""/>
            </Box>
            <Box paddingX={5}>
                <Heading fontSize="md">{msgInfo.title}</Heading>
                <Text fontSize="md" numberOfLines={1}>{msgInfo.response}</Text>
            </Box>
        </Pressable>
    )
}

export default HistoryCard