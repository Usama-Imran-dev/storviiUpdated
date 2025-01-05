import React from 'react';
import {View} from 'react-native';
import AppUser from '../../common/AppUser';

export default function Email() {
  return (
    <AppUser
      description="You can update your email address here. This will be used for account-related notifications, password recovery, and other important updates."
      image={require('../../../assets/email.png')}
      verifyImage={require('../../../assets/verify.png')}
      btnTitle="Confirm"
      placeholder="New email address"
      onPress={() => console.log('Saved')}
    />
  );
}
