import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import {create, PREDEF_RES} from 'react-native-pixel-perfect';
import AppModel from '../common/AppModel';
import Icon from 'react-native-vector-icons/Ionicons';

const perfectSize = create(PREDEF_RES.iphoneX.width);

const SettingScreen = ({navigation}: {navigation: any}) => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  const list = [
    require('../../assets/PI1.png'),
    require('../../assets/PI2.png'),
    require('../../assets/PI3.png'),
    require('../../assets/PI4.png'),
    require('../../assets/PI5.png'),
    require('../../assets/PI6.png'),
    require('../../assets/PI7.png'),
    require('../../assets/PI8.png'),
    require('../../assets/PI9.png'),
    require('../../assets/PI10.png'),
    require('../../assets/PI11.png'),
    require('../../assets/PI12.png'),
    require('../../assets/PI13.png'),
    require('../../assets/PI15.png'),
    require('../../assets/PI16.png'),
    require('../../assets/PI17.png'),
  ];

  const menuItems = [
    {name: 'Account', icon: 'person'},
    {name: 'Support', icon: 'help-circle'},
    {name: 'About', icon: 'information-circle'},
    {name: 'Privacy Policy', icon: 'shield'},
  ];

  const handleProfileEdit = () => {
    setIsVisible(true);
  };

  const handleImageSelect = (image: any) => {
    setSelectedImage(image);
    setIsVisible(false);
  };

  const handleMenuItemPress = (menuName: string) => {
    navigation.navigate(menuName); // This works for other menu items
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={[styles.imageWrapper]}>
          <Image
            style={styles.profileImage}
            source={selectedImage || require('../../assets/PI1.png')}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.editIcon} onPress={handleProfileEdit}>
            <Ionicons name="pencil" size={18} color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>Usama Imran</Text>
        <View style={styles.reputationContainer}>
          <Text style={styles.reputationLabel}>Reputation Level</Text>
          <Text style={styles.reputationValue}>30</Text>
        </View>
      </View>

      {/* Menu Options */}
      <View style={styles.menuOptions}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.name}
            style={styles.menuItem}
            onPress={() => handleMenuItemPress(item.name)}>
            <Ionicons name={item.icon} style={styles.menuIcon} />
            <Text style={styles.menuLabel}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <AppModel
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        title="Change your image"
        children={list}
        onImageSelect={handleImageSelect}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E7',
    padding: perfectSize(16),
  },
  backButton: {
    marginRight: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: perfectSize(24),
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: perfectSize(90),
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#EFC078',
    justifyContent: 'center',
    alignItems: 'center',
    width: perfectSize(110), // Set fixed width to maintain frame
    height: perfectSize(110), // Set fixed height to maintain frame
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  editIcon: {
    position: 'absolute',
    top: perfectSize(15),
    right: perfectSize(8),
    backgroundColor: '#FFE3C0',
    borderRadius: perfectSize(25),
    padding: perfectSize(6),
  },
  profileName: {
    marginTop: perfectSize(12),
    fontWeight: 'bold',
    color: '#333',
    fontSize: perfectSize(20),
  },
  reputationContainer: {
    flexDirection: 'row',
    marginTop: perfectSize(16),
    borderRadius: perfectSize(30),
    backgroundColor: '#FCDDB1',
    justifyContent: 'space-between',
    width: '80%',
    paddingVertical: perfectSize(10),
    paddingHorizontal: perfectSize(20),
  },
  reputationLabel: {color: '#000', fontSize: perfectSize(16)},
  reputationValue: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: perfectSize(16),
  },
  menuOptions: {marginTop: perfectSize(16)},
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: perfectSize(18),
    borderBottomWidth: 1,
    borderBottomColor: '#EFC078',
  },
  menuIcon: {marginRight: perfectSize(16), fontSize: 20},
  menuLabel: {color: '#000', fontSize: perfectSize(16)},
});

export default SettingScreen;
