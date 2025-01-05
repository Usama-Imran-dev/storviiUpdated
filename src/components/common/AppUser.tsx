import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AppTextInput from './AppTextInput';
import AppButton from './AppButton';
import VerificationCodeInput from './VerificationCodeInput';

import {useNavigation} from '@react-navigation/native';

import AppAlert from './AppAlert';

interface AppUserProps {
  placeholder?: string;
  image?: any;
  verifyImage?: any;
  description?: string;
  btnTitle?: string;
  onPress?: () => void;
  reasons?: string[];
  title?: string;
  onVerificationChange?: (isVerification: boolean) => void;
}

export default function AppUser({
  placeholder,
  image,
  verifyImage,
  description,
  onPress,
  btnTitle,
  reasons,
  title,
  onVerificationChange,
}: AppUserProps) {
  const navigation = useNavigation();
  const [info, setInfo] = useState('');
  const [showVerificationCodeInput, setShowVerificationCodeInput] =
    useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [verificationError, setVerificationError] = useState('');

  const expectedCode = '567455'; // Expected verification code

  const handleText = (text: string) => setInfo(text);

  const handleCodeFilled = (code: string) => {
    if (code === expectedCode) {
      setIsVerified(true);
      setVerificationError('');
      onVerificationChange?.(false);
    } else {
      setVerificationError('Incorrect verification code, please try again.');
    }
  };

  const handleVerifyPress = () => {
    onVerificationChange?.(true);
  };

  const handleSavePress = () => {
    console.log('Save');
  };

  const handleReasonPress = (reason: string) => {
    setSelectedReason(reason);
  };

  const handleDeletePress = () => setDialogVisible(true);

  const handleDialogCancel = () => setDialogVisible(false);

  const handleDialogConfirm = () => {
    console.log('Account deleted');
    setDialogVisible(false);
    onPress?.();
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {!isVerified && !showVerificationCodeInput && (
          <>
            {title !== 'Delete Account' && image && (
              <Image source={image} style={styles.image} />
            )}
            {title && <Text style={styles.title}>{title}</Text>}
            <Text style={styles.description}>{description}</Text>
          </>
        )}

        {!showVerificationCodeInput && !isVerified && (
          <>
            {reasons && reasons.length > 0 ? (
              <View style={styles.reasonsContainer}>
                {reasons.map(reason => (
                  <TouchableOpacity
                    key={reason}
                    style={[
                      styles.reasonOption,
                      selectedReason === reason && styles.selectedOption,
                    ]}
                    onPress={() => handleReasonPress(reason)}>
                    <Text
                      style={[
                        styles.reasonText,
                        selectedReason === reason && styles.selectedText,
                      ]}>
                      {reason}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <AppTextInput
                placeholder={placeholder}
                onChangeText={item => handleText(item)}
              />
            )}
          </>
        )}

        {showVerificationCodeInput && !isVerified && (
          <>
            <VerificationCodeInput onCodeFilled={handleCodeFilled} />
            {verificationError ? (
              <Text style={styles.errorText}>{verificationError}</Text>
            ) : null}
            <AppButton
              title="Verify"
              onPress={handleVerifyPress}
              style={styles.appButton}
              textStyle={styles.whiteText}
            />
          </>
        )}

        {isVerified && (
          <>
            {verifyImage ? (
              <Image source={verifyImage} style={styles.image} />
            ) : (
              <Image source={image} style={styles.image} />
            )}
            <Text style={styles.verifiedText}>Verified successfully!</Text>
            <AppButton
              title="Back"
              onPress={handleBackPress}
              style={styles.appButton}
              textStyle={styles.whiteText}
            />
          </>
        )}

        {!showVerificationCodeInput && !isVerified && (
          <AppButton
            title={btnTitle}
            onPress={() =>
              btnTitle === 'Delete'
                ? handleDeletePress()
                : btnTitle === 'Confirm'
                ? setShowVerificationCodeInput(true)
                : btnTitle === 'Save'
                ? handleSavePress()
                : onPress?.()
            }
            style={styles.appButton}
            textStyle={styles.whiteText}
          />
        )}

        <AppAlert
          visible={dialogVisible}
          title="Confirm Deletion"
          message="Are you sure you want to delete your account?"
          onClose={handleDialogCancel}
          onConfirm={handleDialogConfirm}
          cancelText="Cancel"
          confirmText="Delete"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFF5E7',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  description: {
    marginBottom: 35,
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  reasonsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  reasonOption: {
    flexDirection: 'row',
    backgroundColor: '#FFF5E7',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  reasonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOption: {
    backgroundColor: '#FFDBA6',
    borderColor: '#000',
    borderWidth: 1,
  },
  selectedText: {
    color: '#000',
    fontWeight: 'bold',
  },
  appButton: {
    backgroundColor: '#000',
    borderRadius: 30,
    padding: 20,
    margin: 50,
    width: 300,
    height: 63,
    alignSelf: 'center',
  },
  whiteText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  verifiedText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 50,
    marginTop: 25,
  },
});
