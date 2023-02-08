import React from 'react';
import { ChatHistoryContext, ChatHistoryContent } from '../context/ChatHistoryProvider';


export const useChatHistory = () : ChatHistoryContent | {} => {
    return React.useContext(ChatHistoryContext);
}
