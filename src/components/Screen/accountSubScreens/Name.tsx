import React from 'react';
import {View} from 'react-native';
import AppUser from '../../common/AppUser';

export default function Name() {
  return (
    <AppUser
      description="Your name will be visible to other users in both public and private rooms. Please enter your preferred name below."
      image={require('../../../assets/profile.png')}
      btnTitle="Save"
      placeholder="Change Your Name"
      onPress={() => console.log('Saved')}
    />
  );
}
