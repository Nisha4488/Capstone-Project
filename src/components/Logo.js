import React from 'react';
import { StyleSheet, View, Image} from 'react-native';

export default class Logo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 80, height: 150, marginHorizontal:20 }}
          source={require('../images/CapitalD.png')}
          />
        <Image
          style={{width: 80, height: 150}}
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
