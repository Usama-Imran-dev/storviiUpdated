import React from 'react';
import {View} from 'react-native';
import AppUser from '../../common/AppUser';

export default function DeleteAcc() {
  return (
    <AppUser
      title="Deactivate Account"
      description="We're sorry to see you go! Please let us know the reason for deleting your account. Your feedback helps us improve our services."
      btnTitle="Delete"
      reasons={[
        'No longer using the service',
        'Privacy concerns',
        'Too many emails/notifications',
        'Account-related issues',
        'Difficult to use',
        'Issues with customer support',
        'Other',
      ]}
    />
  );
}
