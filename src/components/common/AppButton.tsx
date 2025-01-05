import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface AppButtonProps {
  title?: string;
  onPress?: () => void;
  style?: any;
  textStyle?: any;
  icon?: any;
}

export default function AppButton({
  title,
  onPress,
  style,
  textStyle,
  icon,
}: AppButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {icon ? (
        <Icon name={icon} size={25} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {},
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
