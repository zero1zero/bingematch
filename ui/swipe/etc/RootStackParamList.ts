import {show} from "../model/compiled";

export type RootStackParamList = {
    Splash: undefined
    Login: undefined
    SignUp: undefined
    ForgotPassword: undefined

    Home: undefined
    Queue: undefined
    Detail: {
        id: string //show id
    }

    Likes: {
        list: string //list name
    }
    Watched: {
        list: string //list name
    }
    Matched: {
        list: string //list name
    }

    LikeAction: {
        id: string //show id
    }

    Profile: undefined
    AddGenres: {
        genres: show.IGenre[]
    }
};
