import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet } from 'react-native';
import TabBar from '@/components/TabBar';

// Create the Drawer Navigator
const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }: {navigation: any}) => (
  <Tabs tabBar={props => <TabBar {...props} />}>
    <Tabs.Screen
      name="index"
      options={{
        title: '',
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons style={styles.drawerI} name="menu" size={24} />
          </TouchableOpacity>
        ),
        headerLeft: () => null, // Remove the default left drawer icon
        headerStyle: { backgroundColor: '#8EACCD' }, // Set the background color of the header
        headerTintColor: '#000', // Set the title text color (optional)
      }}
    />
    <Tabs.Screen
      name="Map"
      options={{
        title: '',
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons style={styles.drawerI} name="menu" size={24} />
          </TouchableOpacity>
        ),
        headerLeft: () => null,
        headerStyle: { backgroundColor: '#8EACCD' }, // Set the background color of the header
        headerTintColor: '#000',
      }}
    />
    <Tabs.Screen
      name="user"
      options={{
        title: '',
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons style={styles.drawerI} name="menu" size={24} />
          </TouchableOpacity>
        ),
        headerLeft: () => null,
        headerStyle: { backgroundColor: '#8EACCD' }, // Set the background color of the header
        headerTintColor: '#000',
      }}
    />
  </Tabs>
);

const DrawerLayout = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false, // Disable the default drawer header
      }}
    >
      <Drawer.Screen
        name="Home"
        component={CustomDrawerContent}
      />
      <Drawer.Screen
        name="Setting"
        component={CustomDrawerContent}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerI: {
    marginRight: 15,
    fontSize: 35,
  }
});

export default DrawerLayout;
