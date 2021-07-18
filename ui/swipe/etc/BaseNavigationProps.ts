import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {RootStackParamList} from "./RootStackParamList";

export interface BaseNavigationProps<RouteName extends keyof RootStackParamList> {
    navigation: StackNavigationProp<RootStackParamList, RouteName>,
    route: RouteProp<RootStackParamList, RouteName>,
}

export interface DrawerNavigationProps<RouteName extends keyof RootStackParamList> {
    navigation: DrawerNavigationProp<RootStackParamList, RouteName>,
    route: RouteProp<RootStackParamList, RouteName>,
}
