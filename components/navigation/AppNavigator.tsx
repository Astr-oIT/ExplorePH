import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import App from '@/app/(tabs)/index'; // Adjust the import path as needed
import Map from '@/app/(tabs)/Map'; // Adjust the import path as needed
import User from '@/app/(tabs)/user';
import TabBar from '@/components/TabBar'; // Adjust the import path as needed
import { RootStackParamList } from './types'; // Import the types

const Tab = createBottomTabNavigator<RootStackParamList>(); // Use the types here

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen name="index" component={App} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="user" component={User} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;