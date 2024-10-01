import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HelloWave } from './HelloWave';

const ImgGallery = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredImages, setFilteredImages] = useState<{ uri: string; label: string }[]>([]);

    const images = [
        { uri: 'https://miro.medium.com/v2/resize:fit:1400/0*QrVegfBJTMkA-qKB', label: 'Vigan City' },
        { uri: 'https://images.gmanews.tv/webpics/2020/12/GLF21_2020_12_17_07_42_46.jpg', label: 'Pampanga' },
        { uri: 'https://www.awnwtravel.com/uploads/5/6/2/0/5620327/manila-6_orig.jpg', label: 'Rizal Park' },
        { uri: 'https://images.summitmedia-digital.com/cosmo/images/2020/02/07/hot-air-balloon-festival-clark-1581041244.jpg', label: 'Rizal Park' },
        // Add more images as needed
    ];

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredImages([]);
        } else {
            const filtered = images.filter(image =>
                image.label.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredImages(filtered);
        }
    };

    const imagesToDisplay = searchQuery ? filteredImages : images;

    return (
        <View style={styles.categoriesContainer}>
            <Text style={styles.CText}>
          Explore the
        </Text>
        <Text style={styles.CcText}>
          Beautiful of world! <HelloWave/>
        </Text>
             <View style={styles.searchContainer}>
                <AntDesign name="search1" size={20} color="gray" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search images..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    placeholderTextColor="transparent" // Hide the placeholder text
                />
               
            </View>
            <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="filter-outline" style={styles.fliterIcon} />
                </TouchableOpacity>
        <ScrollView style={styles.container}>
           
            <View style={styles.gridRow}>
                {imagesToDisplay.map((image, index) => (
                    <View key={index} style={styles.gridBox}>
                        <Image
                            source={{ uri: image.uri }}
                            style={styles.image2}
                        />
                    </View>
                ))}
            </View>
        </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    categoriesContainer: {
        marginBottom: 10,
    },
    CText: {
        fontSize: 30,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        color: 'black',
        textAlign: 'left',
        display: 'flex',
      },
      CcText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 5,
        textAlign: 'left',
    
        marginBottom: 10,
      },    
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        paddingHorizontal: 10,
        marginLeft: 10,
        marginBottom: 10,
        width : '70%',
        backgroundColor: 'white',
    },
    searchIcon: {
        marginRight: 10,
    },
    searchBar: {
        flex: 1,
        height: 50,
        color: 'black', // Ensure text color is visible
    },
    filterButton: {
        position: 'absolute',
        marginTop: '30%',
        color: '#FEF9D9',
        right: 20,
        marginLeft: 10,
        width: 50,
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#8EACCD',
    },
    fliterIcon: {
        fontWeight: 'bold',
        padding: 5,
        color: '#FEF9D9',
        fontSize: 20,
    },
    gridRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridBox: {
        width: 150,
        height: 150,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
    },
    image2: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
});

export default ImgGallery;