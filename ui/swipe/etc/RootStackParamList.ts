import {show} from "../model/compiled";
import {InteractionName, StateChange} from "../queue/QueueReducer";
import React from "react";
import {Item, Sentiment, SyncStatus} from "../queue/QueueEvents";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp, useRoute} from "@react-navigation/native";

export type RootStackParamList = {
    Splash: undefined
    Login: undefined
    SignUp: undefined
    ForgotPassword: undefined

    Home: undefined
    Queue: {
        advanceHead?: InteractionName
    }
    SeenIt: {}
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

    ListAction: {
        id: string //show id
    }

    Profile: undefined
    AddGenres: {
        genres: show.IGenre[] //todo use user context for this
    }
};

export type DrawerNavProp<T extends keyof RootStackParamList> = DrawerNavigationProp<RootStackParamList, T>
export type StackNavProp<T extends keyof RootStackParamList> = StackNavigationProp<RootStackParamList, T>
export type RouteNavProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>
