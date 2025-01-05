import React from 'react';
import {createStackNavigator, Header} from '@react-navigation/stack';
import LoginScreen from '../Screen/LoginScreen';
import HomeScreen from '../Screen/HomeScreen';
import CreateRoomScreen from '../Screen/CreateRoom';
import SignupScreen from '../Screen/Signup';
import Room from '../Screen/Room';
import BottomTabNavigation from './BottomTabNavigation';
import SelectTheme from '../Screen/SelectTheme';
import AccountScreen from '../Screen/AccoutScreen';
import Name from '../Screen/accountSubScreens/Name';
import Email from '../Screen/accountSubScreens/Email';
import DeleteAcc from '../Screen/accountSubScreens/DeleteAcc';
import About from '../Screen/About';
import SupportScreen from '../Screen/SupportScreen';

import PrivacyPolicy from '../Screen/accountSubScreens/PrivacyPolicy';

// Create the Stack Navigator
const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={BottomTabNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateRoom"
        component={CreateRoomScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SelectTheme"
        component={SelectTheme}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#FFF5E7',
            elevation: 0,
          },
          headerTitleStyle: {
            fontSize: 22,
          },
        }}
      />
      <Stack.Screen
        name="Name"
        component={Name}
        options={{
          title: 'Change Your Name',
          headerStyle: {
            backgroundColor: '#FFF5E7',
            elevation: 0,
          },
          headerTitleStyle: {
            fontSize: 22,
          },
        }}
      />
      <Stack.Screen
        name="Email Address"
        component={Email}
        options={{
          title: 'Change Your Email',
          headerStyle: {
            backgroundColor: '#FFF5E7',
          },
          headerTitleStyle: {
            fontSize: 22,
            elevation: 0,
          },
        }}
      />

      <Stack.Screen
        name="Delete Account"
        component={DeleteAcc}
        options={{
          title: 'Delete Account',
          headerStyle: {
            backgroundColor: '#FFF5E7',
            elevation: 0,
          },
          headerTitleStyle: {
            fontSize: 22,
          },
        }}
      />

      <Stack.Screen
        name="About"
        component={About}
        options={{
          headerShown: true,

          headerStyle: {
            backgroundColor: '#FFF5E7',
            elevation: 0,
          },
          headerTitleStyle: {
            fontSize: 22,
          },
        }}
      />
      <Stack.Screen
        name="Support"
        component={SupportScreen}
        options={{
          title: 'Help and Support',
          headerStyle: {
            backgroundColor: '#FFF5E7',
            elevation: 0,
          },
          headerTitleStyle: {
            fontSize: 22,
          },
        }}
      />

      <Stack.Screen
        name="Privacy Policy"
        component={PrivacyPolicy}
        options={{
          title: 'Privacy Policy',
          headerStyle: {
            backgroundColor: '#FFF5E7',
            elevation: 0,
          },
          headerTitleStyle: {
            fontSize: 22,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
