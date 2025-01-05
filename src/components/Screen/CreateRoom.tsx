import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AppTextInput from '../common/AppTextInput';
import AppTheme from '../common/AppTheme';
import AppPicker from '../common/AppPicker';
import AppButton from '../common/AppButton';
import {create, PREDEF_RES} from 'react-native-pixel-perfect';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons for back icon
import {themes} from '../data/ThemesData';

const perfectSize = create(PREDEF_RES.iphoneX.width);

const validationSchema = Yup.object().shape({
  roomName: Yup.string().required('Room name is required.'),
  storyType: Yup.string().required('Story type is required.'),
  defaultRoom: Yup.string().required('Default room is required.'),
  uploadImage: Yup.string().required('Image upload is required.'),
  selectedTheme: Yup.string().required('Theme selection is required.'),
});

const CreateRoom = ({navigation}: {navigation: any}) => {
  const [isQRClicked, setIsQRClicked] = useState(false);

  const handleCreateRoom = (values: any) => {
    console.log('Room Created with values:', values);
  };

  const RoomTypes = ['Public', 'Private', 'Default'];

  const handleIconPress = () => {
    setIsQRClicked(!isQRClicked);
  };

  // Displaying only the first 5 themes for the "Create Room" screen
  const displayedThemes = themes.slice(0, 5);

  return (
    <View style={styles.appBar}>
      {/* App Bar with Back icon, Title, and AppThemeSetup icon */}
      <View style={styles.appBarInner}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backArrowContainer}>
          <Icon name="arrow-back" size={perfectSize(24)} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Create Room</Text>
        <TouchableOpacity
          onPress={handleIconPress}
          style={styles.themeIconContainer}>
          <Icon name="grid" size={perfectSize(22)} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Form content */}
      <Formik
        initialValues={{
          roomName: '',
          storyType: '',
          defaultRoom: '',
          uploadImage: '',
          selectedTheme: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleCreateRoom}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          errors,
          setFieldValue,
        }) => (
          <View style={styles.formContainer}>
            {/* Room Name Field */}
            <View style={styles.inputContainer}>
              <AppTextInput
                placeholder="Room name"
                value={values.roomName}
                onChangeText={handleChange('roomName')}
                onBlur={handleBlur('roomName')}
                style={styles.inputMargin}
              />
              {touched.roomName && errors.roomName && (
                <Text style={styles.errorText}>{errors.roomName}</Text>
              )}
            </View>

            {/* Default Room Field with AppPicker */}
            <View style={styles.inputContainer}>
              <AppPicker
                selectedValue={values.defaultRoom}
                onValueChange={itemValue =>
                  setFieldValue('defaultRoom', itemValue)
                }
                items={RoomTypes}
                label="Select Default Room"
                containerStyle={styles.inputContainer}
              />
              {touched.defaultRoom && errors.defaultRoom && (
                <Text style={styles.errorText}>{errors.defaultRoom}</Text>
              )}
            </View>

            {/* Upload Image Button */}
            <View style={styles.inputContainer}>
              <AppButton
                title="Upload Image"
                onPress={() => console.log('Upload Image Pressed')}
                style={styles.uploadButton}
                textStyle={styles.uploadButtonText}
                icon={null}
              />
              {touched.uploadImage && errors.uploadImage && (
                <Text style={styles.errorText}>{errors.uploadImage}</Text>
              )}
            </View>

            {/* Theme Selector */}
            <View style={styles.themeHeader}>
              <Text style={styles.themeTitle}>Select Themes</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SelectTheme', {
                    setSelectedTheme: (theme: string) =>
                      setFieldValue('selectedTheme', theme),
                  })
                }>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <AppTheme
              themes={displayedThemes} // Only show a few themes
              selectedTheme={values.selectedTheme}
              onSelect={() => {}}
              isQRClicked={isQRClicked}
            />

            {/* Create Room Button */}
            <AppButton
              title="Create Room"
              onPress={handleSubmit}
              style={styles.button}
              textStyle={styles.buttonText}
              icon={null}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    flex: 1,
    backgroundColor: '#F5E8D8',
  },
  appBarInner: {
    flexDirection: 'row',
    alignItems: 'center', // Ensures vertical alignment
    justifyContent: 'space-between',
    padding: perfectSize(16),
    backgroundColor: '#F5E8D8',
  },
  backArrowContainer: {
    marginRight: perfectSize(8), // Adds space between the arrow and title
  },
  themeIconContainer: {
    marginLeft: 'auto', // Pushes the icon to the far right
  },
  title: {
    fontSize: perfectSize(18),
    fontWeight: 'bold',
    color: '#000',
  },
  formContainer: {
    flex: 1,
    padding: perfectSize(16),
  },
  inputMargin: {
    marginBottom: perfectSize(10),
    tintColor: '#000',
  },
  inputContainer: {
    marginBottom: perfectSize(10),
  },
  themeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: perfectSize(10),
  },
  themeTitle: {
    fontSize: perfectSize(16),
    fontWeight: 'bold',
    color: '#000',
    marginTop: perfectSize(20),
  },
  seeAllText: {
    fontSize: perfectSize(12),
    color: '#000',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: perfectSize(20),
  },
  button: {
    marginBottom: 0,
    paddingVertical: perfectSize(12),
    paddingHorizontal: perfectSize(32),
    borderRadius: perfectSize(25),
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: perfectSize(295),
    height: perfectSize(50),
  },
  buttonText: {
    fontSize: perfectSize(16),
    fontWeight: 'bold',
    color: '#fff',
  },
  uploadButton: {
    borderRadius: perfectSize(30),
    paddingVertical: perfectSize(18),
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#FFDBA6',
  },
  uploadButtonText: {
    fontSize: perfectSize(16),
    fontWeight: 'normal',
    color: '#000',
    left: 20,
  },
  errorText: {
    color: 'red',
    fontSize: perfectSize(12),
    marginTop: perfectSize(5),
  },
});

export default CreateRoom;
