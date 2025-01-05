// AppPrivacyPolicy.tsx

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Define prop types for AppPrivacyPolicy
interface AppPrivacyPolicyProps {
  icon: string;
  iconColor: string;
  title: string;
  children: React.ReactNode;
}

// Reusable Section Component with explicit types
const AppPrivacyPolicy: React.FC<AppPrivacyPolicyProps> = ({
  icon,
  iconColor,
  title,
  children,
}) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Ionicons name={icon} size={20} color={iconColor} />
      <Text style={styles.question}>{title}</Text>
    </View>
    <Text style={styles.answer}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FFF5E7',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  answer: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default AppPrivacyPolicy;
