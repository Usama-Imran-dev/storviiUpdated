import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppAlert from '../common/AppAlert';
import {Rating} from 'react-native-ratings';

const Hamburger = ({navigation}: {navigation: any}) => {
  const [isAlertVisible, setAlertVisible] = useState(false); // State for the alert visibility
  const [userRating, setUserRating] = useState(0); // State for storing user rating
  const [isThankYouVisible, setThankYouVisible] = useState(false); // State for the thank-you message

  const menuItems = [
    {name: 'Rate us', icon: 'star-outline'},
    {name: 'Bugs', icon: 'bug'},
  ];

  const handleMenuItemPress = (menuName: string) => {
    if (menuName === 'Bugs') {
      Linking.openURL('mailto:support@storvii.com?').catch(err => {
        Alert.alert('Error', 'Failed to open email client');
        console.error('Failed to open email client', err);
      });
    } else if (menuName === 'Rate us') {
      setAlertVisible(true); // Show the "Rate Us" alert
    } else {
      navigation.navigate(menuName); // Navigate for other menu items
    }
  };

  const handleCloseAlert = () => {
    setAlertVisible(false); // Close the alert
  };

  const handleConfirmRate = () => {
    // Show thank-you message after submitting rating
    console.log(`User rated: ${userRating} stars`);
    setAlertVisible(false); // Close the alert
    setThankYouVisible(true); // Show thank-you alert
  };

  const handleCloseThankYou = () => {
    setThankYouVisible(false); // Close the thank-you message
  };

  return (
    <ScrollView style={styles.container}>
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

      {/* AppAlert for "Rate us" */}
      <AppAlert
        visible={isAlertVisible}
        title="Rate Us"
        message="How would you rate our app?"
        onClose={handleCloseAlert}
        onConfirm={handleConfirmRate}
        confirmText="Submit"
        cancelText="Cancel">
        {/* Rating Component */}
        <Rating
          ratingCount={5}
          imageSize={40}
          startingValue={userRating}
          onFinishRating={setUserRating} // Update state when user rates
          style={styles.rating}
          tintColor="#FFF5E7" // Background color behind stars
          ratingColor="#FFD700" // Solid gold color for the selected stars (example)
          ratingBackgroundColor="#E1E1E1" // Color for unselected stars
        />
      </AppAlert>

      {/* Thank You Alert */}
      <AppAlert
        visible={isThankYouVisible}
        title="Thank You!"
        message="We appreciate your feedback."
        onClose={handleCloseThankYou}
        confirmText="Close"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E7',
    padding: 16,
  },
  menuOptions: {
    marginTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#EFC078',
  },
  menuIcon: {
    marginRight: 16,
    fontSize: 20,
  },
  menuLabel: {
    color: '#000',
    fontSize: 16,
  },
  rating: {
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default Hamburger;
