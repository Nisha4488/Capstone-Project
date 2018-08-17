import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import Closet from './src/pages/Closet'
import Outfit from './src/pages/Outfit'
import Recommendation from './src/pages/Recommendation'
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { NativeRouter, Route } from 'react-router-native'

const client = new ApolloClient({
  uri: "https://localhost:4000/graphql"
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <NativeRouter>
          <View style={styles.container}>
             <Route exact path="/" component={Login}/>
             <Route exact path="/login" component={Login}/>
             <Route exact path="/signup" component={Signup}/>
             <Route exact path="/closet" component={Closet}/>
             <Route exact path="/outfit" component={Outfit}/>
             <Route exact path="/recommendation" component={Recommendation}/>
          </View>
        </NativeRouter>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EF6C00',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
