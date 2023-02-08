import uuid from 'react-native-uuid';
export type User = {
    id: number,
    name: string
}

export const createUser = (id : number, name : string) : User =>({id, name});

export const currentUser = createUser(1, 'Me');
export const chatBotUser = createUser(99, 'Ketty');