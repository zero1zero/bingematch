import React from "react";
import {FontAwesomeIcon, FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome'

import {
    faBars,
    faEllipsisV,
    faEnvelope,
    faEye,
    faFlag,
    faGrinHearts,
    faHeart,
    faHeartBroken,
    faHistory,
    faLock,
    faMeh,
    faMinus,
    faPlus,
    faTheaterMasks,
    faThumbsUp,
    faTimes,
    faTired,
    faUserCog,
    faUserFriends,
    faUserPlus,
    faVideo
} from '@fortawesome/free-solid-svg-icons'
import {faFacebook, faGoogle, faTwitter} from "@fortawesome/free-brands-svg-icons"
import {IconProp, Transform} from "@fortawesome/fontawesome-svg-core";

interface Props {
    size?: number;
    color?: string;
    secondaryColor?: string;
    secondaryOpacity?: number;
    mask?: IconProp;
    transform?: string | Transform;
    style?: FontAwesomeIconStyle;
}

export const FacebookIcon = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faFacebook}/>
);

export const GoogleIcon = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faGoogle}/>
);

export const TwitterIcon = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faTwitter}/>
);

export const EmailIcon = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faEnvelope}/>
);

export const PasswordIcon = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faLock}/>
);

export const PlusIcon = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faPlus}/>
);

export const MinusIcon = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faMinus}/>
);

export const FlagIcon = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faFlag}/>
);

export const SettingsIcon = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faUserCog}/>
);

export const PersonAdd = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon='bars'/>
);

export const ReportIcon = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon='flag'/>
)
//
// export const BackIcon = (props: Props): JSX.Element => (
//     <FontAwesomeIcon {...props} icon={faBackward}/>
// );

export const HeartIcon = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faHeart}/>
);

export const XIcon = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faTimes}/>
);

export const HeartBrokenIcon = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faHeartBroken}/>
);

export const BarsIcon = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faBars}/>
);

export const MovieIcon = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faVideo}/>
);

export const EllipsisIcon = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faEllipsisV}/>
);

export const EyeIcon = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faEye}/>
);

export const ThumbsUpIcon = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faThumbsUp}/>
);

export const BackIcon = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faHistory}/>
);

export const UserPlus = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faUserPlus}/>
);

export const TheatreMasks = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faTheaterMasks}/>
);

export const LovedIt = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faGrinHearts}/>
);

export const Meh = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faMeh}/>
);

export const HatedIt = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faTired}/>
);

export const Friends = (props: Props): JSX.Element => (
    <FontAwesomeIcon {...props} icon={faUserFriends}/>
);
