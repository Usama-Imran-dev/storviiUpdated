import React, {ReactNode, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {create, PREDEF_RES} from 'react-native-pixel-perfect';
import AppButton from './AppButton';

const perfectSize = create(PREDEF_RES.iphoneX.width);

interface AppModelProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  onImageSelect?: (image: string) => void;
}

const AppModel = ({
  isVisible,
  onClose,
  title,
  children,
  onImageSelect,
}: AppModelProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Modal Header */}
          {title && (
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <AppButton
                title="Close"
                onPress={onClose}
                textStyle={styles.closeButtonText}
                style={styles.closeButton}
                icon="close"
              />
            </View>
          )}

          {/* Divider */}
          {title && <View style={styles.divider} />}

          {/* Image Section */}

          {/* Image Selection */}
          {onImageSelect && (
            <FlatList
              data={children as any[]}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  key={index}
                  style={styles.itemContainer}
                  onPress={() => {
                    setSelectedImage(index);
                    onImageSelect(item as string);
                  }}>
                  <Image
                    source={item as any}
                    style={[
                      styles.image,
                      selectedImage === index && styles.selectedImage,
                    ]}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              numColumns={4}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFE5BF',
    borderTopLeftRadius: perfectSize(30),
    borderTopRightRadius: perfectSize(30),
    width: '100%',
    padding: perfectSize(16),
    paddingBottom: perfectSize(24),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: perfectSize(10),
  },
  title: {
    fontSize: perfectSize(20),
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    marginTop: perfectSize(10),
  },
  closeButtonText: {
    color: '#000',
    fontSize: perfectSize(16),
  },
  divider: {
    marginVertical: perfectSize(10),
    borderBottomWidth: 1,
    borderBottomColor: '#EFC078',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: perfectSize(16),
  },
  centeredImage: {
    justifyContent: 'center',
  },
  image: {
    width: perfectSize(70),
    height: perfectSize(70),
    borderRadius: perfectSize(10),
  },
  subtitle: {
    fontSize: perfectSize(16),
    color: '#333',
    textAlign: 'center',
    marginVertical: perfectSize(8),
  },
  input: {
    top: 20,
  },
  secondInput: {
    marginBottom: perfectSize(16),
    marginTop: perfectSize(16),
    top: 22,
  },
  itemContainer: {
    flex: 1,
    margin: perfectSize(8),
    alignItems: 'center',
  },
  selectedImage: {
    borderWidth: perfectSize(2),
    borderColor: '#000',
    borderRadius: perfectSize(40),
  },
  confirmButton: {
    marginTop: perfectSize(20),
    backgroundColor: '#000',
    height: 50,
    width: '100%',
    justifyContent: 'center',
    borderRadius: 30,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: perfectSize(18),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AppModel;
