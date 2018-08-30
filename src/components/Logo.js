import React from 'react';
import { StyleSheet, View, Image} from 'react-native';

export default class Logo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 150, height: 300, marginHorizontal:-5 }}
          source={require('../images/nd.png')}
          />
        <Image
          style={{width: 150, height: 300}}
          source={require('../images/r.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    marginVertical:10,
    },
});
