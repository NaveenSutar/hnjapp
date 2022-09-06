/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

LogBox.ignoreLogs(['EventEmitter.removeListener']);
LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

AppRegistry.registerComponent(appName, () => App);

// TODO: Add Proguard rules for react-native-reanimated
