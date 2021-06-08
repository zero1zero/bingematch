import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../../App";
import {DrawerNavigationProp} from "@react-navigation/drawer";

export interface BaseNavigationProps<RouteName extends keyof RootStackParamList> {
    navigation: StackNavigationProp<RootStackParamList, RouteName>,
    route: RouteProp<RootStackParamList, RouteName>,
}

export interface DrawerNavigationProps<RouteName extends keyof RootStackParamList> {
    navigation: DrawerNavigationProp<RootStackParamList, RouteName>,
    route: RouteProp<RootStackParamList, RouteName>,
}
