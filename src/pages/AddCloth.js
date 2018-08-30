import React from 'react';
import { StyleSheet,
      View,
      Text,
      ScrollView,
      ImageBackground
    } from 'react-native';
import { Container } from 'native-base';
import HeaderNew from '../components/HeaderNew'
import FooterNew from '../components/FooterNew'
import Camera from '../components/Camera'


export default class AddCloth extends React.Component {
    render() {
      return (
        <ImageBackground style={{width: 380, height: '100%', position:'absolute',}} source={require('../images/background1.jpeg')} >
        <Container style={styles.container}>
          <HeaderNew label="Add Clothes or Accessories"/>
          <Camera />
          <FooterNew mycloset={true}/>
        </Container>
        </ImageBackground>
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
