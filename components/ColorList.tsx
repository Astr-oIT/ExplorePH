import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';

const ColorList = ({ color }: { color: string }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {[0.8, 0.5,].map((opacity, index) => (
        <View
          key={opacity}
          style={[styles.color, { backgroundColor: color, opacity }]}
        >
          {/* <Text style={styles.text}>
            Hello World
          </Text> */}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  color: {
    width: '100%',
    height: 150,
    borderRadius: 25,
    marginBottom: 15,
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: '100%',
  },
  text: {
    color: '#000', // Text color
    fontSize: 16,
  },
});

export default ColorList;
