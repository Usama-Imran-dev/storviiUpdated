import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {create, PREDEF_RES} from 'react-native-pixel-perfect';

const perfectSize = create(PREDEF_RES.iphoneX.width);

interface AppTextInputProps {
  placeholder?: string;
  style?: any;
  onChangeText?: (text: string) => void;
  onBlur?: (e: any) => void;
  value?: string;
  secureTextEntry?: boolean;
  errorText?: string;
}

export default function AppTextInput({
  placeholder,
  style,
  onChangeText,
  onBlur,
  value,
  secureTextEntry = false,
  errorText,
}: AppTextInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor="#000" // Adjust placeholder text color for better contrast
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        style={[styles.input, style, errorText ? styles.inputError : null]}
      />
      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    fontSize: perfectSize(16), // Set font size to 16
    color: '#000', // Set text color to black
    backgroundColor: '#FFDBA6',
    width: '100%',
    borderRadius: perfectSize(30),
    paddingVertical: perfectSize(18),
    paddingLeft: perfectSize(23),
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: perfectSize(12),
    marginTop: perfectSize(5),
    marginLeft: perfectSize(10),
  },
});
