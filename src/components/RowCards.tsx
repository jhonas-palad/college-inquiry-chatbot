import React from 'react';
import {Box, Center, Icon, FlatList, Text, Pressable} from 'native-base';
import { exampleData, ExampleData } from '../data/examples';
import { useNavigation } from '@react-navigation/native';


type CardProps = ExampleData;

const CardExample: React.FC<CardProps> = ({id, msg, icon, as}) => {
    const navigation = useNavigation()
    const handleOnPress = React.useCallback((e: any) => {
        navigation.navigate('chat' as never, {msg, type:'new'} as never);
    },[]);
    return (
        <Pressable
            _pressed={{opacity: 0.8}}
            marginY={1.5}
            rounded={12}
            bgColor={id === '1' ? 'amber.500' : "light.200"}
            paddingX={3}
            paddingTop={1}
            paddingBottom={4}
            alignItems="center"
            justifyContent={id === '1' ? 'center' : "flex-start"}
            marginRight={2}
            width={32}
            shadow={1}
            onPress={handleOnPress}
        >
            <Center w="full" marginBottom={2}>
            {
                <>
                    {
                        id !== '1' && (
                            <Text color="light.400" marginBottom={2} fontSize="xs">Example</Text>
                        )
                    }
                    <Icon as={as} name={icon} 
                        color={id === '1' ? 'light.50' : 'darkText'}
                        size={id === '1' ? '2xl' : 'xl'}
                    />
                </>
            }
            </Center>
            <Text fontWeight="semibold"
                color={id === '1' ? 'light.50' : "darkText"}
                w="full"
                fontSize="md" textAlign="center"
                numberOfLines={5}
            >
                {msg}
            </Text>
        </Pressable>
    )
}

const RowCards: React.FC = () => {
    return (
        <Box marginBottom={2}>
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={exampleData}
            keyExtractor={(item)=>item.id}
            renderItem={
                ({item}) => <CardExample {...item}/>
            }
            />
        </Box>
    )
}

export default RowCards
