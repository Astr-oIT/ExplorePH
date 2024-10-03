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
} from 'react-native';

const TopDestination = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const scrollX = useRef(new Animated.Value(5)).current; // Create scrollX Animated.Value
    const fadeAnim = useRef(new Animated.Value(0)).current; // Create fadeAnim Animated.Value

    const categories = [
        { name: 'Beaches', 
          imageUri: 'https://philippinetourismusa.com/wp-content/uploads/2021/09/Bantayan-Island-Cebu_1.jpg',
          no1:'1: El Nido, Palawan',
          no2:'2: Boracay',
          no3: '3: Alona Beach, Panglao',
          no4:'4: Kayangan Lake, Coron',
          no5: '5: Saud Beach, Luzon'
         },
        { name: 'Waterfalls', 
          imageUri: 'https://i0.wp.com/theficklefeet.com/wp-content/uploads/2020/09/kaparkan-falls-3.jpg?resize=845%2C634&ssl=1',
          no1:'1: Kawasan Falls, Cebu',
          no2:'2: Tumalog Falls, Cebu',
          no3: '3: Cambugahay Falls, Siquijor',
          no4:'4: Pagsanjan Falls, Laguna',
          no5: '5: Tinago Falls, Iligan'
        },
        { name: 'Monument', 
          imageUri: 'https://thumbs.dreamstime.com/b/rizal-monument-park-manila-was-built-to-commemorate-filipino-nationalist-jos%C3%A9-was-83317353.jpg',
          no1:'1: Lapu Lapu, Cebu',
          no2:'2: Mount Samat National Shrine, Bataan',
          no3: '3: Heritage Of Cebu',
          no4:'4: Statue of the Divine Mercy',
          no5: '5: Memorare Manila Monument'
    
         },
        { name: 'Mountain', imageUri: 'https://media-cdn.tripadvisor.com/media/photo-s/07/ff/75/d7/view-of-benguet-from.jpg',
            no1:'1: Mount Apo, Davao',
            no2:'2: Mount Dulang-Dulang, Bukidnon',
            no3: '3: Mount Pulag, Benguet',
            no4:'4: Mount Kitanglad, Bukidnon',
            no5: '5: Mount Kalatungan, Bukidnon'
         },
        { name: 'HotSpring', 
          imageUri: 'https://leisureopportunities.co.uk/images/HIGH436928_838902.jpg',
           

        },
        { name: 'Volcano', 
            imageUri: 'https://pinaywise.com/wp-content/uploads/2024/02/Dormant-Volcanoes-In-The-Philippines.jpg',

          },
          { name: 'Rice terraces', 
            imageUri: 'https://cdn.britannica.com/98/150498-050-C7E45C90/Banaue-rice-terraces-Luzon-Philippines.jpg',

          }
    ];

    useEffect(() => {
        if (selectedCategory) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [selectedCategory]);

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
        
            <Text style={[styles.selectedCategoryDescription]}>{category.no1} </Text>
            <Text style={[styles.selectedCategoryDescription]}>{category.no2}</Text>
            <Text style={[styles.selectedCategoryDescription]}>{category.no3}</Text>
            <Text style={[styles.selectedCategoryDescription]}>{category.no4}</Text>
            <Text style={[styles.selectedCategoryDescription]}>{category.no5}</Text>
        </React.Fragment>
    ))}
      </Animated.View>
        </View>
    )
}

export default TopDestination