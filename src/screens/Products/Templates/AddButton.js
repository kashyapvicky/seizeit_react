import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../../../utilities/config/colors";
import { styles } from "../../../styles";
import Text from "../../../components/Text";

export const AddButton = props => {
  return (
    <TouchableOpacity
    onPress={()=> props.onPress()}
      style={{
        position: "absolute",
        bottom: 20,
        backgroundColor: colors.primary,
        borderRadius: 48 / 2,
        alignItems: "center",
        justifyContent: "center",
        right: 16,
        width: 48,
        height: 48
      }}
    >
      <Image source={require("../../../assets/images/ic_add_cart.png")} />
    </TouchableOpacity>
  );
};
