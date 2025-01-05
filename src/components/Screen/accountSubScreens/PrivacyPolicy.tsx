import React from 'react';
import {StyleSheet, View, ScrollView, Text, Linking} from 'react-native';
import AppPrivacyPolicy from '../../common/AppPrivacyPolicy';

// Import the new component

const PrivacyPolicy = () => {
  const openSupportLink = (): void => {
    Linking.openURL('mailto:support@storvii.com');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Question 1: Information We Collect */}
        <AppPrivacyPolicy
          icon="information-circle"
          iconColor="#4CAF50"
          title="Information We Collect">
          We collect the following types of information to provide and improve
          Storvii:
          {'\n\n'}a. <Text style={styles.bold}>Personal Information:</Text>{' '}
          Name, email address, and profile photo during account creation.
          {'\n'}b. <Text style={styles.bold}>Usage Information:</Text> Activity
          logs, such as stories created and rooms joined.
          {'\n'}c. <Text style={styles.bold}>Device Information:</Text> Device
          model, operating system, and IP address for analytics.
          {'\n'}d. <Text style={styles.bold}>Location Information:</Text>{' '}
          Approximate location (if enabled) to enhance location-based features.
          {'\n'}e. <Text style={styles.bold}>Content Information:</Text>{' '}
          Stories, messages, and voice recordings (if applicable).
        </AppPrivacyPolicy>

        {/* Question 2: How We Use Your Information */}
        <AppPrivacyPolicy
          icon="shield-checkmark"
          iconColor="#2196F3"
          title="How We Use Your Information">
          Your information is used to improve Storvii, personalize
          recommendations, troubleshoot issues, and maintain security.
        </AppPrivacyPolicy>

        {/* Question 3: Data Protection */}
        <AppPrivacyPolicy
          icon="lock-closed"
          iconColor="#FF5722"
          title="Data Protection">
          We use encryption and other security measures to protect your data.
          Access to sensitive data is restricted within our organization.
        </AppPrivacyPolicy>

        {/* Question 4: Data Retention */}
        <AppPrivacyPolicy
          icon="time"
          iconColor="#009688"
          title="Data Retention">
          Data is retained only as long as necessary to fulfill its purpose or
          as required by law.
        </AppPrivacyPolicy>

        {/* Question 5: Sharing Information */}
        <AppPrivacyPolicy
          icon="people"
          iconColor="#673AB7"
          title="Sharing Information">
          We do not sell data. Information is shared with service providers for
          functionality or legal compliance.
        </AppPrivacyPolicy>

        {/* Question 6: Cookies and Tracking */}
        <AppPrivacyPolicy
          icon="tracking"
          iconColor="#FF9800"
          title="Cookies and Tracking">
          We use cookies to improve the app experience. Manage your cookie
          preferences in your device or browser settings.
        </AppPrivacyPolicy>

        {/* Question 7: How We Protect Your Data */}
        <AppPrivacyPolicy
          icon="shield"
          iconColor="#FF4081"
          title="How We Protect Your Data">
          We implement robust security measures such as encryption, secure data
          storage, and access controls to safeguard your personal information.
        </AppPrivacyPolicy>

        {/* Question 8: Third-Party Services */}
        <AppPrivacyPolicy
          icon="arrow-forward-circle"
          iconColor="#8BC34A"
          title="Third-Party Services">
          We may use third-party services to enhance our app. These services may
          have access to some of your information as necessary to perform their
          functions, but they are obligated to keep your information
          confidential.
        </AppPrivacyPolicy>

        {/* Question 9: Children’s Privacy */}
        <AppPrivacyPolicy
          icon="people"
          iconColor="#000"
          title="Children’s Privacy">
          Our services are not intended for children under the age of 13. We do
          not knowingly collect personal information from children.
        </AppPrivacyPolicy>

        {/* Question 10: Your Rights and Choices */}
        <AppPrivacyPolicy
          icon="checkmark-circle"
          iconColor="#FF5722"
          title="Your Rights and Choices">
          You have the right to access, update, or delete your personal data at
          any time. You may also opt out of certain data collection or
          processing activities.
        </AppPrivacyPolicy>

        {/* Question 11: Changes to This Privacy Policy */}
        <AppPrivacyPolicy
          icon="refresh"
          iconColor="#2196F3"
          title="Changes to This Privacy Policy">
          We may update this privacy policy from time to time. We will notify
          you of any significant changes by posting a notice within the app.
        </AppPrivacyPolicy>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E7',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  content: {
    flex: 1,
  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default PrivacyPolicy;
