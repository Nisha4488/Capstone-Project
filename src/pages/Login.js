import React from 'react';
import { StyleSheet,
   Text,
   View,
   TouchableOpacity,
   TextInput,
   ImageBackground
      } from 'react-native';
import {Link, Redirect} from 'react-router-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Logo from '../components/Logo';
import Storage from '../utils/Storage'

const LOGIN_USER = gql`
mutation loginUser($user: UserInput) {
  loginUser(user: $user) {
    email
    password
    _id
  }
}
`;


export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    message: '',
    Email:'',
    Password:'',
    redirect:false
  }
}

async onPress(mutation){
    if(!this.state.Email || !this.state.Password){
      const message="Please enter all details"
      return this.setState({message})
    }
    const user = {
      email: this.state.Email,
      password: this.state.Password
    }
    try {
      const { data, error } = await mutation({ // Make API call to save user details
        mutation: LOGIN_USER,
        variables: {user},
      });
      // Read userId from data
      const userId =  data.loginUser._id
      // Write userId into storage
      await Storage.wrirteUserId(userId);
      // Redirect to default page
      this.setState({redirect:true, message: ''});
    } catch(err) {
      this.setState({message: 'Invalid Email or Password. Try again'});
      // this.setState({redirect:true, message: ''});
    }
  }
  render() {
    if (this.state.redirect){
      return <Redirect to="/mycloset"/>
    }
    return (
      <Mutation mutation={LOGIN_USER}>
       {(mutation, { data }) => (
       <ImageBackground style={{width: 380, height: '100%', position:'absolute',}} source={require('../images/background1.jpeg')} >
       <View style={styles.container}>
        <Logo/>
        <Text style={{color:'red'}}>{this.state.message}</Text>
        <TextInput style={styles.inputBox}
          placeholder="Email"
          autoCapitalize = "none"
          placeholderTextColor="#000000"
          onChangeText={(Email) => this.setState({Email})}
          value={this.state.Email}
        />
        <TextInput style={styles.inputBox}
          placeholder="Password"
          autoCapitalize = "none"
          placeholderTextColor="#000000"
          secureTextEntry={true}
          onChangeText={(Password) => this.setState({Password})}
          value={this.state.Password}
        />
        <TouchableOpacity style={styles.button} onPress={this.onPress.bind(this, mutation)}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}> {"Don't have an account yet?"} </Text>
          <Link to= "/signup">
             <Text style={{   fontSize:18, fontWeight:'500' }}> Signup </Text>
          </Link>
        </View>
      </View>
    </ImageBackground>
     )}
    </Mutation>
    );
  }
}

const styles = StyleSheet.create({
container: {
  flex:1,
  alignItems: 'center',
  justifyContent: 'center',
},
inputBox:{
  width:300,
  backgroundColor:'#FB8C00',
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
  fontSize:16,
  },
});
