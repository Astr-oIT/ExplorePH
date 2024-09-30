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
      'https://www.google.com/maps/embed?pb=!4v1727695212449!6m8!1m7!1sCAoSLEFGMVFpcE9YMTdyQlJuSmIzS1dtdEtxcFJKM2J5WVNIeml3cGpmNXdPbUJy!2m2!1d11.15555289623501!2d119.3226868208512!3f170.29740188817544!4f-5.476695696573202!5f0.7820865974627469',
  },
  // {
  //   url: 'https://www.exploreshaw.com/wp-content/uploads/2019/04/DSCF9807.jpg',
  //   title: 'Boracay',
  //   description:
  //     "Boracay is a small island in the central Philippines. It's known for its resorts and beaches. Along the west coast, White Beach is backed by palm trees, bars and restaurants.",
  //   mapUrl:
  //     'https://www.google.com/maps/embed?pb=!4v1726990913107!6m8!1m7!1sCAoSLEFGMVFpcE1oU3M2Y2NWY2I4REF5ZTc4TUhha1BEbjRmVEdNSnE5NWJlNU5q!2m2!1d11.9657752!2d121.9291538!3f66.27500801293891!4f3.1363196316310393!5f0.7820865974627469',
  // },
  // {
  //   url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/578196500.jpg?k=f3d443a970236d522e905e960fced59fe39d43cc9b564ceff2394b92e547789a&o=&hp=1',
  //   title: 'Panglao',
  //   description:
  //     'Panglao is the southernmost town of Bohol. It is one of the 2 towns on Panglao Island, the other being Dauis. It is of historical significance in that it was the place where the Spaniards went after an unfortunate experience in Cebu.',
  //   mapUrl:
  //     'https://www.google.com/maps/embed?pb=!4v1726991048458!6m8!1m7!1sCAoSLEFGMVFpcE95dTE2UFRBU0UwQl9lVmg5VloxRzI1TjBlYUM4NlF6ZHN1VXhX!2m2!1d9.547641435627714!2d123.7512845092921!3f209.68966778365822!4f8.011096571147078!5f0.7820865974627469',
  // },
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
                  style={styles.modalWebView}
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
