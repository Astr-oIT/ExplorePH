import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyModal = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20 }}>This is the modal screen!</Text>
      <Button
        title="Close Modal"
        onPress={() => navigation.goBack()} // Close the modal
      />
    </View>
  );
};

export default MyModal;
