import styles from '@/assets/styles/Hstyle'
import { AntDesign } from '@expo/vector-icons';
import React, { useState, useRef, useEffect } from 'react'
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,  
    useColorScheme,
    Animated, // Import Animated
    Modal, // Import Modal
} from 'react-native';
import {categories} from '@/constants/index'

const TopDestination = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState<{
        [x: string]: string | undefined; title2: string, des: string, loc: string 
} | null>(null);
    const scrollX = useRef(new Animated.Value(5)).current; // Create scrollX Animated.Value
    const fadeAnim = useRef(new Animated.Value(0)).current; // Create fadeAnim Animated.Value

    useEffect(() => {
        if (selectedCategory) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [selectedCategory]);

    const openModal = (content: { title2: string, des: string, loc: string }) => {
        setModalContent(content);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalContent(null);
    };

    return (
        <View style={styles.scrollContainer}>
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
                    {categories.map((category) => (
                        <TouchableOpacity 
                            key={category.name} 
                            style={styles.gridBox} 
                            onPress={() => {
                                if (selectedCategory === category.name) {
                                    setSelectedCategory(null); // Deselect if the same category is clicked
                                } else {
                                    setSelectedCategory(category.name);
                                    fadeAnim.setValue(0); // Reset fade animation
                                }
                            }}
                        >
                            <Image
                                source={{ uri: category.imageUri }}
                                style={styles.image}
                            />
                            <Text style={styles.TextTop}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </Animated.ScrollView>
            </View>
            <Animated.View style={[styles.selectedCategoryContainer, { opacity: fadeAnim }]}>
                {categories
                    .filter(category => category.name === selectedCategory)
                    .map((category, index) => (
                        <React.Fragment key={category.name}> 
                            <TouchableOpacity onPress={() => openModal(category.no1)}>
                                <Text style={[styles.selectedCategoryDescription]}>1:{category.no1.title2}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openModal(category.no2)}>
                                <Text style={[styles.selectedCategoryDescription]}>{category.no2.title2}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openModal(category.no3)}>
                                <Text style={[styles.selectedCategoryDescription]}>{category.no3.title2}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openModal(category.no4)}>
                                <Text style={[styles.selectedCategoryDescription]}>{category.no4.title2}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openModal(category.no5)}>
                                <Text style={[styles.selectedCategoryDescription]}>{category.no5.title2}</Text>
                            </TouchableOpacity>
                        </React.Fragment>
                    ))}
            </Animated.View>
            {modalContent && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                    
                            <Image source={{ uri: modalContent.img }} style={styles.modalImage} />
                            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>_____</Text>
                            </TouchableOpacity>
                        <View style={styles.modalContentTopD}>
                            <Text style={styles.modalTitle}>{modalContent.title2}</Text>
                            <Text style={styles.modalDescription}>{modalContent.des}</Text>
                            <Text style={styles.modalTitle}>{modalContent.loc}</Text>
                            
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    )
}

export default TopDestination