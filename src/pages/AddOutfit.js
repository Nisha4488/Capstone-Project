import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import HeaderNew from '../components/HeaderNew'
import FooterNew from '../components/FooterNew'
import AddOrUpdateOutfit from '../components/AddOrUpdateOutfit'

export default class AddOutfit extends React.Component {
  render() {
    const outfit = this.props.location.state ? this.props.location.state.outfit: {};
    return (
      <View style={styles.container}>
        <HeaderNew label="Create Your Outfit" />
        <AddOrUpdateOutfit outfit = {outfit} />
        <FooterNew outfit={true}/>
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
