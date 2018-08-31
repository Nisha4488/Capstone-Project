'use strict';
import React from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
 } from 'react-native';
import { Link, Redirect } from 'react-router-native'
import { Spinner } from 'native-base';
import { RNCamera } from 'react-native-camera';
import { ReactNativeFile } from 'apollo-upload-client'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const UPLOAD_FILE=gql`
  mutation uploadSingleFile($file:Upload!){
  uploadSingleFile(file:$file){
    path
  }
}
`;

export default class ActiveCamera extends React.Component {
  constructor(props){
    super(props)
    this.state={
      path:'',
      redirect:false
    }
  }
  render() {
    // If isRedirect true then redirect
    if (this.state.redirect){
      return <Redirect to={{
              pathname: '/captureclothdetails',
              state: { clothUrl: this.state.path }
            }}/>
          }
    return (
      <Mutation mutation={UPLOAD_FILE}>
      {(mutation, { data, loading }) => {
        // if loading = true then show spinner
        if(loading==true){
          return <Spinner/>
        }
        return (
          <View style={styles.container}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
             style = {styles.preview}
             type={RNCamera.Constants.Type.back}
             flashMode={RNCamera.Constants.FlashMode.on}
             permissionDialogTitle={'Permission to use camera'}
             permissionDialogMessage={'We need your permission to use your camera phone'}
            />
          <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
          <TouchableOpacity onPress={this.takePicture.bind(this, mutation)} style = {styles.capture}>
            <Text style={{fontSize: 14, textAlign:'center', fontWeight:'bold',}}> SNAP </Text>
          </TouchableOpacity>
          </View>
       </View>
     )
   }
 }
 </Mutation>
  );
}

  takePicture = async function(mutation) {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      const file = new ReactNativeFile({
        uri: data.uri,
        name: 'a.jpg',
        type: 'image/jpeg'
      })
      const res = await mutation({ // Make API call to save clothes details
        mutation: UPLOAD_FILE,
        variables: { file },
      });

      // File upload complete
      const path = res.data.uploadSingleFile.path;
      console.log('path  of uploaded ',  path)
      // Update local state
      this.setState({
        path,
        redirect: true,
        loader: false,
      })
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:380,
    marginTop:20,
    backgroundColor:'#40C4FF'
 },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture:{
    width:150,
    backgroundColor:'#0091EA',
    borderRadius:25,
    marginVertical:10,
    padding:10
  },
});
