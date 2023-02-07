import { HStack, Box, Button, Text, IconButton, Icon, VStack } from 'native-base'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import { ChatMessageParams, currentUser, chatBotUser, User, Option } from '../data';
import { TypingAnimation } from "react-native-typing-animation";
import { background } from 'native-base/lib/typescript/theme/styled-system';

const isSameUser = (user: User, userAgainst: User) => {
    return JSON.stringify(user) === JSON.stringify(userAgainst);
}
const sleep = (ms:number) =>
  new Promise(resolve => setTimeout(resolve, ms));


interface ChatMessageProps extends ChatMessageParams {
    onSend: Function
}
const ChatMessage:React.FC<ChatMessageProps> = ({id, msg, user, options, onSend}) => {
    const [optionState, setOptionState] = React.useState(options);
    const position = isSameUser(user, chatBotUser) ? "left" : "right";
    const [isPending, setIsPending] = React.useState<boolean>(true);
    React.useEffect(()=>{
        if(position === "left"){
            sleep(2000).then(()=>{
                setIsPending(false)
            })
        }
    }, []);

    const handleOptionPress = ({title, value} : Option) => {
        //Render to the chatscreen
        onSend(title, currentUser);
        onSend(value, chatBotUser);
        setOptionState([]);
    }
    return (

            <VStack
                marginY={1}
                maxW="75%"
                alignSelf={position === "left" ? "flex-start" : "flex-end"}
            >
                {
                    isPending && position==='left' ? (
                        <Box padding={3} bgColor="muted.300">

                            <TypingAnimation dotMargin={6}/>
                        </Box>
                    ) : (
                        <>
                            <HStack>
                                <Box bg={position === "left" ? "muted.200" : "blue.600"} 
                                    p={2.5} rounded={16}>
                                    <Text textAlign="left" color={position === "left" ? "darkText" : "white"} fontSize="lg">
                                        {msg}
                                    </Text>
                                </Box>
                                {
                                    position === 'left' && (
                                        <IconButton 
                                            icon={<Icon as={Ionicons} name="copy-outline" color="light.800"/>}
                                            _pressed={{
                                                bg:"none",
                                                opacity: 0.6
                                            }}
                                        />
                                    )
                                }
                            </HStack>
                            {
                                position === 'left' && optionState && (
                                    <HStack w="full" flexWrap="wrap">
                                        {
                                            optionState.map((item : Option) => <Button onPress={() => handleOptionPress(item)}bg="amber.500" padding={2} rounded={10} marginY={1} marginRight={1} key={uuid.v4().toString()}>{item.title}</Button>)
                                        }
                                    </HStack>
                                )
                            }
                        </>
                    )
                }
            </VStack>
            

    )
}

export default ChatMessage