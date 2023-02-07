import uuid from 'react-native-uuid';
export type User = {
    id: string | number[],
    name: string
}

export const createUser = (id : string | number[], name : string) : User =>({id, name});

export const currentUser = createUser(uuid.v4(), 'Me');
export const chatBotUser = createUser(uuid.v4(), 'Ketty');