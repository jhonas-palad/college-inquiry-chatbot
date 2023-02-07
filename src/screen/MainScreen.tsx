import { 
  Box, 
  Text, 
  ScrollView, 
  HStack,
  Center, 
  FlatList,
  Heading,
  Icon,
  VStack
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import React from 'react'
import HomeHeader from '../components/HomeHeader';
import { AntDesign } from '@expo/vector-icons';
import { RowCards } from '../components';

const MainScreen : React.FC = () => {
    const navigation = useNavigation();
    React.useEffect(()=>{
        navigation.setOptions({
            headerShown: true,
            title: 'Home',
            header: ({navigation, route, options, back ,progress}: any ) => {
              return <HomeHeader/>
            }  
        })
    }, []);
    
  return (
    <ScrollView flex={1} padding={5} _light={{bgColor:"light.50"}}>

      <Box marginBottom={2}>
        <Heading fontSize="2xl" marginBottom={1}>
          Hi, my name is <Text color="red.800">Ketty</Text>
        </Heading>
        <Text marginBottom={1} color="light.500">
          Ask some questions
        </Text>
      </Box>
      <RowCards />
      <Box >
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="xl" fontWeight="bold">History</Text>
          <Text fontSize="sm" fontWeight="light">View all</Text>
        </HStack>
        <VStack>
          <HStack
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
              <Heading fontSize="md">Hello</Heading>
              <Text fontSize="md" numberOfLines={1}>Oh hello there</Text>
            </Box>
          </HStack>
          <HStack
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
              <Heading fontSize="md">Hello</Heading>
              <Text fontSize="md" numberOfLines={1}>Oh hello there</Text>
            </Box>
          </HStack>
          <HStack
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
              <Heading fontSize="md">Hello</Heading>
              <Text fontSize="md" numberOfLines={1}>Oh hello there</Text>
            </Box>
          </HStack>
            
        </VStack>
      </Box>

    </ScrollView>
  )
}

export default MainScreen