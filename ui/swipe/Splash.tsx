import React from "react";
import {ImageOverlay} from "./etc/ImageOverlay";

const Splash : React.FC = (props) => {

    return (
        <ImageOverlay
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
            source={require('./assets/bp.jpg')}>

                {/*<Spinner*/}
                {/*    status='basic'/>*/}
        </ImageOverlay>
    )
}

export default Splash;
