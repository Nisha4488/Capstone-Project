import React from 'react';
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';
import HeaderNew from '../components/HeaderNew'
import FooterNew from '../components/FooterNew'
import AddOrUpdateCloth from '../components/AddOrUpdateCloth'


export default class CaptureClothDetails extends React.Component {
    render() {
      const clothUrl = this.props.location.state.clothUrl;
      return (
        <Container style={styles.container}>
          <HeaderNew label="Add Clothes or Accessories"/>
          <AddOrUpdateCloth clothUrl={clothUrl}/>
          <FooterNew mycloset={true}/>
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

CaptureClothDetails.propTypes = {
  location: PropTypes.shape({}),
}

CaptureClothDetails.defaultProps = {
  location: {
   state: {
    clothUrl: ''
    }
  }
}
