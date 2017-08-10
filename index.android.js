import React, { Component } from 'react';
import {Provider} from "react-redux"
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import store from "./src/store"
import Auth from "./src/containers/Auth"
import Index from "./src"
import { authActions } from "./src/store/actions/authActions"

export default class touristGuid extends Component {
  render() {
    return (
        <Provider style={styles.container} store={store}>
          <Index/>
        </Provider>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});
AppRegistry.registerComponent('touristGuid', () => touristGuid);
