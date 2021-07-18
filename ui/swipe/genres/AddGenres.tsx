import React, {useLayoutEffect, useState} from "react";
import {BaseNavigationProps} from "../etc/BaseNavigationProps";
import {Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {BingeMatch} from "../theme";
import {Button} from "../components/Button";
import {MinusIcon, PlusIcon} from "../components/Icons";
import Dependencies from "../Dependencies";
import {show} from "../model/compiled";

export const AddGenres: React.FC<BaseNavigationProps<'AddGenres'>> = (props) => {

    const api = Dependencies.instance.api

    const [genres, setGenres] = useState([])
    const [userGenres, setUserGenres] = useState<show.IGenre[]>(props.route.params.genres)

    const close = () => {
        props.navigation.goBack()
    }

    const save = () => (
        api.setGenres(userGenres)
            .then(() => (
                //todo success toast
                    props.navigation.goBack()
                )
            )
    )

    useLayoutEffect(() => {
        api.getGenres()
            .then(setGenres)

    }, [props.navigation]);

    const isUserGenre = (genre : show.Genre) : boolean => (
        userGenres.find(g => genre.id == g.id) != undefined
    )

    const toGenreBlob = (genre : show.Genre) => {
        if (isUserGenre(genre)) {
            return remove(genre)
        } else {
            return add(genre)
        }
    }

    const add = (genre: show.Genre) => (
        <Pressable onPress={() => toggle(genre)}>
            <View style={{...styles.detailsGenresName, backgroundColor: 'transparent'}}>
                <PlusIcon style={{marginRight: 5}}/>
                <Text style={styles.detailsGenresText}
                    key={`agenre-${genre.id}`}>
                    {genre.name}
                </Text>
            </View>
        </Pressable>
    )

    const remove = (genre: show.Genre) => (
        <Pressable onPress={() => toggle(genre)}>
            <View style={{...styles.detailsGenresName, backgroundColor: "#EAE2B7"}}>
                <MinusIcon style={{marginRight: 5}}/>
                <Text style={styles.detailsGenresText}
                    key={`rgenre-${genre.id}`}>
                    {genre.name}
                </Text>
            </View>
        </Pressable>
    )

    const toggle = (genre: show.Genre) => {
        if (isUserGenre(genre)) {
            //remove it
            setUserGenres(userGenres.filter(g => g.id != genre.id))
        } else {
            //add it
            const newg = Object.assign([], userGenres);
            newg.push(genre)
            setUserGenres(newg)
        }
    }

    return (
        <View style={styles.container}>
            <Pressable style={{flex: 5}} onPress={close}>
            </Pressable>
            <SafeAreaView style={styles.actions}>

                <View style={styles.detailsGenres}>
                    {genres.map(toGenreBlob)}
                </View>

                <Button
                    style={styles.saveButton}
                    onPress={save}>
                    <Text style={BingeMatch.theme.button.text}>Save</Text>
                </Button>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    actions: {
        backgroundColor: BingeMatch.colors.bg,
        justifyContent: 'center',
    },

    saveButton: {
        marginVertical: 20,
        marginHorizontal: 16,
        width: '80%',

        ...BingeMatch.theme.profile.save
    },

    detailsGenres: {
        flexDirection: 'row',
        flexWrap: "wrap",
        padding: 8,
        marginVertical: 4,
        marginHorizontal: 10
    },

    detailsGenresName: {
        padding: 4,
        marginVertical: 4,
        marginRight: 10,
        borderRadius: 5,
        flexDirection: 'row',
        borderWidth: 1,
        alignItems: "center"
    },

    detailsGenresText: {
        fontSize: 18,
    }
})
