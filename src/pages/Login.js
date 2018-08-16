import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Logo from '../components/Logo'
import Form from '../components/Form'

export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Logo/>
        <Form type="Login"/>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}> {"Don't have an account yet?"}
          </Text>
          <TouchableOpacity>
            <Text style={{  color:'#ffffff', fontSize:16, fontWeight:'500' }}> Signup </Text>
          </TouchableOpacity>
        </View>
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

  signupTextCont:{
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical:20,
    flexDirection:'row'
  },

  signupText:{
    color: 'rgba(255,255,255,0.7)',
    fontSize:16,
  },

});
