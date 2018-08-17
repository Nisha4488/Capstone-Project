import React from 'react';
import { StyleSheet,
      View,
      Text
    } from 'react-native';
import {Link, Redirect} from 'react-router-native';
import Footer from '../components/Footer'

export default class Closet extends React.Component {
    render() {
      return (
        <View style={styles.container}>
            <Footer/>
            </View>
          )
        }
      }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EF6C00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
})
