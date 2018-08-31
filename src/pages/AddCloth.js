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

        <Container style={styles.container}>
          <HeaderNew label="Add Clothes or Accessories"/>
          <Camera />
          <FooterNew mycloset={true}/>
        </Container>

      )
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#40C4FF',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
})
