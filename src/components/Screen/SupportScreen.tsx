import React from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';

const SupportScreen = () => {
  return (
    <View style={{flex: 1}}>
      <WebView
        source={{uri: 'https://usama-imran-dev.github.io/StorviiSupport/'}} // Replace with your live GitHub page URL
        style={{flex: 1}}
      />
    </View>
  );
};

export default SupportScreen;
