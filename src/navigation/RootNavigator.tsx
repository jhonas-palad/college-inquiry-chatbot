import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen, ChatScreen } from '../screen'; 
import { ChatHeader } from '../components';
import React from 'react';


const Stack = createNativeStackNavigator();

export const RootNavigator:React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="home" component={MainScreen} />
                <Stack.Screen name="chat" component={ChatScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}