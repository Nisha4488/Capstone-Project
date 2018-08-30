import React from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { StyleSheet, Image } from 'react-native';
import {Link, Redirect} from 'react-router-native';
export default class FooterNew extends React.Component {

  render() {
    return (
    <Footer style={styles.container}>
      <FooterTab>
        <Button vertical active={this.props.recommendation}>
        <Link to= "/recommendation">
        <Image
          style={{width: 40, height: 30,}}
          source={require('../images/reco.png')}
          />
          </Link >
          <Text style={styles.name}>Recommender</Text>
        </Button>

        <Button vertical active={this.props.outfit}>
        <Link to= "/outfit">
        <Image
          style={{width: 40, height: 30,}}
          source={require('../images/hang.png')}
          />
          </Link >
          <Text style={styles.name}>Outfits</Text>
        </Button>

        <Button vertical active={this.props.mycloset}>
        <Link to= "/mycloset">
        <Image
          style={{width: 40, height: 30,}}
          source={require('../images/clos.png')}
          />
          </Link >
          <Text style={styles.name}>Closet</Text>
        </Button>

      </FooterTab>
    </Footer>
    );
  }
}


const styles = StyleSheet.create({
 container: {
  backgroundColor:'#0091EA',
  width: 400,
  },
 name:{
  color: '#000000',
  }
})
