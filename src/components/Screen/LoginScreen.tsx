import React from 'react';

import AuthForm from '../common/AuthForm';
export default function LoginScreen({navigation}: {navigation: any}) {
  return <AuthForm formTitle="Login" navigation={navigation} />;
}
