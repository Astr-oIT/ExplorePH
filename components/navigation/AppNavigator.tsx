import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import App from '@/app/(tabs)/index'; // Adjust the import path as needed
import Map from '@/app/(tabs)/map'; // Adjust the import path as needed
import User from '@/app/(tabs)/user';
import TabBar from '@/components/TabBar'; // Adjust the import path as needed

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen name="index" component={App} />
        <Tab.Screen name="map" component={Map} />
        <Tab.Screen name="user" component={User} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;