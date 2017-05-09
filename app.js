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
  Dimensions,
  Image
} from 'react-native';

const {height, width} = Dimensions.get('window');

import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';

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
          photo: require('./images/photos/park1.jpg'),
          title: 'Carritos',
          description: 'Estacionamiento 1'
        },
        {
          latlng: {
            latitude: -12.116117232017405,
            longitude: -77.02396631240845,
          },
          photo: require('./images/photos/park2.jpg'),
          title: 'Parking',
          description: 'Estacionamiento 2'
        },
        {
          latlng: {
            latitude: -12.117858540275225,
            longitude: -77.02471733093262,
          },
          photo: require('./images/photos/park3.jpg'),
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

  getDirections() {
    var url = 'https://maps.googleapis.com/maps/api/directions/json?mode=driving&origin=-12.117859,-77.024717&destination=-12.11832,-77.022271&key=AIzaSyCQLivZ-FMeEMkJqlZniZldMJwmfiw-8XY';

    return new Promise((resolve, reject) => {;
      fetch(url)
      .then((response) => {
        return response.json();
      }).then((json) => {
        resolve(json);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  componentDidMount() {
    this.getDirections().then((data) => {
      if (data.status !== 'OK') {
            return [];
          }

          let points = data.routes[0].overview_polyline.points;
          let steps = Polyline.decode(points);
          let polylineCoords = [];

          for (let i=0; i < steps.length; i++) {
            let tempLocation = {
              latitude : steps[i][0],
              longitude : steps[i][1]
            }
            polylineCoords.push(tempLocation);
          }

          this.setState({polylineCoords});
    });
  }

  render() {
    let coordinates = this.state.markers.map(marker => marker.latlng);
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
            >
              <MapView.Callout>
                <View style={styles.callout}>
                  <Image style={styles.calloutPhoto} source={marker.photo} />
                  <Text style={styles.callouTitle}>{marker.title}</Text>
                  <Text>{marker.description}</Text>
                </View>
              </MapView.Callout>
            </MapView.Marker>
          ))}
          <MapView.Polyline
            coordinates={this.state.polylineCoords}
            strokeWidth={3}
            strokeColor="blue"
           />
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
    flex: 2,
    width: width,
    height: height,
  },
  callout: {
    flex: 1,
  },
  calloutPhoto: {
    flex: 1,
    width: 160,
    height: 83,
    marginBottom: 10,
  },
  calloutTitle: {
    fontSize: 16
  }
});

AppRegistry.registerComponent('reactNative_map', () => reactNative_map);
