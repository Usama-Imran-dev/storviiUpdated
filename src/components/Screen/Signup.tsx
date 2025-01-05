import React, {useState, useEffect} from 'react';
import AuthForm from '../common/AuthForm';

const SignupScreen = ({navigation}: {navigation: any}) => {
  return <AuthForm formTitle="Sign Up" navigation={navigation} />;
};

export default SignupScreen;
