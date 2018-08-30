import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';
import HeaderNew from '../components/HeaderNew'
import FooterNew from '../components/FooterNew'
import AddOutfitButton from '../components/AddOutfitButton'
import OutfitGallery from '../components/OutfitGallery'

export default class Outfit extends React.Component {
    render() {
      return (
        <Container style={styles.container}>
          <HeaderNew label="Create Your Outfit" />
          <AddOutfitButton/>
          <OutfitGallery/>
          <FooterNew outfit={true}/>
        </Container>
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
