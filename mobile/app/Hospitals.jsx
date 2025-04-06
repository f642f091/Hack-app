import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import PinDetailsModal from '../components/PinDetailsModal';

// harcode LMH hospital
const hospitalPins = [
  {
    name: 'LMH Health',
    type: 'Clinic',
    description: 'Local hospital offering IBD and digestive care services.',
    address: '325 Maine St, Lawrence, KS 66044',
    latitude: 38.9609,
    longitude: -95.2488,
  },
];

const HospitalScreen = () => {
  const [selectedPin, setSelectedPin] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleMarkerPress = (place) => {
    setSelectedPin(place);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 38.9609,
          longitude: -95.2488,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {hospitalPins.map((pin, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
            title={pin.name}
            onPress={() => handleMarkerPress(pin)}
          />
        ))}
      </MapView>

      <PinDetailsModal
        visible={modalVisible}
        place={selectedPin}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default HospitalScreen;
