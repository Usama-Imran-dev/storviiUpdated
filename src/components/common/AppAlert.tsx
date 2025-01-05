import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';

interface AppAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const AppAlert: React.FC<AppAlertProps> = ({
  visible,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = 'OK',
  cancelText = 'Cancel',
}) => {
  if (Platform.OS === 'android' && visible) {
    return (
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        statusBarTranslucent>
        <View style={styles.overlay}>
          <View style={styles.alertBox}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            <View style={styles.buttonContainer}>
              <Text
                style={[styles.buttonText, styles.cancelText]}
                onPress={onClose}>
                {cancelText}
              </Text>
              {onConfirm && (
                <Text
                  style={[styles.buttonText, styles.confirmText]}
                  onPress={onConfirm}>
                  {confirmText}
                </Text>
              )}
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  if (Platform.OS === 'ios' && visible) {
    // Show the default iOS Alert
    const buttons = [{text: cancelText, onPress: onClose}];
    if (onConfirm) {
      buttons.push({text: confirmText, onPress: onConfirm});
    }

    Alert.alert(title, message, buttons, {cancelable: false});
  }

  return null; // Return null when the alert is not visible
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: '85%',
    backgroundColor: '#F5E8D8', // Background color changed to match your app color
    borderRadius: 22,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 10,
  },
  confirmText: {
    color: '#2196F3',
    flex: 1,
  },
  cancelText: {
    color: '#FF5722',
    flex: 1,
  },
});

export default AppAlert;
