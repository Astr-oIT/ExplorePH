import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  RefreshControl,
  useColorScheme,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../../assets/styles/Hstyle';
import ImageSlider from '../../components/ImageSlider';
import ImageSlider2 from '../../components/ImageSlider2';
import TopDestination from '@/components/TopDestination';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const colorScheme = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ImageSlider />
        <View style={styles.gridRowD}>
          <TouchableOpacity style={styles.gridBoxss} onPress={() => navigation.navigate('Map' as never)}>
            <Ionicons name="walk" size={29} color="#FEF9D9" />
            <Text style={styles.TextD}>Walk</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridBoxss} onPress={() => navigation.navigate('Map' as never)}>
            <MaterialCommunityIcons name="bike" size={29} color="#FEF9D9" />
            <Text style={styles.TextD}>Bike</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridBoxss} onPress={() => navigation.navigate('Map' as never)}>
            <FontAwesome name="car" size={24} color="#FEF9D9" />
            <Text style={styles.TextD}>Car</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridBoxss} onPress={() => navigation.navigate('Map' as never)}>
            <MaterialCommunityIcons name="train" size={27} color="#FEF9D9" />
            <Text style={styles.TextD}>Train</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.Texts, { color: colorScheme === 'dark' ? 'black' : 'black' }]}>
          Top Destination
        </Text>
        <TopDestination />
        {/* <ImageSlider2 /> */}
        <View style={styles.gridContainer}>
          {/* Use ImgGallery here */}
          {/* <ImgGallery /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;