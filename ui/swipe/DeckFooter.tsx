import {Image, TouchableOpacity, View} from "react-native";
import React, {FC} from "react";
import styles from "./styles";
import CardStack from "./cardstack";
// import CardStack, {CardStackProps} from "react-native-card-stack-swiper";

export interface Props {
    stack: CardStack
}

const DeckFooter: React.FC<Props> = (props) => {

    return (
        <View style={styles.footer}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.red]} onPress={() => {
                    props.stack.swipeLeft();
                }}>
                    <Image source={require('./assets/red.png')} resizeMode={'contain'} style={{ height: 62, width: 62 }} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.orange]} onPress={() => {
                    props.stack.goBackFromLeft();
                }}>
                    <Image source={require('./assets/back.png')} resizeMode={'contain'} style={{ height: 32, width: 32, borderRadius: 5 }} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.green]} onPress={() => {
                    props.stack.swipeRight();
                }}>
                    <Image source={require('./assets/green.png')} resizeMode={'contain'} style={{ height: 62, width: 62 }} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default DeckFooter
