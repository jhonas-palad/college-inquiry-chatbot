import {HStack,Box, Text, Button, ScrollView, Pressable, Icon } from 'native-base'
import React from 'react'
import {useNavigation} from '@react-navigation/native';
import { AntDesign, Ionicons  } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

const SettingsScreen: React.FC = () => {
    const navigation = useNavigation();
    React.useEffect(()=>{
        navigation.setOptions({
            presentation: 'modal',
            header: (props: any) => {
                return (
                    <Box flexDirection="row" justifyContent="space-between" alignItems="center" safeAreaTop={8} paddingX={2.5} bg="light.50">
                        <Text fontSize="3xl" fontWeight="bold">More</Text>
                        <Button onPress={()=> props.navigation.goBack()} variant="ghost" _pressed={{bg:"none", opacity: 0.5}}>
                            <Text fontSize="md" fontWeight="bold" color="blue.600">Done</Text>
                        </Button>
                    </Box>
                )
            }
        })
    }, []);
    //For future use
    const handleGotoLink = React.useCallback((url: string) => {
        Linking.openURL(url);
    },[]);

    type PressableContent = {
        rightText: string | JSX.Element,
        leftText: string | JSX.Element,
        iconRight: JSX.Element,
        url?: string

    }
    const singlePressable = ( first :  PressableContent) => {
        return (
            <Pressable
                onPress={()=> first?.url && handleGotoLink(first.url)}
                rounded={10}
                padding={3.5}
                bg="muted.200"
                flexDir="row"
                justifyContent="space-between"
                alignItems="center">
                <HStack alignItems="center">
                    {first.iconRight}
                    <Text marginLeft={2}>{first.rightText}</Text>
                </HStack>
                <Text>{first.leftText}</Text>
                
            </Pressable>
        )
    }
    
    const doublePressable = ( first : PressableContent, second : PressableContent) => {
        return (
            <>
                <Pressable
                    onPress={()=> first?.url && handleGotoLink(first.url)}
                    roundedTop={10}
                    padding={3.5}
                    bg="muted.200"
                    flexDir="row"
                    justifyContent="space-between"
                    alignItems="center"
                    >
                    <HStack alignItems="center">
                    {first.iconRight}
                    <Text marginLeft={2}>{first.rightText}</Text>
                    </HStack>
                    <Text>{first.leftText}</Text>
                    
                </Pressable>
                <Pressable
                    onPress={()=> second?.url && handleGotoLink(second.url)}
                    roundedBottom={10}
                    borderTopColor="light.300"
                    borderTopWidth={1}
                    padding={3.5}
                    bg="muted.200"
                    flexDir="row"
                    justifyContent="space-between"
                    alignItems="center"
                    >
                    <HStack alignItems="center">
                    {second.iconRight}
                    <Text marginLeft={2}>{second.rightText}</Text>
                    </HStack>
                    <Text>{second.leftText}</Text>
                    
                </Pressable>
            </>
        )
    }
    return (
    
        <ScrollView flex={1} bg="light.50" padding={5}>
            {
                singlePressable({
                    rightText: "Me",
                    leftText: "Link",
                    iconRight: <Icon as={AntDesign} color="violet.800" name="github"/>,
                    url: 'https://github.com/jhonas-palad'
                }
                )
            }
            <Box>
                <Text fontSize="md" fontWeight="bold" color="">Other apps</Text>
                {
                    doublePressable({
                        rightText: "API",
                        leftText: "Link",
                        iconRight: <Icon as={Ionicons } color="orange.600" name="ios-reader-outline"/>,
                        url: 'https://chatbotapi.site/docs'
                    }, {
                        rightText: "Admin",
                        leftText: "Link",
                        iconRight: <Icon as={Ionicons} color="green.800" name="ios-body-outline"/>,
                        url: 'https://chatbotadmin.site'
                    }
                    
                    )
                }
            </Box>
            
        </ScrollView>
      
    )
}

export default SettingsScreen