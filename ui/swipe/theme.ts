import {ColorValue, ImageStyle, StyleSheet, TextStyle, ViewStyle} from "react-native";
import {DefaultTheme} from "@react-navigation/native";
import {FontAwesomeIconStyle} from "@fortawesome/react-native-fontawesome";

export namespace BingeMatch {

    //https://coolors.co/74d3ae-678d58-a6c48a-f6e7cb-dd9787
    export const colors = {
        error: "#FF6E2B",
        yellow: "#FFBD26",
        success: "#8CC62D",

        bg: "#d7efe7",

        grey: "#5c5c5f"
    }

    interface Theme {
        button: {
            background: ColorValue
            placeholder: ColorValue
            text: TextStyle
            border: ColorValue
        }

        input: {
            field: TextStyle
            icon: FontAwesomeIconStyle
        }

        actions: {
            watch: TextStyle
            watchIcon: FontAwesomeIconStyle
            nope: TextStyle
            nopeIcon: FontAwesomeIconStyle
            back: TextStyle
            backIcon: FontAwesomeIconStyle
        }

        error: ColorValue

        profile: {
            save: ViewStyle
            logout: ViewStyle
        }

        queue: {
            background: ColorValue
            genres: TextStyle
        }

        onboard: {
            loginbg: ColorValue
            signup: {
                bg: ViewStyle
                text: TextStyle
            }
            social: {
                icon: FontAwesomeIconStyle,
                title: TextStyle
            }
        }

        nav: {
            bar: ViewStyle
            title: TextStyle
            back: TextStyle
            icons: FontAwesomeIconStyle
        }
    }

    export const theme: Theme = {
        button: {
            background: 'transparent',
            placeholder: colors.grey,
            text: {
                color: 'black',
                fontSize: 20,
                fontWeight: '400',
            },
            border: colors.grey
        },

        input: {
            field: {
                borderColor: colors.grey,

                color: 'black',
                fontSize: 18,
            },
            icon: {
                color: colors.grey
            }
        },

        actions: {
            nope: {
                fontSize: 18,
                fontWeight: '800',

                color: colors.error,
            },
            nopeIcon: {
                color: colors.error,
            },
            back: {
                fontSize: 18,
                fontWeight: '800',

                color: colors.yellow
            },
            backIcon: {
                color: colors.yellow
            },
            watch: {
                fontSize: 18,
                fontWeight: '800',

                color: colors.success
            },
            watchIcon: {
                color: colors.success
            }
        },

        error: colors.error,

        queue: {
            background: colors.bg,
            genres: {
                color: '#fff',
                fontSize: 12,
                backgroundColor: colors.grey,
            },
        },

        profile: {
            save: {
                backgroundColor: colors.success,
            },
            logout: {
                backgroundColor: colors.error,
            }
        },

        onboard: {
            loginbg: colors.bg,
            signup: {
                bg: {
                    backgroundColor: colors.bg
                },
                text: {
                    color: colors.grey
                }
            },
            social: {
                icon: {
                    color: colors.grey
                },
                title: {
                    fontSize: 18,
                    color: colors.grey
                }
            }
        },

        nav: {
            bar: {
                backgroundColor: colors.bg,
            },
            title: {
                color: colors.grey,
                fontSize: 25
            },

            back: {
                color: colors.grey,
            },

            icons: {
                color: colors.grey,
                margin: 10,
            },
        }
    }

    export const shadow: ViewStyle | TextStyle | ImageStyle = {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.27,
        shadowRadius: 3.65,
        elevation: 5,
    }

    export const h1: TextStyle = {
        color: colors.grey,
        fontWeight: "800",
        fontSize: 30,
    }

    export const h2: TextStyle = {
        color: colors.grey,
        fontWeight: "600",
        fontSize: 17,
    }

    export const form = StyleSheet.create({
        message: {
            fontSize: 17,
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

