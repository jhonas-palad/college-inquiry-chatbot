import { Ionicons } from "@expo/vector-icons";

export type ExampleData = {
    id: string;
    msg: string;
    icon: string;
    as: typeof Ionicons;
}

export const exampleData : Array<ExampleData> = [
    {
        id: '1',
        msg: 'Ask me',
        icon: 'add-circle',
        as: Ionicons
    },
    {
        id: '2',
        msg: 'List of all courses offered?',
        icon:'ios-chatbox',
        as: Ionicons
    },
    {
        id: '3',
        msg: 'Schedule of exams?',
        icon:'ios-chatbox',
        as: Ionicons
    },
    {
        id: '4',
        msg: 'What are scholarships offered?',
        icon:'ios-chatbox',
        as: Ionicons
    }
]

