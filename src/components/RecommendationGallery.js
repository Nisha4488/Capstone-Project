import React from 'react';
import { StyleSheet,
      View,
      Text,
      ScrollView,
      Image,
      TouchableOpacity,
    } from 'react-native';
import SelectMultiple from 'react-native-select-multiple'
import { Spinner} from 'native-base';
import Storage from '../utils/Storage'
import gql from 'graphql-tag';
import { Query , Mutation} from "react-apollo";

const SAVE_OUTFIT= gql`
  mutation saveOutfit($outfit: OutfitInput){
   saveOutfit(outfit: $outfit){
     _id
     userId
     lastWornDate
     occassion
    }
  }
`;

const GET_RECOMMENDATIONS = gql`
   query getRecommendations($userId: String){
     getRecommendations(userId: $userId){
       _id
       userId
       clothesId
       lastWornDate
       clothes{
         _id
         image
       }
        occassion
     }
   }
`;

const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

export default class RecommendationGallery extends React.Component {
  constructor(props){
  super(props)
  this.state={
      userId:'',
      }
    }

  async onPress(outfit, mutation) {
    const outfitOb = {
      _id:outfit._id,
      lastWornDate: outfit.lastWornDate ? null : new Date().toISOString(),
      };

    const { data, error } = await mutation({ // Make API call to save outfit details
      mutation: SAVE_OUTFIT,
      variables: {outfit: outfitOb},
      update: (store, { data }) => {
      // Read the data from the cache for this query.
      const existingData = store.readQuery({ query: GET_RECOMMENDATIONS, variables: { userId:this.state.userId } });
      console.log('existingData' , existingData)
        // Find index of outfit
      let index = -1;
      for(let i=0; i < existingData.getRecommendations.length; i++) {
        if(existingData.getRecommendations[i]._id === outfit._id) {
          index = i;
          break;
          }
        }

      existingData.getRecommendations[index] = { ...existingData.getRecommendations[index], lastWornDate: outfitOb.lastWornDate };
      // Write the data back to the cache.
      store.writeQuery({ query: GET_RECOMMENDATIONS, variables: { userId:this.state.userId }, data: existingData });
     },
   });
  }


async componentDidMount() {
    const userId = await Storage.fetchUserId();
    this.setState({userId})
  }

render() {
  if(!this.state.userId){
    return <Spinner/>
  }

return (
  <Mutation mutation={SAVE_OUTFIT}>
    {(mutation, { data }) => (
      <ScrollView style={{height:400}}>
      <Query
        query={GET_RECOMMENDATIONS}
        variables= {{userId:this.state.userId}}
        fetchPolicy='network-only'
      >
      {({ loading, error, data, refetch }) => {
        if (loading) return <View><Text>Loading....</Text></View>;
        if (error) return <View><Text>Error... :-(</Text></View>;
        if(data.getRecommendations.length ===0) {
        <View><Text>Your RecommendationGallery is empty..Please create outfits first to get recommendations </Text></View>
         }

        return data.getRecommendations.map(outfit => (
          <View style={styles.container}>
           <View style={{flex: 1, flexDirection:'row',  justifyContent: 'space-evenly',   marginVertical:20, marginHorizontal:10}}>
            {
              outfit.clothes && outfit.clothes.map(cloth =>(
                <Image source={{uri: cloth.image}} style={styles.image}/>
              ))
             }
            </View>
            <View style={styles.wornDate}>
              <View><Text  style={styles.content}>For {outfit.occassion.join(', ')}</Text></View>
                {
                  outfit.lastWornDate && <View><Text style={styles.content}>Last time worn on {monthNames[new Date(outfit.lastWornDate).getMonth()]} {new Date(outfit.lastWornDate).getDay()}</Text></View>
                 }
               </View>
             <View style={styles.footer}>
               <View><Text style={styles.content}>Would you like to wear this today?</Text></View>
               <TouchableOpacity onPress={this.onPress.bind(this,  outfit, mutation, refetch)}>
               {
                 outfit.lastWornDate ? <Image source={require('../images/checked-checkbox.png')} style={styles.inner}/> :
                 <Image source={require('../images/uncheckbox.png')} style={styles.inner}/>
                }
                </TouchableOpacity>
            </View>
            <View style={{borderColor:'black',borderWidth:1,height:1,width:'100%'}}/>
          </View>
        ));
       }}
      </Query>
    </ScrollView>
       )}
  </Mutation>
  );
}}

const styles = StyleSheet.create({
container:{
  flexGrow:1,
  width: 380
},
image:{
   height:80,
   width:80,
   borderRadius:40,
   marginHorizontal:20,
 },
footer:{
   flexDirection:'row',
   justifyContent: 'space-evenly',
},
wornDate:{
   flexDirection:'row',
   justifyContent: 'space-evenly',
   marginVertical:5
 },
inner:{
   height:30,
   width:30,
   marginLeft: -20,
   marginTop: -5
 },
 content:{
   marginHorizontal:5,
   alignItems:'flex-start',
   fontSize:16,
   fontWeight:'500',
 }
})
