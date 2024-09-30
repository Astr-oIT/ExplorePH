// ImgGallery.js
import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from '@/assets/styles/Hstyle'; // Adjust the path if necessary

const ImgGallery = () => {
  return (
    <>
    <View style={styles.gridBox2}>
          <Image
            source={{ uri: 'https://i.pinimg.com/originals/32/71/19/32711928e2fbf48fb4f10874cdd8aa83.gif' }}
            style={styles.image2}
          />
        </View>
      <View style={styles.gridRow}>
        <View style={styles.gridBox1}>
          <Image
            source={{ uri: 'https://www.holidify.com/images/bgImages/VIGAN.jpg' }}
            style={styles.image2}
          />
        </View>
        <View style={styles.gridBox2}>
          <Image
            source={{ uri: 'https://miro.medium.com/v2/resize:fit:1400/0*QrVegfBJTMkA-qKB' }}
            style={styles.image2}
            
          />
        
        </View>
        
      </View>
      {/* <Text style={styles.IgText}>Vigan City</Text> */}
      <View style={styles.gridRow}>
        
        <View style={styles.gridBox1}>
          <Image
            source={{ uri: 'https://images.gmanews.tv/webpics/2020/12/GLF21_2020_12_17_07_42_46.jpg' }}
            style={styles.image2}
          />
        </View>
      </View>
      <View style={styles.gridRow}>
        <View style={styles.gridBox2}>
          <Image
            source={{ uri: 'https://www.awnwtravel.com/uploads/5/6/2/0/5620327/manila-6_orig.jpg' }}
            style={styles.image2}
          />
        </View>
        <View style={styles.gridBox2}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1PZ9rQiFFyxoPzR-NDM157ojHqMZ56nzDPw&s' }}
            style={styles.image2}
          />
        </View>
      </View>
    </>
  );
};

export default ImgGallery;
