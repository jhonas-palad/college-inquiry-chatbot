import React from 'react'
import {ChatMessageParams} from '../data';

export type ChatHistoryData = { 
    id: string,
    date: Date,
    messages: ChatMessageParams[]
  }
export type ChatHistoryContent = {
    chatHistory : ChatHistoryData,
    setChatHistory: (arr: ChatHistoryData) => void
}
export const ChatHistoryContext = React.createContext({});

type Props = {
    children: React.ReactNode;
}

const ChatHistoryProvider :  React.FC<Props> = ({children}) => {
    const [ chatHistory, setChatHistory] = React.useState([]);
    return (
        <ChatHistoryContext.Provider value={{chatHistory, setChatHistory}}>
            {children}
        </ChatHistoryContext.Provider>
    )
}

export default ChatHistoryProvider