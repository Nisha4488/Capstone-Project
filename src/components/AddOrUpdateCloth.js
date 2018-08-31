import React from 'react';
import { StyleSheet,
      View,
      Text,
      ScrollView,
      Image,
      TouchableOpacity,
    } from 'react-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Link, Redirect } from 'react-router-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Storage from '../utils/Storage'

const optionsWeather =['Fall', 'Spring', 'Summer', 'Winter']
const optionsColor =['Blue', 'Red', 'Green', 'Purple', 'Black', 'Orange', 'Yellow', 'Gold', 'Wine', 'Maroon', 'Pink', 'Coral', 'Gold', 'White', 'Silver']
const optionsType = ['Top', 'Bottom', 'Accessories', 'Dress', 'Footwear']

const SAVE_CLOTH= gql`
mutation saveCloth($cloth: ClothInput){
    saveCloth(cloth: $cloth){
      _id
      userId
      image
      type
      color
      weather
    }
  }
`;

export default class AddOrUpdateCloth extends React.Component {
  constructor(props){
    super(props)
    this.state={
      _id:this.props._id,
      image:this.props.clothUrl,
      color:'',
      type:'',
      weather:'',
      redirect:false
    }
  }

async onPress(mutation) {
  const userId = await Storage.fetchUserId()
  const clothOb = {
    _id:this.state._id,
    image:this.state.image,
    color:this.state.color,
    type:this.state.type,
    weather:this.state.weather,
    userId:userId
   };

  const { data, error } = await mutation({ // Make API call to save cloth details
    mutation: SAVE_CLOTH,
    variables: {cloth: clothOb},
   });
  this.setState({redirect:true});
 }

changeType = (idx, value) => {
  this.setState({type: value});
 }

changeColor = (idx, value) => {
  this.setState({color: value});
 }

changeWeather= (idx, value) => {
  this.setState({weather: value});
}

 render() {
    if (this.state.redirect){
      return <Redirect to="/mycloset"/>
    }
  return (
    <Mutation mutation={SAVE_CLOTH}>
      {(mutation, { data }) => (
       <View style={styles.container}>
        <View><Text style={styles.header}>Your uploaded item</Text></View>
        <Image source={{uri: this.props.clothUrl}} loadingIndicatorSource={true} style={styles.image} />
        <View><Text style={styles.header}>Review Details</Text></View>
        <View style={styles.feature}>
          <View> <Text style={styles.content}>Type:</Text> </View>
          <ModalDropdown options={optionsType}  dropdownStyle={{ height: 35 * optionsType.length, width:100, }}  onSelect={this.changeType} value={this.state.type}/>
          </View>
        <View style={styles.feature}>
         <View><Text style={styles.content}>Color:</Text></View>
         <ModalDropdown options={optionsColor}  dropdownStyle={{ height: 35 * optionsColor.length, width:100 }}  onSelect={this.changeColor} value={this.state.color}/>
      </View>
      <View style={styles.feature}>
          <View><Text style={styles.content}>Weather:</Text></View>
          <ModalDropdown options={optionsWeather}  dropdownStyle={{ height: 35 * optionsWeather.length, width:100 }}  onSelect={this.changeWeather} value={this.state.weather}/>
      </View>
      <TouchableOpacity style={styles.button} onPress={this.onPress.bind(this, mutation)}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  )}
</Mutation>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flexGrow:1,
    width:380,
  },
  button:{
    width:300,
    backgroundColor:'#0091EA',
    borderRadius:10,
    marginHorizontal:30,
    padding:10,
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 5
  },
  buttonText:{
    fontSize:16,
    fontWeight:'500',
    textAlign:'center'
  },
 image:{
    height: 300,
    width: 300,
    alignSelf: 'center'
  },
  header:{
    fontWeight:'500',
    fontSize:25,
    textAlign:'center',
    marginVertical:10,
  },
  feature:{
    marginVertical:5,
    marginHorizontal:20,
    flexDirection:'row',
    flex: 1,
    alignItems:'flex-start',
    justifyContent: 'flex-start'
  },
  content:{
    alignSelf:'flex-start',
    fontSize:20,
    width: 100
  }
})
