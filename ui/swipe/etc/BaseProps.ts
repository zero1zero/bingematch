import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../../App";

export interface BaseProps {
    navigation: StackNavigationProp<RootStackParamList, 'Queue'>,
    route: RouteProp<RootStackParamList, 'Queue'>,
}
