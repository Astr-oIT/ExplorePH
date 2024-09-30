import styles from '@/assets/styles/Hstyle'
import React, { useState, useRef } from 'react'
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,  
    Modal,             
    useColorScheme,
    Animated, // Import Animated
} from 'react-native';


const TopFoods = () => {
    const [modalVisible, setModalVisible] = useState(false); 
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const scrollX = useRef(new Animated.Value(0)).current; // Create scrollX Animated.Value

    interface OpenModalProps {
        imageUri: string;
    }

    const openModal = ({ imageUri }: OpenModalProps) => {
        setSelectedImage(imageUri);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedImage(null);
    };

    return (
        <View style={styles.gridRow}>
            <Animated.ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                <TouchableOpacity style={styles.gridBoxFood} onPress={() => openModal({ imageUri: 'https://philippinetourismusa.com/wp-content/uploads/2021/09/Bantayan-Island-Cebu_1.jpg' })}>
                    <Image
                        source={{ uri: 'https://philippinetourismusa.com/wp-content/uploads/2021/09/Bantayan-Island-Cebu_1.jpg' }}
                        style={styles.image}
                    />
                    <Text style={styles.TextTop}>Beaches</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.gridBoxFood} onPress={() => openModal({ imageUri: 'https://images.summitmedia-digital.com/cosmo/images/2014-images/july_2014/07-05-2014/batulao.jpg' })}>
                    <Image
                        source={{ uri: 'https://i0.wp.com/theficklefeet.com/wp-content/uploads/2020/09/kaparkan-falls-3.jpg?resize=845%2C634&ssl=1' }}
                        style={styles.image}
                    />
                    <Text style={styles.TextTop}>Waterfalls</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.gridBoxFood} onPress={() => openModal({ imageUri: 'https://images.summitmedia-digital.com/cosmo/images/2014-images/july_2014/07-05-2014/batulao.jpg' })}>
                    <Image
                        source={{ uri: 'https://thumbs.dreamstime.com/b/rizal-monument-park-manila-was-built-to-commemorate-filipino-nationalist-jos%C3%A9-was-83317353.jpg' }}
                        style={styles.image}
                    />
                    <Text style={styles.TextTop}>Monument</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.gridBoxFood} onPress={() => openModal({ imageUri: 'https://images.summitmedia-digital.com/cosmo/images/2014-images/july_2014/07-05-2014/batulao.jpg' })}>
                    <Image
                        source={{ uri: 'https://media-cdn.tripadvisor.com/media/photo-s/07/ff/75/d7/view-of-benguet-from.jpg' }}
                        style={styles.image}
                    />
                    <Text style={styles.TextTop}>Mountain</Text>
                </TouchableOpacity>
            </Animated.ScrollView>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={closeModal} 
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default TopFoods