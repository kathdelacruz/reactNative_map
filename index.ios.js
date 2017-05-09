/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');

import MapView from 'react-native-maps';

export default class reactNative_map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: -12.1164923,
        longitude: -77.02417560000004,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      markers: [
        {
          latlng: {
            latitude: -12.117376010209252,
            longitude: -77.02246427536011,
          },
          title: 'Carritos',
          description: 'Estacionamiento 1'
        },
        {
          latlng: {
            latitude: -12.116117232017405,
            longitude: -77.02396631240845,
          },
          title: 'Parking',
          description: 'Estacionamiento 2'
        },
        {
          latlng: {
            latitude: -12.117858540275225,
            longitude: -77.02471733093262,
          },
          title: 'Surquillo parking',
          description: 'Estacionamiento 3'
        }
      ]
    };
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={false}
          showsPointsOfInterest={false}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
          {this.state.markers.map((marker, i) => (
            <MapView.Marker
              key={i}
              coordinate={marker.latlng}
              image={require('./images/icon.png')}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
        <View style={styles.container}>
          <Text>Latitud: {this.state.region.latitude}</Text>
          <Text>Longitud: {this.state.region.longitude}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    width: width,
    height: height - 90,
  },
});

AppRegistry.registerComponent('reactNative_map', () => reactNative_map);
