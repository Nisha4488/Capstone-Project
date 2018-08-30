import React from "react";
import { Spinner} from 'native-base';
import { StyleSheet, Image, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Query,  Mutation } from "react-apollo";
import gql from 'graphql-tag';
import Storage from '../utils/Storage'
import EmptyCloset from './EmptyCloset'

const GET_CLOTHES = gql`
    query getClothes($userId: String){
      getClothes(userId: $userId){
        _id
        userId
        image
        type
        color
        weather
      }
    }
  `;

const DELETE_CLOTH = gql`
    mutation deleteCloth($_id:String) {
      deleteCloth(_id: $_id) {
        _id
      }
    }
  `;

export default class ClosetGallery extends React.Component {
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
 async onPress(mutation, clothId, refetch){
   await mutation({ // Make API call to save cloth details
   mutation: DELETE_CLOTH,
   variables: {_id: clothId},
  });
  refetch()
 }
  render() {
    if(!this.state.userId){   // if this.state.userId is empty then display spinning wheel
      return <Spinner/>
    }
    console.log('userid data', this.state.userId)
    return (
    <ScrollView style={{height:400}}>
      <Query
        query={GET_CLOTHES}
        variables= {{userId:this.state.userId}}
        fetchPolicy='network-only'
        >
        {({ loading, error, data,refetch }) => {
          if (loading) return <View><Text>Loading....</Text></View>;
          if (error) return <View><Text>Error 2... :-(</Text></View>;
          console.log('data.getClothes.length ', data.getClothes.length)
          if(data.getClothes.length ===0) {
            return <EmptyCloset/>
          }
       return data.getClothes.map(cloth => (
        <View style={styles.container}>
          <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center',marginVertical:20, marginHorizontal:10}}>
            <Image source={{uri: cloth.image}} style={styles.image}/>
          <View style={styles.feature}>
            <View><Text style={styles.content}>{cloth.type}</Text></View>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
              <Text style={{fontSize:18, fontWeight:'bold'}}> Color:</Text>
              <Text style={styles.content}> {cloth.color} </Text>
            </View>
           </View>
            <Mutation mutation={DELETE_CLOTH}>
              {(mutation, { data }) => (
                <TouchableOpacity onPress={this.onPress.bind(this, mutation, cloth._id, refetch)}>
                  <Image source={require('../images/delete.png')} style={styles.delete}/>
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
  container:{
      flexGrow:1,
    
      width:380,
      marginVertical:15,
    },
  image:{
      height:70,
      width:70,
      borderRadius:35,
    },
  feature:{
      marginVertical:30,
      flex: 1,
      marginBottom:5
    },
  delete:{
      height:30,
      width:30
    },
  content:{
      fontSize:16,
      textAlign:'center'
    }
  })
