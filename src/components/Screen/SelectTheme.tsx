import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList, Text} from 'react-native';
import {create, PREDEF_RES} from 'react-native-pixel-perfect';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppButton from '../common/AppButton'; // Import your custom AppButton component
import AppTextInput from '../common/AppTextInput';
import AppTheme from '../common/AppTheme';
import {themes} from '../data/ThemesData';

const perfectSize = create(PREDEF_RES.iphoneX.width);

export default function SelectTheme() {
  const [roomName, setRoomName] = useState(''); // No error state
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]); // Store selected themes
  const [isQRClicked, setIsQRClicked] = useState(false);

  const navigation = useNavigation();

  const handleRoomNameChange = (text: string) => {
    setRoomName(text);
  };

  const handleRoomNameBlur = () => {
    console.log('Input blurred. Current room name:', roomName);
  };

  const handleThemeSelect = (theme: string) => {
    if (selectedThemes.includes(theme)) {
      setSelectedThemes(selectedThemes.filter(item => item !== theme));
    } else {
      setSelectedThemes([...selectedThemes, theme]);
    }
  };

  const handleQRButtonPress = () => {
    setIsQRClicked(!isQRClicked);
  };

  const filteredThemes = themes.filter(theme => {
    const matchesSearch = theme.name
      .toLowerCase()
      .includes(roomName.toLowerCase());
    return matchesSearch;
  });

  return (
    <View style={styles.appBar}>
      <View style={styles.appBarInner}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={perfectSize(24)} color="#000" />
        </TouchableOpacity>

        <View style={styles.textInputContainer}>
          <AppTextInput
            placeholder="Search Themes"
            value={roomName}
            onChangeText={handleRoomNameChange}
            onBlur={handleRoomNameBlur}
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          onPress={handleQRButtonPress}
          style={styles.themeIconContainer}>
          <Icon name="grid" size={perfectSize(22)} color="#000" />
        </TouchableOpacity>
      </View>

      <View>
        {filteredThemes.length === 0 ? (
          <Text style={styles.noThemesText}>No themes found</Text>
        ) : (
          <FlatList
            data={filteredThemes}
            horizontal={true}
            keyExtractor={item => item.name} // Use item.name as key
            renderItem={({item}) => (
              <AppButton
                title={item.name}
                icon={null}
                onPress={() => handleThemeSelect(item.name)}
                style={[
                  styles.button,
                  selectedThemes.includes(item.name)
                    ? styles.selectedButton
                    : null,
                ]}
                textStyle={
                  selectedThemes.includes(item.name)
                    ? styles.selectedButtonText
                    : styles.buttonText
                }
              />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.themeList}
          />
        )}
      </View>

      <AppTheme
        themes={filteredThemes}
        onSelect={() => {}}
        selectedTheme={selectedThemes.join('')} // Pass selected themes as an array
        isQRClicked={isQRClicked}
        style={styles.appTheme}
        isVertical={true}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    flex: 1,
    backgroundColor: '#F5E8D8',
  },
  appBarInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: perfectSize(16),
    backgroundColor: '#F5E8D8',
    marginBottom: perfectSize(2),
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: perfectSize(10),
    marginTop: perfectSize(0),
  },
  textInputContainer: {
    flex: 1,
    marginLeft: perfectSize(40),
    marginRight: perfectSize(40),
  },
  input: {
    fontSize: perfectSize(14),
    paddingVertical: perfectSize(8),
    paddingHorizontal: perfectSize(15),
    backgroundColor: '#FFDBA6',
    borderRadius: perfectSize(30),
    height: perfectSize(40),
  },
  themeList: {
    padding: perfectSize(16),
    flexDirection: 'row',
    flexGrow: 1,
    overflow: 'hidden',
    marginBottom: perfectSize(30),
  },
  button: {
    backgroundColor: '#FFDBA6',
    height: perfectSize(44), // Reduced height
    width: perfectSize(120), // Reduced width
    borderRadius: perfectSize(30),
    justifyContent: 'center',
    paddingHorizontal: perfectSize(10), // Adjusted padding for better text placement
    marginRight: perfectSize(10),
    bottom: perfectSize(10),
  },
  selectedButton: {
    backgroundColor: '#000',
    borderColor: '#4A4A4A',
    borderWidth: perfectSize(2),
    zIndex: 10,
  },
  buttonText: {
    fontSize: perfectSize(12),
    color: '#4A4A4A',
    fontWeight: 'bold',
  },
  selectedButtonText: {
    fontSize: perfectSize(14),
    color: '#FFFFFF', // Change text color when selected
  },
  appTheme: {
    bottom: 70,
  },
  noThemesText: {
    fontSize: perfectSize(16),
    textAlign: 'center',
    color: '#4A4A4A',
    marginTop: perfectSize(20),
  },
  themeIconContainer: {
    marginLeft: 'auto',
  },
});
