import React from 'react';
import { Content, CardItem, Right, Button } from 'native-base';
import { Link } from 'react-router-native';
import { StyleSheet, Image } from 'react-native';

export default class AddClothButton extends React.Component {
  render() {
    return (
      <Content padder style={styles.container}>
       <CardItem bordered>
         <Right>
          <Button transparent >
           <Link to= "/addcloth">
            <Image style={{width: 40, height: 30,}} source={require('../images/add.png')}/>
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
    width: 400,
    height:40
  },
})
