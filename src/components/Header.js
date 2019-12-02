import React from "react";
import { StyleSheet, View, Image,I18nManager, TouchableOpacity } from "react-native";
import Text from "./Text";
import Icon from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "..//utilities/config/colors";
import { normalize } from "../utilities/helpers/normalizeText";
import { Images } from "../utilities/contsants";
const Header = props => {
  const {
    title,
    backPress,
    headerStyle,
    onPressLocation,
    onRightPress,
    carts
  } = props;
  return (
    <View style={[styles.container, headerStyle && headerStyle]}>
      {!props.hideLeftIcon ? (
        <TouchableOpacity
          hitSlop={{ left: 50, right: 50, top: 50, bottom: 50 }}
          style={{ justifyContent: "center", }}
          onPress={() => (backPress ? backPress() : null)}
        >
          <Icon
            name={"arrow-back"}
            size={28}
            color={"#000000"}
            style={{ alignSelf: "center",transform: [
              { scaleX: I18nManager.isRTL ?-1 :1}]}
            }
          />
        </TouchableOpacity>
      ) : null}
      {title ? (
        <TouchableOpacity
          disabled={!props.isLocation}
          onPress={() => (onPressLocation ? onPressLocation() : null)}
          style={{
            flex: 1,
            paddingRight: 4,
            paddingLeft: 12,
            flexDirection: "row"
          }}
        >
          {props.isLocation && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingRight: 4
              }}
            >
              <Image
                source={require("../assets/images/ic_location_pin.png")}
                style={{ alignSelf: "center" }}
              />
            </View>
          )}

          <View style={{ justifyContent: "center" }}>
            <Text
              p
              textAlign
              style={{
                color: "#000",
                alignSelf: "center",
                fontSize: normalize(16)
              }}
            >
              {title}
            </Text>
          </View>
          {props.isLocation && (
            <View style={{ justifyContent: "center" }}>
              <Image source={Images.drop} style={{ alignSelf: "center" }} />
            </View>
          )}
        </TouchableOpacity>
      ) : null}
      {props.isRightIcon || props.isRightText ? (
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 16
          }}
          onPress={() => onRightPress && onRightPress()}
        >
          {props.isRightText ? (
            <Text
              h4
              style={{
                alignSelf: "center",
                color: colors.primary,
                fontSize: normalize(14)
              }}
            >
            {props.isRightText}
            </Text>
          ) : (
            <Image source={props.isRightIcon} style={{ alignSelf: "center" }} />
          )}
          {carts && carts.length > 0 ? (
            <TouchableOpacity
            onPress={() => onRightPress && onRightPress()}
            style={{
                zIndex: 1,
                position: "absolute",
                backgroundColor: colors.primary,
                borderRadius: 17 / 2,
                width: 17,
                height: 17,
                top: -5,
                right: 2,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                p
                style={{
                  color: "white",
                  fontSize: normalize(12),
                  fontWeight: "600",
                  lineHeight:18
                }}
              >
                {carts.length}
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
          {/* <Ionicons
            name={props.isRightIcon}
            size={28}
            color={colors.primary}
            style={{ alignSelf: "center" }}
          /> */}
        </TouchableOpacity>
      ) : null}
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    flex: 0.075,
    justifyContent: "space-between",
    display: "flex",
    paddingVertical: 8,
    paddingHorizontal: 16
  }
});
export default Header;
