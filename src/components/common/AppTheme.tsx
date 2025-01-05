import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface AppThemeProps {
  themes: {name: string; image: any}[]; // Structured data with name and image
  onSelect: (selectedTheme: string) => void;
  selectedTheme: string;
  isQRClicked: boolean;
  style?: ViewStyle; // Optional style prop
  numColumns?: number; // Optional prop to control the number of columns
  isVertical?: boolean; // Optional prop to control vertical or horizontal layout
}

const AppTheme: React.FC<AppThemeProps> = ({
  themes,
  onSelect,
  selectedTheme,
  isQRClicked,
  style, // Destructure the style prop
  numColumns = 2, // Default to single-column
  isVertical = false, // Default to horizontal layout
}) => {
  const renderItem = ({
    item,
    index,
  }: {
    item: {name: string; image: any};
    index: number;
  }) => {
    const containerSize = isQRClicked ? 100 : 186;
    const imageSize = isQRClicked ? 100 : 256;

    return (
      <TouchableOpacity
        style={[
          styles.themeContainer,
          {width: containerSize, height: imageSize}, // Adjust container size
        ]}
        onPress={() => onSelect(item.name)} // Pass the theme name to onSelect
      >
        <Image
          source={item.image} // Use the 'image' field for local image imports
          style={[styles.themeImage, {width: imageSize, height: imageSize}]} // Adjust image size
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  // Filter themes to show only those selected
  const filteredThemes =
    selectedTheme.length === 0
      ? themes // If no themes are selected, show all themes
      : themes.filter(theme => selectedTheme.includes(theme.name));

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={filteredThemes} // Render only selected themes
        renderItem={renderItem}
        keyExtractor={(item, index) => item.name + index.toString()} // Use a combination of the item's name and index as the key
        style={styles.flatList}
        horizontal={!isVertical} // Set horizontal layout based on prop
        numColumns={isVertical ? numColumns : 1} // Apply numColumns only in vertical mode
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  flatList: {
    marginTop: 10,
  },
  themeContainer: {
    marginRight: 10,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeImage: {
    borderRadius: 30,
    width: '100%', // Ensure image takes full width of the container
    height: '100%', // Ensure image takes full height of the container
  },
});

export default AppTheme;
