import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, Callout, Polyline } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '@/assets/styles/Mstyle'; // Adjust the import path as needed

const GOOGLE_MAPS_APIKEY = 'AIzaSyDMFgjPsxA3RupHpp6ND6cyb2ymQm8htbw';

export default function App() {
  const [region, setRegion] = useState({
    latitude: 14.5995,
    longitude: 120.9842,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [marker, setMarker] = useState<{ latitude: number; longitude: number } | null>(null);
  const [placeName, setPlaceName] = useState('');
  const [placeAddress, setPlaceAddress] = useState('');
  const [mapType, setMapType] = useState<'standard' | 'hybrid'>('standard');
  const [travelMode, setTravelMode] = useState<'DRIVING' | 'WALKING' | 'TRANSIT' | 'BICYCLING'>('DRIVING');

  const toggleMapType = () => {
    setMapType((prevMapType) => (prevMapType === 'standard' ? 'hybrid' : 'standard'));
  };

  const handleDirectionsError = (errorMessage: string) => {
    Alert.alert('Error', errorMessage);
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search for a location"
        onPress={(data, details = null) => {
          if (details && details.geometry && details.geometry.location) {
            const location = details.geometry.location;

            setRegion({
              latitude: location.lat,
              longitude: location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });

            setMarker({
              latitude: location.lat,
              longitude: location.lng,
            });

            setPlaceName(details.name || data.description);
            setPlaceAddress(details.formatted_address);
          } else {
            console.error('Failed to get location details');
          }
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        fetchDetails={true}
        styles={{
          container: {
            flex: 0,
            position: 'absolute',
            width: '100%',
            zIndex: 1,
          },
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            marginHorizontal: 10,
            marginTop: 10,
            borderRadius: 5,
          },
          textInput: {
            height: 45,
            color: '#5d5d5d',
            fontSize: 16,
            backgroundColor: '#f5f5f5',
            borderRadius: 20,
            paddingHorizontal: 10,
          },
          listView: {
            backgroundColor: 'white',
            marginHorizontal: 10,
            borderRadius: 5,
            elevation: 1,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
          },
          row: {
            backgroundColor: '#fff',
            padding: 13,
            height: 44,
            flexDirection: 'row',
            alignItems: 'center',
          },
          separator: {
            height: 0.5,
            backgroundColor: '#c8c7cc',
          },
          description: {
            fontWeight: 'bold',
            color: '#3c3c3c',
          },
          poweredContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          },
        }}
      />

      <MapView style={styles.map} region={region} mapType={mapType}>
        {marker && (
          <>
            <Marker coordinate={marker}>
              <Callout>
                <View>
                  <Text style={styles.calloutTitle}>{placeName}</Text>
                  <Text>{placeAddress}</Text>
                </View>
              </Callout>
            </Marker>

            {/* Add directions to the marker */}
            <MapViewDirections
              origin={{ latitude: region.latitude, longitude: region.longitude }}
              destination={marker}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
              mode={travelMode} // Use the selected travel mode
              onError={handleDirectionsError} // Handle errors
            />
          </>
        )}
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleMapType} style={styles.mapToggleButton}>
          <Icon
            name={mapType === 'standard' ? 'layers' : 'satellite-uplink'}
            size={30}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* Travel mode buttons */}
      <View style={styles.travelModeContainer}>
        <TouchableOpacity onPress={() => setTravelMode('DRIVING')} style={styles.travelModeButton}>
          <Icon name="car" size={30} color={travelMode === 'DRIVING' ? 'blue' : 'gray'} />
          <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTravelMode('WALKING')} style={styles.travelModeButton}>
          <Icon name="walk" size={30} color={travelMode === 'WALKING' ? 'blue' : 'gray'} />
          <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTravelMode('TRANSIT')} style={styles.travelModeButton}>
          <Icon name="train" size={30} color={travelMode === 'TRANSIT' ? 'blue' : 'gray'} />
          <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTravelMode('BICYCLING')} style={styles.travelModeButton}>
          <Icon name="bike" size={30} color={travelMode === 'BICYCLING' ? 'blue' : 'gray'} />
          <Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}