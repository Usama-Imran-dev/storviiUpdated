import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';
import {create, PREDEF_RES} from 'react-native-pixel-perfect';
import AppTextInput from './AppTextInput';
import AppButton from './AppButton';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {login, signup} from '../auth/api'; // Import the auth functions

import AppAlert from './AppAlert';
// Import the custom alert

const perfectSize = create(PREDEF_RES.iphoneX.width);
const loginImage = require('../../assets/2.png');
const signupImage = require('../../assets/3.png');

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

interface AuthFormProps {
  formTitle: string;
  navigation: any;
}

export default function AuthForm({formTitle, navigation}: AuthFormProps) {
  const [alertVisible, setAlertVisible] = useState(false); // State for alert visibility
  const [alertMessage, setAlertMessage] = useState(''); // State for alert message

  const handleAuth = async (values: {email: string; password: string}) => {
    try {
      let response;
      if (formTitle === 'Login') {
        response = await login(values.email, values.password);
      } else {
        response = await signup(values.email, values.password);
      }
      console.log(`${formTitle} successful:`, response);
      // Handle successful auth (e.g., store token, navigate to home)
      navigation.navigate('Home');
    } catch (error: any) {
      console.error(`${formTitle} error:`, error);
      setAlertMessage(
        error.message || `${formTitle} failed. Please try again.`,
      ); // Set error message
      setAlertVisible(true); // Show the custom alert
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={formTitle === 'Login' ? loginImage : signupImage}
              resizeMode="contain"
            />
          </View>
          {/* Form Container */}
          <View style={styles.formContainer}>
            <View style={styles.formInnerContainer}>
              <Text style={styles.title}>{formTitle}</Text>
              <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={loginValidationSchema}
                onSubmit={handleAuth}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    <AppTextInput
                      placeholder={
                        formTitle === 'Login'
                          ? 'Enter email or username'
                          : 'Enter email'
                      }
                      style={styles.appTextInput}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                    <AppTextInput
                      placeholder="Enter password"
                      style={styles.appTextInput}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry
                    />
                    {errors.password && touched.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                    {formTitle === 'Login' && (
                      <View style={styles.forgotPasswordContainer}>
                        <AppButton
                          title="Forgot Password?"
                          onPress={() => console.log('Forgot Password Pressed')}
                          textStyle={styles.appButtonTextStyle}
                          style={styles.appTextButton}
                        />
                      </View>
                    )}
                    <AppButton
                      title={formTitle === 'Login' ? 'Login' : 'Sign up'}
                      onPress={handleSubmit}
                      style={styles.appButton}
                      textStyle={null}
                      icon={null}
                    />
                  </>
                )}
              </Formik>
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>
              <AppButton
                title="Continue with Google"
                onPress={() => console.log('Continue with Google Pressed')}
                style={styles.appButton}
                textStyle={null}
              />
            </View>
            <AppButton
              title={
                formTitle === 'Login'
                  ? "Don't have an account? Signup"
                  : 'Already have an account? Login'
              }
              onPress={() =>
                navigation.navigate(formTitle === 'Login' ? 'SignUp' : 'Login')
              }
              textStyle={styles.appButtonTextStyle}
              style={styles.appTextButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Custom Alert */}
      <AppAlert
        visible={alertVisible}
        title={`${formTitle} Error`}
        message={alertMessage}
        onClose={() => setAlertVisible(false)} // Close the alert
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE5BF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: perfectSize(20),
  },
  image: {
    width: perfectSize(280),
    height: perfectSize(280),
  },
  formContainer: {
    flex: 1,
    width: '100%',
    borderTopLeftRadius: perfectSize(50),
    borderTopRightRadius: perfectSize(50),
    backgroundColor: '#FFEED5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: perfectSize(0),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  formInnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: perfectSize(50),
  },
  title: {
    fontWeight: 'bold',
    fontSize: perfectSize(24),
    marginBottom: perfectSize(5),
  },
  appTextInput: {
    marginTop: perfectSize(15),
  },
  appButton: {
    marginVertical: perfectSize(15),
    backgroundColor: '#FFDBA6',
    height: 60,
    width: 300,
    borderRadius: 30,
    justifyContent: 'center', // Center text vertically
  },
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: perfectSize(10),
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: perfectSize(2),
    backgroundColor: '#000',
  },
  dividerText: {
    marginHorizontal: perfectSize(10),
    fontSize: perfectSize(16),
    color: '#000',
    fontWeight: 'bold',
  },
  appTextButton: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 0,
    width: 'auto',
    backgroundColor: 'transparent',
  },
  appButtonTextStyle: {
    fontSize: perfectSize(14),
  },
  errorText: {
    color: 'red',
    fontSize: perfectSize(12),
    marginVertical: perfectSize(5),
    alignSelf: 'flex-start',
  },
});
