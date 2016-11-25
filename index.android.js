/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  View
} from 'react-native';
import App from "./src/App";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#689BB5',
  },
})

export default class smarts extends Component {
  render() {
    return (
      <View style={styles.container}>
        <App />
      </View>
    );
  }
}

AppRegistry.registerComponent('smarts2', () => smarts);
