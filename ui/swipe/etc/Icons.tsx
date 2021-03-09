import {ImageBackground, ImageStyle} from "react-native";
import {Icon, IconElement} from "@ui-kitten/components";
import React from "react";

export const FacebookIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='facebook'/>
);

export const GoogleIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='google'/>
);

export const TwitterIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='twitter'/>
);

export const EmailIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='email'/>
);

export const PasswordIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='lock'/>
);

export const PersonIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='person'/>
);

export const PlusIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='plus'/>
);

export const FlagIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='flag' fill='#FFF' />
);

export const SettingsIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='settings' fill='#FFF' />
);

export const PersonAdd = (style: ImageStyle): IconElement => (
    <Icon {...style} name='person-add' fill='#FFF'  />
);

export const ReportIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='flag' fill='#FFF' />
)
