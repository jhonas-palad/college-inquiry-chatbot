import uuid from 'react-native-uuid';
import { User } from './user';

type MessageProps = {
    id: string | number[];
    msg: string;
    position: "left" | "right";
};


export const messages : Array<MessageProps> = [
    {
        id: uuid.v4(),
        msg: "Hello There",
        position: "right"
    },
    {
        id: uuid.v4(),
        msg: "Oh hi, please ask me some questions",
        position: "left"
    },
    {
        id: uuid.v4(),
        msg: "How are you?",
        position: "right"
    },
    {
        id: uuid.v4(),
        msg: "I'm fine, and you?",
        position: "left"
    },
    {
        id: uuid.v4(),
        msg: "How are you?",
        position: "right"
    },
    {
        id: uuid.v4(),
        msg: "I'm fine, and you?",
        position: "left"
    },
    {
        id: uuid.v4(),
        msg: "How are you?",
        position: "right"
    },
    {
        id: uuid.v4(),
        msg: "I'm fine, and you?",
        position: "left"
    },
    {
        id: uuid.v4(),
        msg: "How are you?",
        position: "right"
    },
    {
        id: uuid.v4(),
        msg: "I'm fine, and you?",
        position: "left"
    },
    {
        id: uuid.v4(),
        msg: "How are you?",
        position: "right"
    },
    {
        id: uuid.v4(),
        msg: "I'm fine, and you?",
        position: "left"
    },
    {
        id: uuid.v4(),
        msg: "How are you?",
        position: "right"
    },
    {
        id: uuid.v4(),
        msg: "I'm fine, and you?",
        position: "left"
    },
    {
        id: uuid.v4(),
        msg: "How are you?",
        position: "right"
    },
    {
        id: uuid.v4(),
        msg: "I'm fine, and you?",
        position: "left"
    },
];


export type Option = {
    title: string,
    value: string,
}


export type ChatMessageParams = {
    id: string | number[],
    msg: string,
    user : User,
    options : Array<Option>,
    pending ?: boolean
}

export const makeChatMessage = (msg: string, user: User, options ?: any) : ChatMessageParams => {
    let cleanOpts : Array<Option> = [];
    let optKeys = Object.keys(options);
    if( optKeys.length !== 0){
        
        cleanOpts = optKeys.map((key: string)=> ({title:key, value: options[key].text}));
        console.log(cleanOpts);
    }
    
    return {
        id : uuid.v4(),
        msg,
        user,
        options : cleanOpts
    }
}