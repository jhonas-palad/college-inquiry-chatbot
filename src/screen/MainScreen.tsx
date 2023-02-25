import { 
  Box, 
  Button, 
  Text, 
  ScrollView, 
  HStack,
  Heading,
  VStack
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import React from 'react'
import {HomeHeader, HistoryCard} from '../components';
import { RowCards } from '../components';
import { getChatHistory, clearAll } from '../api/AsyncStorage';
import uuid from 'react-native-uuid';
import { ChatHistoryContent } from '../context/ChatHistoryProvider';
import { useChatHistory } from '../hooks';
import { ChatHistoryData } from '../context/ChatHistoryProvider';



const MainScreen : React.FC = () => {
    const navigation = useNavigation();
    const [historyData, setHistoryData] = React.useState([]);
    const {chatHistory} = useChatHistory() as ChatHistoryContent;

    
    React.useEffect(()=>{
        navigation.setOptions({
            headerShown: true,
            title: 'Home',
            header: (prop: any ) => {
              return <HomeHeader {...prop}/>
            }  
        })
    }, [navigation]);
    React.useEffect(() => {
      const asyncWrapper = async () => {
        try{
          const data = await getChatHistory();
          setHistoryData(data as never);
          
        }catch(err){
          console.log(err);
        }
      }
      asyncWrapper();
    }, [chatHistory]);
    const handleClearHistory = React.useCallback(() => {
      if(historyData){
        clearAll();
        setHistoryData([]);
      }
    }, []);
  return (
    <ScrollView flex={1} padding={5} _light={{bgColor:"light.50"}}>

      <Box marginBottom={2}>
        <Heading fontSize="2xl" marginBottom={1}>
          College inquiry chatbot for <Text color="red.800">UBLC</Text>
        </Heading>
        <Text marginBottom={1} color="light.500">
          Ask some questions
        </Text>
      </Box>
      <RowCards />
      <Box >
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="xl" fontWeight="bold">History</Text>
          <Button onPress={handleClearHistory} variant="ghost" _pressed={{bg:"none", opacity: 0.5}}><Text fontSize="sm" fontWeight="light">Clear all</Text></Button>
        </HStack>
        <VStack marginBottom={20}>
          {
            historyData.length === 0 ? (
              <Text fontSize="md" fontWeight="light" color="light.500">Click on the Ask Me button or the examples above to get started</Text>
            ) : (
              historyData.map((item : ChatHistoryData)  => {
                
                return <HistoryCard key={uuid.v4().toString()} chatHistory={item}/>
                
              }
                
                )
            )
          }
         
          
        </VStack>
      </Box>

    </ScrollView>
  )
}

export default MainScreen