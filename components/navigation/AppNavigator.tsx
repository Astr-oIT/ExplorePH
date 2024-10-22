import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import App from '@/app/(tabs)/index'; // Adjust the import path as needed
import Map from '@/app/(tabs)/Map'; // Adjust the import path as needed
import User from '@/app/(tabs)/user';
import GoogleMap from '@/components/googleMap'; // Ensure the import matches the component name
import TabBar from '@/components/TabBar'; // Adjust the import path as needed
import { RootStackParamList } from './types'; // Import the types

const Tab = createBottomTabNavigator<RootStackParamList>(); // Use the types here
const Stack = createStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
     
      <Stack.Screen name="GoogleMap" component={GoogleMap} />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="index" component={App} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="user" component={User} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;