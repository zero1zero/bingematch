//https://coolors.co/f94144-f3722c-f8961e-f9844a-f9c74f-90be6d-43aa8b-4d908e-577590-277da1
import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from "react-native";
import {DefaultTheme} from "@react-navigation/native";

export namespace BingeMatch {
  const colors = {
    "RedSalsa":"#f94144",
    "OrangeRed":"#f3722c",
    "YellowOrangeColorWheel":"#f8961e",
    "MangoTango":"#f9844a",
    "MaizeCrayola":"#f9c74f",
    "Pistachio":"#90be6d",
    "Zomp":"#43aa8b",
    "CadetBlue":"#4d908e",
    "QueenBlue":"#577590",
    "CGBlue":"#277da1"
  }

  export const theme = {
    bg: colors.CGBlue,
    actions: {
      nope: colors.RedSalsa,
      back: colors.MaizeCrayola,
      watch: colors.Pistachio
    },

    error: colors.RedSalsa,
    logout: colors.RedSalsa,
    save: colors.Pistachio,

    genres: colors.QueenBlue
  }

  export const buttonText : TextStyle = {
    fontSize: 16,
    fontWeight: '500',
  }

  export const shadow : ViewStyle | TextStyle | ImageStyle = {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.27,
    shadowRadius: 3.65,
    elevation: 5,
  }

  export const nav = StyleSheet.create({
    bar: {
      backgroundColor: BingeMatch.theme.bg,
    },
    title: {
      color: 'white',
      fontSize: 25
    },

    icons: {
      margin: 10,
    },
  })

  export const h1 : TextStyle = {
    color: '#fff',
    fontWeight: "800",
    fontSize: 40
  }

  export const h2 : TextStyle = {
    color: '#fff',
    fontWeight: "600",
    fontSize: 20,
  }

  export const form = StyleSheet.create({
    message: {
      color: BingeMatch.theme.error,
      alignSelf: 'flex-end',
      marginTop: 8,
      marginBottom: 2
    },
  })

  export const navigation = {
    ...DefaultTheme,

    colors: {
      ...DefaultTheme.colors,
      primary: '#fff',
    },
  };
}

