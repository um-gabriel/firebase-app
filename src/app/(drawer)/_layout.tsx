import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen 
            name="(tabs)"
        />
        <Drawer.Screen 
            name="home"
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}