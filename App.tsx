import 'react-native-gesture-handler';
import { RootNavigator } from './src/navigation/RootNavigator';
import {NativeBaseProvider} from 'native-base';
export default function App() {
  return (
    <NativeBaseProvider>
      <RootNavigator/>
    </NativeBaseProvider>
  );
}
