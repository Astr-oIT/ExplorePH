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
import { WebView } from 'react-native-webview'; // Import WebView
import styles from '../assets/styles/Hstyle';

// Updated images array with Google Maps embed URLs
const images = [
  {
    url: 'https://www.vacationhive.com/images/hives/2/2-el-nido-gallery-img3.jpg',
    title: 'El Nido, Palawan',
    description:
      'El Nido is a Philippine municipality on Palawan island. It’s known for white-sand beaches, coral reefs and as the gateway to the Bacuit archipelago, a group of islands with steep karst cliffs.',
    mapUrl:
      'https://maps.google.com/?q=El+Nido,+Palawan',
  },
  // Add more images as needed
];

const ImageSlider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();

  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
    description: string;
    mapUrl?: string; // Optional field for Google Maps embed URL
  } | null>(null); // State for selected image object

  // Function to open modal with the selected image's details
  const openModal = (image: { url: string; title: string; description: string; mapUrl?: string }) => {
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
                  {image.title} <AntDesign name="star" size={15} color="yellow" />
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
            <TouchableOpacity onPress={closeModal} style={styles.closeButtonSlider}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            
            {/* Display title and description in the modal */}
            {selectedImage && (
              <View style={styles.modalContentSlider}>
                <Text style={styles.modalTitle}>{selectedImage.title}</Text>
                <Text style={styles.modalDescription}>{selectedImage.description}</Text>

                {selectedImage.mapUrl ? (
                  <>
                    {console.log('Loading WebView with URL:', selectedImage.mapUrl)}
                    <WebView
                      source={{ uri: selectedImage.mapUrl }}
                      style={{ width: '100%', height: 300 }}
                      javaScriptEnabled={true}
                      domStorageEnabled={true}
                      onError={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent;
                        console.warn('WebView error: ', nativeEvent);
                      }}
                      onLoadStart={() => console.log('WebView started loading')}
                      onLoadEnd={() => console.log('WebView finished loading')}
                    />
                  </>
                ) : (
                  <Text>No Map Available</Text>
                )}
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ImageSlider;