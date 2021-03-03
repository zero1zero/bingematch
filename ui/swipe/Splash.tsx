import React, {useEffect} from "react";
import {BaseProps} from "./etc/BaseProps";
import {ImageOverlay} from "./etc/ImageOverlay";
import Dependencies from "./Dependencies";
import {Spinner} from "@ui-kitten/components";

const Splash : React.FC<BaseProps> = (props) => {

    const storage = Dependencies.instance.storage

    useEffect(() => {
        storage.isLoggedIn()
            .then(li => li ? 'Deck' : 'SignUp')
            .then(route => {
                props.navigation.navigate(route);
            })
    }, [])

    return (
        <ImageOverlay
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
            source={require('./assets/image-background.jpg')}>

                <Spinner
                    status='basic'/>
        </ImageOverlay>
    )
}

export default Splash;
