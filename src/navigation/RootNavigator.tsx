import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen, ChatScreen, SettingsScreen } from '../screen'; 
import React from 'react';
import ChatHistoryProvider from '../context/ChatHistoryProvider';


const Stack = createNativeStackNavigator();

export const RootNavigator:React.FC = () => {
    

    return (
        <ChatHistoryProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="home" component={MainScreen} />
                    <Stack.Screen name="chat" component={ChatScreen} />
                    <Stack.Screen name="settings" component={SettingsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </ChatHistoryProvider>
    )
}