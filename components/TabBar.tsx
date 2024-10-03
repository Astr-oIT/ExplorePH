import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'; 
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const primaryColor = '#0891b2';
  const greyColor = '#808080';
  const skyBlue = '#87CEEB'; 

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        if (['_sitemap', '+not-found'].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName;
        let IconComponent: React.ComponentType<any> & { glyphMap?: Record<string, any> } = Entypo;

        if (route.name === 'index') {
          iconName = 'home';
          IconComponent = Entypo;
        } else if (route.name === 'Map') {
          iconName = 'map';
          IconComponent = Entypo;
        } else if (route.name === 'user') {
          iconName = 'category';
          IconComponent = MaterialIcons;
        }

       
        const isMapTab = route.name === 'Map';

        return (
          <TouchableOpacity
            key={route.name}
            style={[
              styles.tabbarItem,
              isMapTab && styles.mapTabContainer2, 
              isFocused && isMapTab && styles.mapTabContainer, // Circle background for focused map tab
            ]}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <View style={[isFocused && isMapTab && styles.mapCircle]}>
              <IconComponent
                name={iconName as keyof typeof IconComponent.glyphMap}
                size={isFocused ? 30 : 24} // Increase size when focused
                color={isFocused ? primaryColor : greyColor}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFBE6',
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#0891b2',
    shadowOffset: { width: 50, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  // Special style to move the map icon up
  mapTabContainer: {
    position: 'absolute',
    justifyContent: 'center',
    color: '#808080',
    left: '42%', 
    top: -20, // Moves the map icon slightly above the tab bar
  },
  mapTabContainer2: {
    width: 60,
    position: 'absolute',
    justifyContent: 'center',
    color: 'black',
    left: '42%', 
    
    
  },
  // Circle background for the focused map tab
  mapFocused: {
    backgroundColor: 'transparent', // Prevent default button background
  },
  // Circle around the focused map icon
  mapCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    color: '#FEF9D9',
    backgroundColor: '#FEF9D9', // Sky blue background
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabBar;