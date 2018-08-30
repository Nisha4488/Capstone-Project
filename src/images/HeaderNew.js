import React from 'react';
import { Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { StyleSheet, Image } from 'react-native';
import {Link, Redirect, withRouter} from 'react-router-native';

class HeaderNew extends React.Component {
  constructor(props){
   super(props);
   this.goBack = this.goBack.bind(this);
  }

  goBack(){
    this.props.history.goBack();
  }
  render() {
    return (
    <Header style={styles.container}>
      <Left>
      <Button transparent active={this.props.outfit} onPress={this.goBack}>
        <Image
          style={{width: 40, height: 40, }}
          source={require('../images/back.png')}
        />
      </Button>
     </Left>
      <Body>
        <Title style={{width:280, alignSelf:'center', fontSize:20, }}>{this.props.label}</Title>
      </Body>
      <Right>
      <Button transparent>
        <Link to= "/login">
        <Image
          style={{width: 30, height: 30, }}
          source={require('../images/shutdown.png')}
        />
        </Link>
      </Button>
      </Right>
    </Header>
   );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#4E342E',
    width: 400,
  },
})

export default withRouter(HeaderNew);
