import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../../App";
import {ParamListBase} from "@react-navigation/routers";

export interface BaseNavigationProps<
    RouteName extends keyof RootStackParamList
> {
    navigation: StackNavigationProp<RootStackParamList, RouteName>,
    route: RouteProp<RootStackParamList, RouteName>,
}
