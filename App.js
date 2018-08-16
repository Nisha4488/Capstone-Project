import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup'
import Routes from './src/Routes'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Signup/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EF6C00',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
