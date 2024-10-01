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
const images = [

  {
    url: 'https://i.pinimg.com/originals/be/aa/60/beaa600f32c00584682a24730525a5d4.gif',
    title: 'Boracay',
    description:
      "Boracay is a small island in the central Philippines. It's known for its resorts and beaches. Along the west coast, White Beach is backed by palm trees, bars and restaurants.",
    location: {
      latitude: 11.9674,
      longitude: 121.9248,
    },
  },
  {
    url: 'https://www.vacationhive.com/images/hives/2/2-el-nido-gallery-img3.jpg',
    title: 'El Nido, Palawan',
    description:
      'El Nido is a Philippine municipality on Palawan island. It’s known for white-sand beaches, coral reefs and as the gateway to the Bacuit archipelago, a group of islands with steep karst cliffs.',
    location: {
      latitude: 11.1784,
      longitude: 119.3913,
    },
  },
  {
    url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/578196500.jpg?k=f3d443a970236d522e905e960fced59fe39d43cc9b564ceff2394b92e547789a&o=&hp=1',
    title: 'Panglao',
    description:
      'Panglao is the southernmost town of Bohol. It is one of the 2 towns on Panglao Island, the other being Dauis. It is of historical significance in that it was the place where the Spaniards went after an unfortunate experience in Cebu.',
    location: {
      latitude: 9.5869,
      longitude: 123.7754,
    },
  },
];

const ImageSlider = () => {
  const navigation = useNavigation();
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
            <TouchableOpacity onPress={closeModal} style={styles.closeButtonSlider}>
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
                  <TouchableOpacity style={styles.button} onPress={() => {}}>
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