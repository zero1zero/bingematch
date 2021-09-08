import React, {useState} from "react";
import {Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {BingeMatch} from "../theme";
import {Button} from "../components/Button";
import {EyeIcon, HatedIt, LovedIt, Meh} from "../components/Icons";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "../etc/RootStackParamList";
import {StackNavigationProp} from "@react-navigation/stack";
import {useAppDispatch} from "../redux/hooks";
import Slider from "@react-native-community/slider";
import Dependencies from "../Dependencies";
import {listsUpdated} from "../likes/reducer";
import {seenIt} from "./reducer";

export const SeenIt : React.FC = (props) => {

    const api = Dependencies.instance.api
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SeenIt'>>()
    const route = useRoute<RouteProp<RootStackParamList, 'SeenIt'>>()
    const dispatch = useAppDispatch()

    const [rating, setRating] = useState<number>(.5)

    const close = () => {
        navigation.goBack()
    }

    const watched = () => {
        dispatch(seenIt({
            show: route.params.show,
            rating: rating
        }))

        //todo error handling
        api.watched(route.params.show, rating)
            .then(() => {
                dispatch(listsUpdated())
            })

        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={close} style={{flex: 2}}>
            </Pressable>
            <View style={styles.actions}>
                <SafeAreaView>
                    <View style={styles.sliderLabels}>
                        <View style={styles.sliderLabelHolder}>
                            <HatedIt size={30} color={BingeMatch.colors.error}/>
                            <Text style={styles.sliderLabel}>Hated It</Text>
                        </View>
                        <View style={styles.sliderLabelHolder}>
                            <Meh size={30} color={BingeMatch.colors.yellow} />
                            <Text style={styles.sliderLabel}>Meh</Text>
                        </View>
                        <View style={styles.sliderLabelHolder}>
                            <LovedIt size={30} color={BingeMatch.colors.success} />
                            <Text style={styles.sliderLabel}>Loved It</Text>
                        </View>
                    </View>
                    <Slider
                        style={styles.slider}
                        value={rating}
                        minimumValue={0}
                        maximumValue={1}
                        onSlidingComplete={setRating}
                        minimumTrackTintColor={BingeMatch.colors.success}
                        maximumTrackTintColor={BingeMatch.colors.grey}
                    />
                    <Button style={styles.button} onPress={watched}>
                        <EyeIcon size={28} style={BingeMatch.theme.actions.seenItIcon}/>
                        <Text style={{...styles.buttonText, ...BingeMatch.theme.actions.seenIt}}>Seen It</Text>
                    </Button>
                </SafeAreaView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    sliderLabels: {
        flexDirection: "row"
    },

    sliderLabelHolder: {
        flex: 1,
        alignItems: "center",
    },

    sliderLabel: {
        marginTop: 5,
        ...BingeMatch.theme.seenit.sliderLabel
    },

    actions: {
        flex:1,
        backgroundColor: BingeMatch.colors.bg,
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,

        ...BingeMatch.theme.button.button
    },

    buttonText: {
        marginLeft: 5
    },

    slider: {
        marginHorizontal: 40

    },
})
