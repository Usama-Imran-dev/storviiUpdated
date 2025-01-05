import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AccountScreen = ({navigation}: {navigation: any}) => {
  const menuItems = [
    {name: 'Name', icon: 'person'},
    {name: 'Email Address', icon: 'mail'},
    {name: 'Delete Account', icon: 'trash-bin'},
    {name: 'Logout', icon: 'log-out'},
  ];

  const handleMenuItemPress = (menuName: string) => {
    if (menuName === 'Logout') {
      // Handle logout logic here (e.g., clear user session, token, etc.)
      navigation.navigate('Login'); // Navigate to LoginScreen
    } else {
      navigation.navigate(menuName); // Navigate to the respective screen for other items
    }
  };

  return (
    <>
      {/* Main Screen */}
      <ScrollView style={styles.container}>
        {/* AppBar with back arrow and title */}

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
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E7',
    padding: 16,
  },

  backButton: {
    marginRight: 16,
  },

  divider: {
    height: 1,
    backgroundColor: '#000',
    marginTop: 2,
  },
  menuOptions: {
    marginTop: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25,
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
});

export default AccountScreen;
