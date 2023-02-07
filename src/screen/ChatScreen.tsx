import { Box, Text, Input, KeyboardAvoidingView,ScrollView, IconButton, Icon, FlatList} from 'native-base'
import {Platform, Keyboard} from 'react-native'
import React from 'react'
import { RootStackParamList } from '../navigation';
import { useRoute, useNavigation, RouteProp  } from '@react-navigation/native';
import { ChatHeader, ChatMessage } from '../components';
import { makeChatMessage, messages, chatBotUser, currentUser, ChatMessageParams } from '../data';
import { Ionicons } from '@expo/vector-icons';
import { useSocket } from '../hooks/useSocket';


type ChatScreenRouteProp = RouteProp<RootStackParamList, 'chat'>;


const ChatScreen: React.FC = () => {
    const route = useRoute<ChatScreenRouteProp>();
    const navigation = useNavigation();
    const ws: WebSocket | null = useSocket();
    const [chatMsgs, setChatMsgs] = React.useState<Array<ChatMessageParams>>([]);
    const [messageInput, setMessageInput] = React.useState('');
    const [errorState, setErrorState] = React.useState({
        msg: '',
        showErr: false,
    })
    React.useEffect(()=>{
        if(ws){
            ws.onmessage = ({data}: MessageEvent) => {
                //Bot response
                const responseData = JSON.parse(data);
                const {text, options} = responseData;
                
                const botReply = makeChatMessage(text, chatBotUser, options ?? {});
                setChatMsgs(prevMsgs => [...prevMsgs, botReply]);
            }
            ws.onclose = (e: CloseEvent) => {

            }
            ws.onerror = (event: Event) => {
                console.log(event);
                setErrorState({msg: 'An error occured', showErr:true});
            }
        }
        return ()=> {
            console.log("close");
        }
    },[ws]);
    React.useEffect(()=>{
        navigation.setOptions({
            headerShown: true,
            title: 'Home',
            header: (opts: any) => {
              return <ChatHeader {...opts}/>
            }
        })
    }, []);

    
    
    const handleSend = React.useCallback((message: string) => {
        if(!message) return;

        try{
            ws?.send(message);
            const chatMsg = makeChatMessage(message, currentUser, {});
            setChatMsgs((prevMsgs) => [...prevMsgs, chatMsg]);
        }
        catch(err){
            console.log(err);
        }
        finally{
            setMessageInput('');
        }
    },[ws, chatMsgs]);
    return (
        <Box flex={1} _light={{bg:"light.50"}} safeAreaBottom>
            <KeyboardAvoidingView
                keyboardVerticalOffset={100}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                flex={1}>
                    <Box flex={1}>
                        <FlatList
                            paddingX={3}
                            flex={1}
                            _light={{
                                bg:"light.50"
                            }}
                            data={chatMsgs}
                            keyExtractor={item=> item.id.toString()}
                            renderItem={({item})=> {
                                
                                return <ChatMessage id={item.id} msg={item.msg} user={item.user} options={item.options} pending={item.pending} />
                            }}
                        />
                    </Box>
                    
                    <Box
                        paddingX={2}
                        paddingBottom={2}
                        paddingTop={3}
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                        borderTopColor="light.300"
                        borderTopWidth={0.5}
                        _light={{
                            bg:"light.50"
                        }}
                    >
                        <Input w="90%" p={3.5} 
                            _focus={{bg:"light.200"}}
                            onChangeText={setMessageInput}
                            value={messageInput}
                            borderWidth="0"
                            fontSize="md"
                            rounded="full"
                            variant="filled" 
                            bg="muted.100" 
                            placeholder='Enter you message here'/>
                        <IconButton 
                            // disabled={!messageInput}
                            onPress={()=> handleSend(messageInput)}
                            icon={<Icon as={Ionicons} name="ios-send" color="blue.600"/>}
                            _pressed={{

                            }}
                            variant="ghost"
                        />
                    </Box>
            </KeyboardAvoidingView>
        </Box>
        
    )
}

export default ChatScreen