import React from "react";
import { Content, Text, Body } from "native-base";
import { StyleSheet } from 'react-native';

export default class EmptyCloset extends React.Component {
  render() {
    return (
      <Content padder style={styles.container}>
       <Body style={{marginVertical:40,  alignItems: 'center', justifyContent: 'center',   flex: 1, }}>
          <Text style={{fontSize:20, marginHorizontal:25}}> Your closet is empty, please add pictures of your clothes or accessories </Text>
       </Body>
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
