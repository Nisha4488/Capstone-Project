import React from 'react';
import { StyleSheet, View} from 'react-native';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import Outfit from './src/pages/Outfit'
import Recommendation from './src/pages/Recommendation'
import MyCloset from './src/pages/MyCloset'
import AddCloth from './src/pages/AddCloth'
import AddOutfit from './src/pages/AddOutfit'
import ActiveCamera from './src/components/ActiveCamera'
import CaptureClothDetails from './src/pages/CaptureClothDetails'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MemoryRouter, Route } from 'react-router-native'
import { createUploadLink } from 'apollo-upload-client';
import { ApolloLink } from 'apollo-link';

const uploadLink = createUploadLink({ uri: 'http://localhost:4000/' });
const httpLink = new HttpLink({ uri: 'http://localhost:4000/' });

const client = new ApolloClient({
  link: ApolloLink.from([uploadLink, httpLink]),
  cache: new InMemoryCache()
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MemoryRouter >
          <View style={styles.container}>
             <Route exact path="/" component={MyCloset}/>
             <Route exact path="/login" component={Login}/>
             <Route exact path="/signup" component={Signup}/>
             <Route exact path="/mycloset" component={MyCloset}/>
             <Route exact path="/outfit" component={Outfit}/>
             <Route exact path="/recommendation" component={Recommendation}/>
             <Route exact path="/addcloth" component={AddCloth}/>
             <Route exact path="/addOutfit" component={AddOutfit}/>
             <Route exact path="/activecamera" component={ActiveCamera}/>
             <Route exact path="/captureclothdetails" component={CaptureClothDetails}/>
          </View>
        </MemoryRouter>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
