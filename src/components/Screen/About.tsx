import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Storvii</Text>
      <Text style={styles.credit}>Developed by Devlabyrinth</Text>
      <Text style={styles.detail}>Version 1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5E7',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  credit: {
    fontSize: 20,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 5,
  },
});
