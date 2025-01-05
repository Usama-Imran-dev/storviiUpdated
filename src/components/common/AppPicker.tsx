import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {create, PREDEF_RES} from 'react-native-pixel-perfect';

const perfectSize = create(PREDEF_RES.iphoneX.width);

interface AppPickerProps {
  selectedValue?: string;
  items: string[];
  onValueChange: (itemValue: string) => void;
  label?: string;
  containerStyle?: any;
  isButton?: boolean;
  triggerOpen?: boolean; // For external control
  onClose?: () => void; // Callback when the modal closes
}

export default function AppPicker({
  selectedValue,
  items,
  onValueChange,
  label,
  containerStyle,
  isButton = true,
  triggerOpen = false,
  onClose,
}: AppPickerProps) {
  const [modalVisible, setModalVisible] = useState(triggerOpen);

  // Open/close modal when external trigger changes
  React.useEffect(() => {
    setModalVisible(triggerOpen);
  }, [triggerOpen]);

  const closeModal = () => {
    setModalVisible(false);
    if (onClose) onClose();
  };

  const renderItem = ({item}: {item: string}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        onValueChange(item);
        closeModal();
      }}>
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {isButton && (
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setModalVisible(true)}>
          <Text
            style={{
              ...styles.pickerButtonText,
              color: selectedValue ? '#000' : '#000',
            }}>
            {selectedValue || label}
          </Text>
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={item => item}
            />
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  pickerButton: {
    backgroundColor: '#FFDBA6',
    borderRadius: perfectSize(30),
    padding: perfectSize(18),
  },
  pickerButtonText: {
    fontSize: perfectSize(16),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFE5BF',
    borderTopLeftRadius: perfectSize(20),
    borderTopRightRadius: perfectSize(20),
    padding: perfectSize(20),
    width: '100%',
    maxHeight: '80%',
  },
  item: {
    padding: perfectSize(15),
    borderBottomWidth: 1,
    borderBottomColor: '#FFDBA6',
  },
  itemText: {
    fontSize: perfectSize(16),
    color: '#000',
  },
  closeButton: {
    marginTop: perfectSize(20),
    padding: perfectSize(10),
    backgroundColor: '#FFDBA6',
    borderRadius: perfectSize(15),
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: perfectSize(16),
    fontWeight: 'bold',
  },
});
