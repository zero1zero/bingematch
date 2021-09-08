import React, {useEffect, useState} from "react";
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View
} from "react-native";
import Dependencies from "../Dependencies";
import {show} from "../model/compiled";
import YoutubeIframe from "react-native-youtube-iframe";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "../etc/RootStackParamList";
import {Button} from "../components/Button";
import {EyeIcon} from "../components/Icons";
import {BingeMatch} from "../theme";
import {useAppDispatch, useAppSelector} from "../redux/hooks";

export const Detail: React.FC = (props) => {

    const api = Dependencies.instance.api

    const navigation = useNavigation()
    const route = useRoute<RouteProp<RootStackParamList, 'Detail'>>()
    const seenItState = useAppSelector(state => state.seenIt)
    const dispatch = useAppDispatch()

    const window = useWindowDimensions()

    const [detail, setDetail] = useState<show.IDetail>()

    useEffect(() => {
        api.getShow(route.params.show)
            .then(show => {
                setDetail(show)
            })
    }, [navigation])

    useEffect(() => {
        if (seenItState.lastSeenItShow.show != route.params.show) {
            return
        }

        navigation.goBack()

    }, [seenItState.lastSeenItShow])

    const showBlock = () => {
        if (!detail) {
            return <></>
        }

        const trailer = detail.videos || []
            .filter(video => video.type == show.Video.Type.Trailer)
            .filter(video => video.site == 'YouTube')

        const trailerBlock = () => {
            if (trailer.length == 0) {
                return <></>
            }

            return <View style={styles.trailer}>
                <View style={styles.trailerSpinner}>
                    <ActivityIndicator size="large"/>
                </View>
                <YoutubeIframe
                    height={230}
                    videoId={trailer[0].key}
                />
            </View>
        }

        const renderCastItem = (cast: show.Cast) => {
            return (
                <View style={styles.cast} key={`cast-${cast.name}${cast.character}`}>
                    <Image
                        style={styles.castImage}
                        source={{uri: "https://www.themoviedb.org/t/p/w138_and_h175_face" + cast.profilePath}}/>
                    <Text style={styles.castName} numberOfLines={1}>{cast.name}</Text>
                    <Text style={styles.castCharacter} numberOfLines={1}>{cast.character}</Text>
                </View>
            );
        }

        const directorBlock = () => {
            return detail.crew
                .filter(crew => crew.job == "Director" || crew.job == "Producer")
                .sort(crew => crew.job == "Director" ? -1 : 1)
                .map(crew =>
                    <View style={styles.crew} key={`crew-${crew.name}${crew.job}`}>
                        <Text style={styles.crewName}>{crew.name}</Text>
                        <Text style={styles.crewJob}>{crew.job}</Text>
                    </View>
                )
        }

        const date = new Date(detail.date)

        return (
            <>
                <ImageBackground style={styles.backdrop}
                                 width={window.width}
                                 blurRadius={4}
                                 imageStyle={{opacity: .6, borderRadius: 20}}
                                 source={{uri: `https://image.tmdb.org/t/p/w500${detail.backdropPath}`}}>
                    <Text style={styles.title}>{detail.title} ({date.getFullYear()})</Text>
                    <Text style={styles.tagline}>{detail.tagline}</Text>
                    <SafeAreaView>

                        <ScrollView style={styles.content}>

                            {trailerBlock()}

                            <ScrollView style={styles.castBlock} horizontal={true}>
                                {detail.cast.map(renderCastItem)}
                            </ScrollView>

                            <Text style={styles.overview}>{detail.overview}</Text>

                            <ScrollView style={{maxHeight: 100, marginBottom: 14}} horizontal={true}>
                                {directorBlock()}
                            </ScrollView>

                            <View style={{marginBottom: 14}}>
                                <Text style={styles.lengthTitle}>
                                    {detail.type == show.Detail.Type.Movie ? 'Runtime' : 'Seasons'}
                                </Text>
                                {detail.type == show.Detail.Type.Movie ?
                                    <Text style={styles.length}>{detail.movie.runtime} minutes</Text>
                                    :
                                    <Text style={styles.length}>{detail.tv.seasons}</Text>
                                }
                            </View>

                            <View style={{marginBottom: 14}}>
                                <Text style={styles.lengthTitle}>
                                    Language
                                </Text>
                                <Text>
                                    {detail.type == show.Detail.Type.Movie ?
                                        <Text style={styles.length}>{detail.movie.originalLanguage}</Text>
                                        :
                                        <Text style={styles.length}>{detail.spokenLanguage}</Text>
                                    }
                                </Text>
                            </View>
                        </ScrollView>

                        <Button style={styles.seenit}
                                onPress={() => {
                                    navigation.navigate('SeenIt', {
                                        show: detail.id
                                    })
                                }}>
                            <EyeIcon size={28} style={BingeMatch.theme.detail.seenItIcon}/>
                            <Text style={{...styles.seenitText, ...BingeMatch.theme.detail.seenIt}}>Seen It</Text>
                        </Button>
                    </SafeAreaView>
                </ImageBackground>
            </>
        )
    }

    const close = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Pressable style={{flex: 1}} onPress={close}>
            </Pressable>

            <View style={styles.detail}>
                {showBlock()}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    detail: {
        flex: 7,
    },

    backdrop: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'black',
        height: '100%',
    },

    content: {
        padding: 10,
    },

    title: {
        color: 'white',
        fontSize: 25,
        marginBottom: 8,
        paddingTop: 8,
        paddingHorizontal: 11
    },

    tagline: {
        color: 'white',
        fontStyle: 'italic',
        marginBottom: 10,
        paddingHorizontal: 11
    },

    trailer: {
        marginBottom: 15,
    },

    trailerSpinner: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },

    castBlock: {
        marginBottom: 15
    },

    cast: {
        marginRight: 13,
    },

    castImage: {
        justifyContent: "center",
        height: 75,
        width: 55
    },

    castName: {
        color: 'white',
        width: 100,
        fontWeight: "800"
    },

    castCharacter: {
        color: 'white',
        width: 100,
        fontStyle: 'italic',
    },

    overview: {
        color: 'white',
        borderRadius: 10,
        marginBottom: 15
    },

    crew: {
        marginRight: 20
    },

    crewName: {
        color: 'white',
        fontWeight: "800"
    },

    crewJob: {
        fontStyle: 'italic',
        color: 'white',
    },

    lengthTitle: {
        color: 'white',
        fontWeight: "800"
    },

    length: {
        fontStyle: 'italic',
        color: 'white',
    },

    seenit: {
        // flexDirection: 'row',
        alignItems: 'center',
    },
    seenitText: {
    }
})
