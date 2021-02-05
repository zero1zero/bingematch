import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Deck from "./swipe/Deck";
import {StyleSheet, Text, View} from "react-native";

export default function App() {

  // Instruct SplashScreen not to hide yet, we want to do this manually
  // SplashScreen.preventAutoHideAsync()
  //     .catch(() => { /* reloading the app might trigger some race conditions, ignore them */ });


  return (
      <View style={styles.container}>

      <Deck />
          <Text>alsdkfjalskfjlasdkfj</Text>

      </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
