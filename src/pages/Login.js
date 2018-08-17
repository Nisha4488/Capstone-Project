import React from 'react';
import { StyleSheet,
   Text,
   View,
   TouchableOpacity,
   TextInput
      } from 'react-native';
import {Link, Redirect} from 'react-router-native';
import Logo from '../components/Logo'


export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    Email:'',
    Password:'',
    redirect:false
  }
}
async onPress(){
    console.log(this.state.Email, this.state.Password)
    this.setState({redirect:true})
  }
  render() {
    if (this.state.redirect){
      return <Redirect to="/closet"/>
    }
    return (
      <View style={styles.container}>
        <Logo/>
        <TextInput style={styles.inputBox}
            placeholder="Email"
            placeholderTextColor="#ffffff"
            onChangeText={(Email) => this.setState({Email})}
            value={this.state.Email}
        />
         <TextInput style={styles.inputBox}
            placeholder="Password"
            placeholderTextColor="#ffffff"
            secureTextEntry={true}
            onChangeText={(Password) => this.setState({Password})}
            value={this.state.Password}
          />
         <TouchableOpacity style={styles.button} onPress={this.onPress.bind(this)}>
            <Text style={styles.buttonText}>Login</Text>
         </TouchableOpacity>

        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}> {"Don't have an account yet?"}
          </Text>
          <Link to= "/signup">
              <Text style={{  color:'#ffffff', fontSize:16, fontWeight:'500' }}> Signup </Text>
          </Link>
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
