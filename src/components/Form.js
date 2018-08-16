import React from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity} from 'react-native';

export default class Form extends React.Component {
  render() {
    return (
      <View style={styles.container}>
       <TextInput style={styles.inputBox} placeholder="Email" placeholderTextColor="#ffffff"/>
       <TextInput style={styles.inputBox}
          placeholder="Password"
          placeholderTextColor="#ffffff"
          secureTextEntry={true} />
       <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{this.props.type}</Text>
       </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

inputBox:{
  width:300,
  backgroundColor:'rgba(255,255,255,0.2)',
  borderRadius:25,
  padding:10,
  paddingHorizontal:16,
  fontSize:16,
  marginVertical:10
},

button:{
  width:300,
  backgroundColor:'#E65100',
  borderRadius:25,
  marginVertical:10,
  padding:10
},
buttonText:{
  fontSize:16,
  fontWeight:'500',
  color: '#ffffff',
  textAlign:'center'
}
});
