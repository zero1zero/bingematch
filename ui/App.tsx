import React from 'react';
import Deck from "./swipe/Deck";
import {StyleSheet, View} from "react-native";

export default function App() {

  return (
      <View style={styles.container}>

          <Deck />

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
