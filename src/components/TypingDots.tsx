import {Box, Text } from 'native-base';
import { Animated } from 'react-native'
import React from 'react'

const TypingDots = () => {
  return (
    <Box
        width={'10'}
        height={'10'}
        rounded="full"
        bgColor="muted.800"
    >
      <Text></Text>
    </Box>
  )
}

type Props = {
    delay: number,
    children: any
}

const AnimatedWrapper: React.FC<Props> = ({delay, children}) => {
    const timing = React.useRef(new Animated.Value(0)).current;
    React.useEffect(()=> {
        const animation = Animated.sequence([
            Animated.delay(delay),
            Animated.loop(Animated.timing(timing, {toValue: 1, duration: 987, useNativeDriver: true}))
        ]);
        animation.start();
        return () => {
            animation.stop();
        }
    }, []);

    const opacity = timing.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.2, 1, 0.2]
    })
    return (
        <Animated.View
            style={
                {
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 18,
                    opacity
                }
            }>
            {children}
        </Animated.View>
    )

}

function ChatTyping () {
    const delayValues = [0, 300, 600]
    return (
        <>
            <Box style={}>
                <Box style={{ flexDirection: 'row' }}>
                    {delayValues.map((delay) => (
                        <AnimatedWrapper key={delay} {...{ delay }}>
                            <TypingDots/>
                        </AnimatedWrapper>
                    ))}
                </Box>
            </Box>
        </>

    )
}
export default TypingDots