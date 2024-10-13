import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  Animated,
  useWindowDimensions,   
  TouchableOpacity,
  Modal,
  ImageBackground,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps'; // Import MapView and Marker
import styles from '../assets/styles/Hstyle';
import { useNavigation } from '@react-navigation/native';
import { images } from '../constants/index';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../components/navigation/types';

type ImageSliderNavigationProp = StackNavigationProp<RootStackParamList, 'index'>;

const ImageSlider = () => {
  const navigation = useNavigation<ImageSliderNavigationProp>();
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();

  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
    description: string;
    location: { latitude: number; longitude: number };
  } | null>(null); // State for selected image object

  // Function to open modal with the selected image's details
  const openModal = (image: { url: string; title: string; description: string; location: { latitude: number; longitude: number; } }) => {
    setSelectedImage(image); // Store the full image object
    setModalVisible(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <View style={styles.scrollContainer}>
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={1}
      >
        {images.map((image, imageIndex) => (
          <TouchableOpacity
            key={imageIndex}
            style={{ width: windowWidth }}
            onPress={() => openModal(image)} // Open modal with the full image object
          >
            <ImageBackground source={{ uri: image.url }} style={styles.card}>
              <View style={styles.textContainer}>
                <Text style={styles.infoText}>
                  {image.title} <AntDesign name="star" size={15} color="#E4D00A" />
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.indicatorContainer}>
        {images.map((_, imageIndex) => {
          const width = scrollX.interpolate({
            inputRange: [
              windowWidth * (imageIndex - 1),
              windowWidth * imageIndex,
              windowWidth * (imageIndex + 1),
            ],
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });
          return <Animated.View key={imageIndex} style={[styles.normalDot, { width }]} />;
        })}
      </View>

      {/* Modal to display the selected image's title, description, and map */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalBgSlider}>
          <View style={styles.modalCSlider}>
            <TouchableOpacity 
              onPress={closeModal} 
              onPressIn={closeModal} 
              style={styles.closeButtonSlider}
            >
              <Text style={styles.closeButtonText}>____</Text>
            </TouchableOpacity>
            
            {/* Display title and description in the modal */}
            {selectedImage && (
              <View style={styles.modalContentSlider}>
                <Text style={styles.modalTitle}>{selectedImage.title}</Text>
                <Text style={styles.modalDescription}>{selectedImage.description}</Text>

                {/* Map displaying the location */}
                <MapView
                  style={styles.modalMap}
                  initialRegion={{
                    latitude: selectedImage.location.latitude,
                    longitude: selectedImage.location.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                  }}
                  mapType="satellite"
                >
                  <Marker
                    coordinate={{
                      latitude: selectedImage.location.latitude,
                      longitude: selectedImage.location.longitude,
                    }}
                    title={selectedImage.title}
                  />
                </MapView>

                {/* Buttons below the map */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={() => {/* Handle 'More' button press */}}>
                    <Text style={styles.buttonText}>More</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => {
                      navigation.navigate('Map', { searchTitle: selectedImage.title });
                      closeModal();
                    }}
                  >
                    <Text style={styles.buttonText}>Show in Map</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ImageSlider;