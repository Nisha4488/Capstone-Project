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
import { Query } from "react-apollo";

const GET_CLOTHES = gql`
   query getClothes($userId: String){
     getClothes(userId: $userId){
       _id
       userId
       image
      }
    }
 `;

export default class OutfitSelector extends React.Component {
  constructor(props){
  super(props)
  this.state={
        userId:'',
        outfitClothIds: this.props.outfitClothIds || [],
      }
    }

async onPress(clothId){
  const outfitClothIds = [...this.state.outfitClothIds];
  if(outfitClothIds.indexOf(clothId) > -1) {
    outfitClothIds.splice( outfitClothIds.indexOf(clothId), 1 );
  } else {
    outfitClothIds.push(clothId);
  }
  this.setState({outfitClothIds});
  this.props.updateOutfitClothIds(outfitClothIds)
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
   <ScrollView style={{height:50}}  horizontal={true}>
      <Query
        query={GET_CLOTHES}
        variables= {{userId:this.state.userId}}
        fetchPolicy='network-only'
      >
      {({ loading, error, data,refetch }) => {
       if (loading) return <Spinner/>;
       if (error) return <View><Text>Error 2... :-(</Text></View>;
       return data.getClothes.map(cloth => (
        <View style={styles.container}>
          <Image source={{uri: cloth.image}}
          loadingIndicatorSource={true}
          style={styles.image} />
          <TouchableOpacity onPress={this.onPress.bind(this,cloth._id)}>
          {
            this.state.outfitClothIds.indexOf(cloth._id) < 0 && <Image source={require('../images/uncheckbox.png')} style={styles.inner}/>
          }
          {
            this.state.outfitClothIds.indexOf(cloth._id) > -1 && <Image source={require('../images/checked-checkbox.png')} style={styles.inner}/>
          }
          </TouchableOpacity>
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
   
   marginVertical:5,
   flexDirection: 'row'
},
image:{
   height:70,
   width:70,
   borderRadius:35,
   marginHorizontal:20,

},
inner:{
    height:30,
    width:30,
    marginLeft: -20,
    marginTop: -5
  }
})
