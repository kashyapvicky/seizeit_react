import React from "react";
import {
  TouchableNativeFeedback,
  TouchableHighlight,
  StyleSheet,
  View,
  Platform,
  Image,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Images, screenDimensions } from "../utilities/contsants";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import colors from "../utilities/config/colors";
import Text from "./Text";
import { normalize } from "../utilities/helpers/normalizeText";
import styles from "../styles";
import { string } from "../utilities/languages/i18n";
import Button from "./Button";

export const GuestLoginView = (props) => {
    let {image} = props
  return (
    <ImageBackground
      source={image}
      style={{
        flex: 1
      }}
      // resizeMode={'cover'}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20
        }}
      >
        <View
          style={{
            marginBottom: 24,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 20
          }}
        >
          <View style={[styles.homelogo2]}>
            <Image source={Images.homelogo} />
          </View>
          <Text style={styles.unlock}>{string("unlockprofile")}</Text>
          <View style={{ height: 4 }} />
          <Text style={styles.unlock2}>{string("unlock2")}</Text>
        </View>
        <View style={{flex:0.1}}>
        <Button
          buttonStyle={{
            height: 40,
            width:screenDimensions.width-64,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            borderColor:colors.primary,
            backgroundColor: colors.primary
          }}
          fontSize={normalize(13)}
          color={"#FFFFFF"}
          onPress={() => props.navigation.navigate("AuthNavigatorStack")}
          title={string("logintocontinue")}
        />
        </View>
        
      </View>
    </ImageBackground>
  );
};
