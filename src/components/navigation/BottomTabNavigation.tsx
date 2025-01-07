import React, {useRef} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingScreen from '../Screen/SettingScreen';
import RoomScreen from '../Screen/RoomScreen';
import HomeScreen from './../Screen/HomeScreen';
import Hamburger from '../Screen/HamBurger';

const Tab = createBottomTabNavigator();
const {width} = Dimensions.get('window');

export default function BottomTabNavigation() {
  const translateX = useRef(new Animated.Value(0)).current;

  const handleTabPress = (tabIndex: number) => {
    const tabWidth = width / 3; // Assuming 3 tabs
    Animated.timing(translateX, {
      toValue: tabIndex * tabWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: styles.tabBar,
          tabBarIcon: () => null,
          tabBarLabel: ({focused}) => (
            <Text
              style={[styles.tabLabel, {color: focused ? 'black' : 'gray'}]}>
              {route.name}
            </Text>
          ),
        })}
        screenListeners={({route}) => ({
          tabPress: () => {
            const tabIndex = ['Settings', 'Home', 'Rooms'].indexOf(route.name);
            handleTabPress(tabIndex); // Animate underline on tab press
          },
        })}>
        <Tab.Screen name="Settings" component={SettingScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Hamburger" component={Hamburger} />
      </Tab.Navigator>
      {/* Underline */}
      <Animated.View
        style={[
          styles.underline,
          {
            width: width / 3, // Adjust underline width based on the number of tabs
            transform: [{translateX}],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    height: 70,
    position: 'relative',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: 'black',
    zIndex: 1,
  },
});
