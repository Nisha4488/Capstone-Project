import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';
import HeaderNew from '../components/HeaderNew'
import FooterNew from '../components/FooterNew'

import RecommendationGallery from '../components/RecommendationGallery'

export default class Recommendation extends React.Component {
    render() {
      return (
        <Container style={styles.container}>
          <HeaderNew label="Recommended Outfits" />
          <RecommendationGallery/>
          <FooterNew recommendation={true}/>
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
