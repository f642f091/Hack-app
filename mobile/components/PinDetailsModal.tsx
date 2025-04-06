import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Linking, Button } from 'react-native';

const PinDetailsModal = ({ visible, onClose, place }) => {
  if (!place) return null;

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.address)}`;
    Linking.openURL(url);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>{place.name}</Text>
          <Text style={styles.subtitle}>{place.type}</Text>
          <Text style={styles.description}>{place.description}</Text>
          <Button title="Get Directions" onPress={handleDirections} color="#22c55e" />
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalBox: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 12,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 12,
  },
  closeBtn: {
    marginTop: 12,
    alignSelf: 'center',
  },
  closeText: {
    color: '#38bdf8',
  },
});

export default PinDetailsModal;
