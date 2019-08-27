import React from "react";
import {  TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../../../utilities/config/colors";
import { styles } from "../../../styles";
import Text from "../../../components/Text";

export const Header = props => {
return <TouchableOpacity
onPress={() => props.goBack()}
style={{
  // paddingVertical: 5,
  // flex: 0.1,
  alignItems: "flex-start",
  flexDirection: "row"
}}
>
{!props.hideIcon && <Ionicons name="ios-arrow-back" size={28}
style={{alignSelf:'center'}}
 color={colors.black2} />}
<Text p style={[styles.WsRegular,{paddingLeft:10,alignSelf:'center'}]}>
{props.title}{" "}
</Text>
</TouchableOpacity>
}