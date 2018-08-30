import { AsyncStorage } from "react-native"

export default class Storage{
  static async wrirteUserId(userId) {
    try {
      await AsyncStorage.setItem('@DressRecommender:userId', userId);
    } catch (error) {
      // Error saving data
    }
  }

 static async fetchUserId(){
   try {
     const value = await AsyncStorage.getItem('@DressRecommender:userId');
     if (value !== null) {
       // We have data!!
       console.log(value);
     }
     return value;
    } catch (error) {
      // Error retrieving data
    }
  }
}
