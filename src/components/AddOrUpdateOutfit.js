import React from 'react';
import { StyleSheet,
      View,
      Text,
      ScrollView,
      Image,
      TouchableOpacity,
    } from 'react-native';
import SelectMultiple from 'react-native-select-multiple'
import OutfitSelector from './OutfitSelector'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Link, Redirect } from 'react-router-native';
import Storage from '../utils/Storage'

const weather = ['Fall', 'Spring', 'Summer', 'Winter']
const occassion =['Office', 'Workout', 'Party', 'Casual']

const SAVE_OUTFIT= gql`
mutation saveOutfit($outfit: OutfitInput){
    saveOutfit(outfit: $outfit){
      _id
      userId
      clothesId
      weather
      occassion
    }
  }
`;

export default class AddOrUpdateOutfit extends React.Component {
constructor(props){
  super(props)
  const outfit = this.props.outfit || {};
  this.state={
    _id: outfit._id,
    selectedWeather: outfit.weather || [],
    selectedOccassion:outfit.occassion || [],
    outfitClothIds: outfit.clothesId || []

  }
}
updateOutfitClothIds = (outfitClothIds) => {
  this.setState({ outfitClothIds })
}

  onSelectionsWeatherChange = (selectedWeather) => {
    this.setState({ selectedWeather: selectedWeather.map(w => w.value) })
  }
  onSelectionsOccassionChange = (selectedOccassion) => {
    this.setState({ selectedOccassion: selectedOccassion.map(o => o.value) })
  }

  async onPress(mutation) {
    const userId = await Storage.fetchUserId()
    const outfitOb = {
      _id:this.state._id,
      clothesId:this.state.outfitClothIds,
      weather:this.state.selectedWeather,
      occassion:this.state.selectedOccassion,
      userId,
     };
    console.log('outfitOb ', outfitOb)
    const { data, error } = await mutation({ // Make API call to save cloth details
      mutation: SAVE_OUTFIT,
      variables: {outfit: outfitOb},
     });
     console.log('after saving outfit ', data, error);
     this.setState({redirect:true});
   }

  render() {
    console.log('selectedOccassion ', this.state)
    if (this.state.redirect){
      return <Redirect to="/outfit"/>
    }
    return (
      <Mutation mutation={SAVE_OUTFIT}>
        {(mutation, { data }) => (
          <View style={styles.container}>
            <View><Text style={styles.content}>Select clothes or accessories to create outfit</Text></View>
            <OutfitSelector outfitClothIds={this.state.outfitClothIds} updateOutfitClothIds={this.updateOutfitClothIds}/>
            <View style={{borderColor:'black',borderWidth:1,height:1,width:'100%'}}/>
            <View><Text style={styles.content}>Map outfit to suitable weather and occassion</Text></View>
            <View style={styles.checkbox}>
              <SelectMultiple
              items={weather}
              selectedItems={this.state.selectedWeather}
              onSelectionsChange={this.onSelectionsWeatherChange}
              />
             <SelectMultiple
              items={occassion}
              selectedItems={this.state.selectedOccassion}
              onSelectionsChange={this.onSelectionsOccassionChange}
             />
          </View>
          <View style={{borderColor:'black',borderWidth:1,height:1,width:'100%'}}/>
          <TouchableOpacity style={styles.button} onPress={this.onPress.bind(this, mutation)}>
            <Text style={styles.buttonText}>{ this.state._id ? 'Update': 'Create' }</Text>
          </TouchableOpacity>
    </View>
  )}
</Mutation>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#EF6C00',
    width:380,
    marginVertical:15,
  },
  button:{
    width:300,
    backgroundColor:'#E65100',
    borderRadius:10,
    marginHorizontal:30,
    padding:10,
    alignItems:'center',
    justifyContent:'center',
    marginVertical:10,
  },
  buttonText:{
    fontSize:16,
    fontWeight:'500',
    color: '#ffffff',
    textAlign:'center',
  },
  content:{
    fontWeight:'500',
    fontSize:20,
    textAlign:'center',
    marginVertical:10,
  },
  checkbox:{
    flexDirection:'row',
    marginHorizontal:10,
    marginVertical:10,
  },
  image:{
    flex:1
  },
});
