import {ColorValue, ImageStyle, StyleSheet, TextStyle, ViewStyle} from "react-native";
import {DefaultTheme} from "@react-navigation/native";
import {FontAwesomeIconStyle} from "@fortawesome/react-native-fontawesome";

export namespace BingeMatch {

    //https://coolors.co/0077b8-a27c88-709b59-e7ca9d-d64933-0f110c-d62828-f77f00-fcbf49-eae2b7
    export const colors = {
        error: "#D64933",
        yellow: "#FCBF49",
        success: "#709B59",

        bg: "#d7efe7",

        blue: "#003049",
        grey: "#555558",
        black: "#0F110C",
        t: 0x0F110C
    }

    interface Theme {
        button: {
            text: TextStyle
            button: ViewStyle
        }

        input: {
            field: TextStyle
            icon: FontAwesomeIconStyle
            placeholder: ColorValue
        }

        actions: {
            watch: TextStyle
            watchIcon: FontAwesomeIconStyle
            nope: TextStyle
            nopeIcon: FontAwesomeIconStyle
            back: TextStyle
            backIcon: FontAwesomeIconStyle
            seenItIcon: FontAwesomeIconStyle
            seenIt: TextStyle
        }

        error: ColorValue

        profile: {
            save: ViewStyle
            logout: ViewStyle
            label: TextStyle
            genres: TextStyle
            addGenres: TextStyle
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

        drawer: {
            text: TextStyle
            categoryText: TextStyle
        }

        likes: {
            title: TextStyle,
            actions: {
                text: TextStyle
                removeColor: ColorValue
                moreColor: ColorValue
            }
        }

        seenit: {
            sliderLabel: TextStyle
        }
    }

    export const theme: Theme = {
        button: {
            text: {
                color: colors.black,
                fontSize: 22,
                fontWeight: '400',
            },
            button: {
                backgroundColor: 'transparent',
                borderColor: colors.grey,
                borderWidth: 1
            }
        },

        input: {
            field: {
                borderColor: colors.grey,

                color: 'black',
                fontSize: 18,
            },
            icon: {
                color: colors.grey
            },
            placeholder: colors.grey
        },

        actions: {
            nope: {
                fontSize: 18,
                fontWeight: '700',

                color: colors.grey
            },
            nopeIcon: {
                color: colors.error,
            },
            back: {
                fontSize: 16,
                fontWeight: '700',

                color: colors.grey
            },
            backIcon: {
                color: colors.yellow
            },
            watch: {
                fontSize: 18,
                fontWeight: '700',

                color: colors.grey
            },
            watchIcon: {
                color: colors.success
            },

            seenItIcon: {
                color: colors.blue
            },

            seenIt: {
                fontSize: 18,
                fontWeight: '700',

                color: colors.grey
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
            },
            label: {
                fontSize: 18,
                fontWeight: '700',
                color: colors.grey
            },
            genres: {
                fontSize: 17,
            },
            addGenres: {
                fontSize: 18,
            },
        },

        onboard: {
            loginbg: colors.bg,
            signup: {
                bg: {
                    backgroundColor: colors.bg
                },
                text: {
                    fontSize: 16,
                    color: colors.grey
                }
            },
            social: {
                icon: {
                    color: colors.grey
                },
                title: {
                    fontSize: 16,
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
        },

        drawer: {
            text: {
                fontSize: 19,
                fontWeight: '400',
            },
            categoryText: {
                fontSize: 20,
                fontWeight: '500',
                color: BingeMatch.colors.grey,
            }
        },

        likes: {
            title: {
                fontSize: 19,
                fontWeight: '400',
            },
            actions: {
                text: {
                    fontWeight: '600',
                    color: colors.bg,
                },
                removeColor:  colors.error,
                moreColor:  colors.blue
            }
        },

        seenit: {
            sliderLabel: {
                fontSize: 14,
                fontWeight: '600',
            }
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

    //todo strong typing of Theme and set background color and such
    export const navigation = {
        ...DefaultTheme,

        colors: {
            ...DefaultTheme.colors,
            primary: '#fff',
        },
    };
}

