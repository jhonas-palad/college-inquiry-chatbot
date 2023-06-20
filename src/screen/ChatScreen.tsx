import { Box, Input, KeyboardAvoidingView, IconButton, Icon, FlatList, Text, Badge, HStack, Pressable} from 'native-base'
import {Platform} from 'react-native'
import React from 'react'
import { RootStackParamList } from '../navigation';
import { useRoute, useNavigation, RouteProp  } from '@react-navigation/native';
import { ChatHeader, ChatMessage } from '../components';
import { makeChatMessage, chatBotUser, currentUser, ChatMessageParams, User } from '../data';
import { Ionicons } from '@expo/vector-icons';
import { getChatHistory } from '../api/AsyncStorage';
import { useSocket } from '../hooks';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'chat'>;


const ChatScreen: React.FC = () => {
    const route = useRoute<ChatScreenRouteProp>();
    const initialMsg = React.useRef(route.params.msg === 'Ask me' ? '' : route.params.msg).current;
    const navigation = useNavigation();
    const ws: WebSocket | null = useSocket();
    const [chatMsgs, setChatMsgs] = React.useState<Array<ChatMessageParams>>([]);
    const [messageInput, setMessageInput] = React.useState(initialMsg as string);
    const [isViewOnly, setIsViewOnly] = React.useState(false);
    const [connecting, setConnecting] = React.useState(false);
    const [connectionState, setConnectionState] = React.useState({
        msg: '',
        showErr: false,
        connected: false,
    });
    const [disableSend, setDisableSend] = React.useState(false);
    const flatlistRef = React.useRef();
    // console.log(route);
    React.useEffect(()=>{
        navigation.setOptions({
            headerShown: true,
            title: 'Home',
            header: (opts: any) => {
              return <ChatHeader chatMsgs={chatMsgs} {...opts}/>
            }
        })
    }, [chatMsgs]);
    React.useEffect(()=>{
      if(!messageInput || !ws){
        setDisableSend(true)
      }else{
        setDisableSend(false)
      }
    }, [ws, messageInput])
    React.useEffect(()=>{
      setConnecting(true);
        if(ws){
            setConnecting(false);
            ws.onopen = ()=>{
                setConnectionState((prev)=> ({...prev, connected: true}));
            }
            ws.onmessage = ({data}: MessageEvent) => {
                //Bot response
                const responseData = JSON.parse(data);
                const {text, options} = responseData;
                
                // const botReply = makeChatMessage(text, chatBotUser, options ?? {});
                // setChatMsgs(prevMsgs => [...prevMsgs, botReply]);
                handleAppendMsg(text, chatBotUser, options);
                
            }
            ws.onclose = (e: CloseEvent) => {
            }
            ws.onerror = (event: Event) => {
                console.log(event);
                setConnectionState((prev) => ({...prev, msg: 'An error occured', showErr:true}));
            }
        }
        return ()=> {
            console.log("close");
        }
    },[ws]);

    const loadChatHistory = async (id : string) => {
        try{
            const {messages} = await getChatHistory(id);
            setChatMsgs(messages);
        }
        catch(err){
            console.log(err);
        }
    }
    React.useEffect(()=>{
        const {params} = route;
        if(params?.chatHistoryId){
            loadChatHistory(params.chatHistoryId);
            setIsViewOnly(true);
        }
    }, [route]);

    const handleAppendMsg = React.useCallback((message: string, user: User, options : any) => {
        const chatMsg = makeChatMessage(message, user, options);
        setChatMsgs(prevMsgs => [...prevMsgs, chatMsg]);
    },[chatMsgs]);
    
    const handleSend = React.useCallback((message: string, user: User) => {
        if(!message) return;
        
        try{
            ws?.send(message);
            handleAppendMsg(message, user, {});
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
                    <Box  flex={1}>
                        <FlatList
                            ref={flatlistRef}
                            paddingX={3}
                            flex={1}
                            _light={{
                                bg:"light.50"
                            }}
                            data={chatMsgs}
                            keyExtractor={item=> item.id.toString()}
                            renderItem={({item})=> {
                                
                                return <ChatMessage noDelay={isViewOnly} onSend={handleAppendMsg} id={item.id} msg={item.msg} user={item.user} options={item.options} pending={item.pending} />
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
                        {
                            isViewOnly ? (
                                // <Pressable rounded={8} overflow="hidden" borderWidth="1" borderColor="coolGray.300" bg="blue.600" p="1.5">
                                //     <HStack>
                                //         <Text color="light.50">Share</Text>
                                //     </HStack>
                                // </Pressable>
                                <Text>
                                    View only
                                </Text>
                            ) : (
                                <>
                                    <Input w="90%" p={3.5} 
                                        isDisabled={connectionState.connected}
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
                                        style={disableSend ? 
                                            {
                                                opacity: 0.5
                                            } : {
                                                opacity: 1
                                            }}
                                        disabled={disableSend}
                                        onPress={()=> handleSend(messageInput, currentUser)}
                                        icon={<Icon as={Ionicons} name="ios-send" color="blue.600"/>}
                                        _pressed={{
                                            bg:"none",
                                            opacity: 0.5
                                        }}
                                        variant="ghost"
                                    />
                                </>
                            )
                        }
                    </Box>
                    {
                      connecting ? (
                        <Box background='blue.600' position="absolute" top={0} width='full' height="50" alignItems='center' justifyContent='center'>
                          <Text color='muted.100' fontWeight='bold' fontSize='md'>
                            Connecting
                          </Text>
                        </Box>
                      ) : <></>
                    }
            </KeyboardAvoidingView>
        </Box>
        
    )
}

export default ChatScreen