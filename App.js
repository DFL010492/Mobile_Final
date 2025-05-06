import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import styles from './AppStyle.js';
import DashboardScreen from './src/screens/dashboard.js';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <DashboardScreen />
    </View>
  );
}
