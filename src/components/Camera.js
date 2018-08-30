import React from "react";
import { Content, CardItem, Text, Body, Right, Button } from "native-base";
import { Link } from 'react-router-native';
import { StyleSheet, Image } from 'react-native';

export default class Camera extends React.Component {
render() {
  return (
    <Content padder style={styles.container}>
      <Body style={{marginVertical:40,  alignItems: 'center', justifyContent: 'center',   flex: 1, }}>
        <Text style={{fontSize:20, marginHorizontal:25,  }}> Add pictures of your clothes or accessories </Text>
      </Body>
      <CardItem bordered>
        <Right>
          <Button transparent>
          <Link to= "/activecamera">
            <Image style={{width: 40, height: 30,}} source={require('../images/camera.png')}/>
          </Link>
         </Button>
       </Right>
     </CardItem>
  </Content>
    );
  }
}

const styles = StyleSheet.create({
container: {
  backgroundColor:'#EF6C00',
  width: 400,
  marginVertical:-10
  },
})
