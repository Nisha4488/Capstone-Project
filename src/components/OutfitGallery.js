import React from "react";
import {  Spinner } from 'native-base';
import { Link } from 'react-router-native';
import { StyleSheet, Image, View, Text, TouchableOpacity, ScrollView  } from 'react-native';
import { Query,  Mutation } from "react-apollo";
import gql from 'graphql-tag';
import Storage from '../utils/Storage'


const GET_OUTFITS = gql`
  query getOutfits($userId: String){
   getOutfits(userId: $userId){
    _id
    userId
    clothesId
    clothes{
      _id
      image
      color
      type
      weather
      }
    weather
    occassion
   }
  }
`;

const DELETE_OUTFIT = gql`
  mutation deleteOutfit($_id:String) {
    deleteOutfit(_id: $_id) {
      _id
     }
   }
`;

export default class OutfitGallery extends React.Component {
  constructor(props){
    super(props)
    this.state={
      userId:''
    }
  }

  async componentDidMount() {
    const userId = await Storage.fetchUserId();
    this.setState({userId})
 }

  async onPressDelete(mutation, outfitId, refetch){
    await mutation({
    mutation: DELETE_OUTFIT,
    variables: {_id: outfitId},
    });
    refetch()
  }

  render() {
    if(!this.state.userId){
      return <Spinner/>
    }

   return (
     <ScrollView style={{height:400}}>
        <Query
          query={GET_OUTFITS}
          variables= {{userId:this.state.userId}}
          fetchPolicy='network-only'
        >
        {({ loading, error, data, refetch }) => {
          if (loading) return <View><Text>Loading....</Text></View>;
          if (error) return <View><Text>Error... :-(</Text></View>;
          if(data.getOutfits.length ===0) {
            <View><Text>Your OutfitGallery is empty..Please create outfits</Text></View>
          }

        return data.getOutfits.map(outfit => (
          <View style={styles.container}>
            <View style={{flexDirection:'row', marginVertical:20, marginHorizontal:10, justifyContent: 'space-evenly',}}>
             {
              outfit.clothes && outfit.clothes.map(cloth =>(
              <Image source={{uri: cloth.image}} style={styles.image}/>
              ))
             }
          </View>
          <View style={styles.feature}>
             <View><Text  style={styles.content}>Occassion: {outfit.occassion.join(', ')}</Text></View>
             <TouchableOpacity>
             <Link to={{
                    pathname: '/addoutfit',
                    state: { outfit }
                  }}>
               <Image source={require('../images/edit.png')}  style={styles.picture}/>
            </Link>
            </TouchableOpacity>

      <Mutation mutation={DELETE_OUTFIT}>
        {(mutation, { data }) => (
          <TouchableOpacity onPress={this.onPressDelete.bind(this, mutation, outfit._id, refetch)}>
           <Image source={require('../images/delete.png')}  style={styles.picture}/>
          </TouchableOpacity>
         )}
      </Mutation>
      </View>
      <View style={{borderColor:'black',borderWidth:1,height:1,width:'100%'}}/>
    </View>
    ));
   }}
   </Query>
 </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
container: {
      flexGrow:1,
      backgroundColor: '#EF6C00',
      width:380,
      paddingTop: 15
    },
image:{
      height:80,
      width:80,
      borderRadius:40
    },
feature:{
      marginVertical:5,
      flexDirection:'row',
      flex: 1,
   },
picture:{
      height:30,
      width:30,
      alignItems:'flex-end',
      justifyContent: 'flex-end',
      marginHorizontal:15
},
 content:{
      marginHorizontal:15,
      alignItems:'flex-start',
      fontSize:18,
      fontWeight:'500',
      width: 230
  }
})
