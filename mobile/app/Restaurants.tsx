import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import PinDetailsModal from '../components/PinDetailsModal';

// hardcode a pin to a healthy restaurant
const restaurantPins = [
  {
    name: 'Noodles & Company',
    type: 'Restaurant',
    description: 'Healthy noodle bowls and options for sensitive diets.',
    address: '8th & Mass St, Lawrence, KS 66044',
    latitude: 38.9598,
    longitude: -95.2510,
  },
];

const RestaurantScreen = () => {
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
          latitude: 38.9598,
          longitude: -95.2510,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {restaurantPins.map((pin, index) => (
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

export default RestaurantScreen;
