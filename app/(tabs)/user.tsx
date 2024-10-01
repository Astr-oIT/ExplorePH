import { View, Text, Button, useColorScheme, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import ImgGallery from '@/components/ImgGallery';
import styles from '@/assets/styles/Hstyle';

const User = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
    
    >
    
      
      <ImgGallery />


    </ScrollView>
    </SafeAreaView>
  );
};

export default User;