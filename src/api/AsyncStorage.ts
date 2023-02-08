import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import type { ChatMessageParams } from '../data';
import type { ChatHistoryData } from '../context/ChatHistoryProvider';
//@Ketty:chat_history:${id} : {date: 100, value}


// interface ChatData  { 
//   [id : string]: ChatHistoryData
// }


export const storeChatHistory = async (messages : ChatMessageParams[]) => {
    try {
        const date = new Date();
        const id = uuid.v4().toString();
        const data : ChatHistoryData = {id, date, messages};
        const prevData = await getChatHistory() || [];
        prevData.push(data);
        const jsonValue = JSON.stringify(prevData);
        await AsyncStorage.setItem(`@Ketty:chat_history`, jsonValue);
        return data;
    } catch (err) {
        console.log(err);
    }
}


export const getChatHistory = async (id: string = '') => {
    try {
      const prevData = await AsyncStorage.getItem(`@Ketty:chat_history`)
      const jsonValue = prevData != null ? JSON.parse(prevData) : [];
      if(id && jsonValue) {
        return jsonValue.filter((value : ChatHistoryData) => value.id === id)[0];
      } 

      //Sort
      if(jsonValue){
        jsonValue.sort((a : ChatHistoryData, b : ChatHistoryData) =>{
          if(a.date > b.date) {
            return -1;
          }
          if(a.date < b.date){
            return 1;
          }
          return 0;
        })  
      }
      return jsonValue;
    } catch(err) {
      console.log(err);
    }
}

export const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }