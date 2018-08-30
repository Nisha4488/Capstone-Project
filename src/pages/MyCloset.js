import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { Container } from 'native-base';
import HeaderNew from '../components/HeaderNew'
import FooterNew from '../components/FooterNew'
import AddClothButton from '../components/AddClothButton'
import ClosetGallery from '../components/ClosetGallery'

export default class MyCloset extends React.Component {
    render() {
      return (
        <ImageBackground style={{width: 380, height: '100%'}} source={require('../images/background1.jpeg')}>
        <Container style={styles.container}>
          <HeaderNew label="Add Clothes or Accessories"/>
          <AddClothButton/>
          <ClosetGallery/>
          <FooterNew mycloset={true}/>
        </Container>
        </ImageBackground>
        )
      }
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#40C4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
