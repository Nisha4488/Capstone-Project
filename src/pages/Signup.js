import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground} from 'react-native';
import { Link, Redirect } from 'react-router-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Logo from '../components/Logo'

const REGISTER_USER = gql`
  mutation registerUser($user: UserInput) {
   registerUser(user: $user) {
     name
     email
     password
     _id
   }
 }
`;

export default class Signup extends React.Component {
  constructor(props) {
   super(props);
     this.state={
       Name:'',
       Email:'',
       Password:'',
       redirect: false,
       message:''
     }
  }

async onPress(mutation) {
  if(!this.state.Name || !this.state.Email || !this.state.Password){
    const message="Please enter all details"
    return this.setState({message})
  }
  // // if name is empty then set message to display error and return
  // if(!this.state.Name){
  //   return this.setState({message:'Name is Empty'})
  // }
  //
 const user = {
    name: this.state.Name,
    email: this.state.Email,
    password: this.state.Password
    }
    try {
     const { data, error } = await mutation({ // Make API call to save user details
     mutation: REGISTER_USER,
     variables: {user},
    });
    this.setState({redirect: true, message:''})
    } catch(err) {
    this.setState({message: 'Registration failed. Try again'})
   }
 }

render() {
  if (this.state.redirect){
    return <Redirect to="/login"/>
   }

  return (
    <Mutation mutation={REGISTER_USER}>
     {(mutation, { data }) => (
      <ImageBackground style={{width: 380, height: '100%', position:'absolute',}} source={require('../images/background1.jpeg')} >
      <View style={styles.container}>
        <Logo/>
        <Text style={{color:'red'}}>{this.state.message}</Text>
        <TextInput style={styles.inputBox}
              placeholder="Name"
              placeholderTextColor="#000000"
              onChangeText={(Name) => this.setState({Name})}
              value={this.state.Name}
        />
        <TextInput style={styles.inputBox}
              placeholder="Email"
              placeholderTextColor="#000000"
              onChangeText={(Email) => this.setState({Email})}
              value={this.state.Email}
        />
        <TextInput style={styles.inputBox}
            placeholder="Password"
            placeholderTextColor="#000000"
            secureTextEntry={true}
            onChangeText={(Password) => this.setState({Password})}
            value={this.state.Password}
        />
       <TouchableOpacity style={styles.button} onPress={this.onPress.bind(this, mutation)}>
           <Text style={styles.buttonText}>Signup</Text>
       </TouchableOpacity>
       <View style={styles.signupTextCont}>
            <Text style={styles.signupText}> Already have an account? </Text>
            <Link to= "/">
              <Text style={{   fontWeight: '500', fontSize:18, fontWeight:'500'  }}> Sign in </Text>
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
  flex: 1,
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
