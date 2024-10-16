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
import { useNavigation } from '@react-navigation/native';
import { images } from '../constants/index';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigation/types';

type ImageSliderNavigationProp = StackNavigationProp<RootStackParamList, 'index'>;

const ImageSlider = () => {
  const [firstModalVisible, setFirstModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] =  useState<{
    url: string;
    title: string;
    description: string;
    location: { mapUrl: string };
  } | null>(null);

 
  const navigation = useNavigation<ImageSliderNavigationProp>();
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();

  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
    description: string;
    location: { mapUrl: string };
  } | null>(null); // State for selected image object

  const toggleFirstModal = (image: { url: string; title: string; description: string; location: { mapUrl: string; } }) => {
    setSelectedImage(image);
    setFirstModalVisible(!firstModalVisible);
  };

  const openSecondModal = (image: { url: string; title: string; description: string; location: { mapUrl: string; } }) => {
      setFirstModalVisible(false);
      setSecondModalVisible(image);
  };

  const closeSecondModal = () => {
      setSecondModalVisible(null);
  };


  // Function to close modal
  const closeModal = () => {
    setFirstModalVisible(!firstModalVisible);
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
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
            onPress={() => toggleFirstModal(image)} // Open modal with the full image object
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
        visible={firstModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContentSlider}>
          <View style={styles.modalBody}>
            <TouchableOpacity 
              onPress={closeModal} 
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>______</Text>
            </TouchableOpacity>
            
            {/* Display title and description in the modal */}
            {selectedImage && (
              <View>
                <Text style={styles.modalTitle}>{selectedImage.title}</Text>
                <Text style={styles.modalDescription}>{selectedImage.description}</Text>


                {/* WebView displaying the Google Maps iframe */}
                
                    {/* Buttons below the map */}
                    <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button}  onPress={() => openSecondModal(selectedImage)} >
                    <Text style={styles.buttonText}>View</Text>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={secondModalVisible !== null}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>This is the modal content</Text>
          <TouchableOpacity onPress={closeSecondModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <View style={{ width: '100%', height: '100%', backgroundColor: 'blue' }}>
                  {selectedImage && (
                    <WebView
                      style={{ flex: 1 }} // Ensure the WebView takes up the full space of its container
                      originWhitelist={['*']}
                      javaScriptEnabled={true} // Enable JavaScript
                      onError={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent;
                        console.warn('WebView error: ', nativeEvent);
                      }}
                      onLoadStart={() => console.log('WebView loading started')}
                      onLoadEnd={() => console.log('WebView loading finished')}
                      source={{
                        html: `
                          <!DOCTYPE html>
                          <html>
                            <body style="margin:0;padding:0;">
                              <iframe 
                                src="${selectedImage.location.mapUrl}" 
                                width="100%" 
                                height="2000" 
                                style="border:20;" 
                                allowfullscreen="" 
                                loading="lazy" 
                                referrerpolicy="no-referrer-when-downgrade">
                              </iframe>
                            </body>
                          </html>
                        `,
                      }}
                    />
                  )}
                </View>
        </View>
      </Modal>
    </View>
  );
};

export default ImageSlider;