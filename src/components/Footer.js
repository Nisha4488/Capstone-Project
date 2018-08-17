import React from 'react';
import { StyleSheet, View, Image} from 'react-native';

export default class Footer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 60, height: 100, marginHorizontal:20 }}
          source={require('../images/newcloset.jpeg')}
          />
        <Image
          style={{width: 60, height: 100}}
          source={require('../images/CapitalR.png')}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection:'row',
    marginVertical:30,
  },
});
