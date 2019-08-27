import React from "react";
import {
  TouchableNativeFeedback,
  TouchableHighlight,
  StyleSheet,
  View,
  Platform,
  Image,
  Text as NativeText
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import colors from "../utilities/config/colors";
import Text from "./Text";
import { normalize } from "../utilities/helpers/normalizeText";
import fonts from "../utilities/config/font";

const log = () => {
  console.log("please attach method to this component"); //eslint-disable-line no-console
};

const Button = props => {
  const {
    disabled,
    title,
    titleView,
    buttonStyle,
    borderRadius,
    buttonTextStyle,
    onPress,
    secondary,
    secondary2,
    secondary3,
    iconLeft,
    iconLeftName,
    iconRight,
    color,
    fontSize,
    underlayColor,
    raised,
    textStyle,
    imageLeft,
    iconRightName,
    subTitle,
    containerViewStyle,
    rightText,
    numberOfLines,
    ...attributes
  } = props;
  let { Component } = props;

  if (!Component && Platform.OS === "ios") {
    Component = TouchableHighlight;
  }
  if (!Component && Platform.OS === "android") {
    Component = TouchableNativeFeedback;
  }
  if (!Component) {
    Component = TouchableHighlight;
  }
  if (Platform.OS === "android" && (borderRadius && !attributes.background)) {
    attributes.background = TouchableNativeFeedback.Ripple(
      "ThemeAttrAndroid",
      true
    );
  }
  return (
    <View
      style={[styles.container, raised && styles.raised, containerViewStyle]}
    >
      <Component
        underlayColor={underlayColor || "transparent"}
        onPress={onPress || log}
        disabled={disabled || false}
        {...attributes}
      >
        <View
          style={[
            styles.button,
            secondary && { backgroundColor: colors.secondary },
            secondary2 && { backgroundColor: colors.secondary2 },
            secondary3 && {
              backgroundColor: colors.secondary3,
              borderColor: colors.blue,
              borderWidth: 2
            },
            buttonStyle && buttonStyle
          ]}
        >
          <View style={{ flexDirection: "row", flex: 1 }}>
            {imageLeft ? (
              <View
                style={{
                  paddingLeft: 12,
                  justifyContent: "flex-start",
                  flex: 0.1
                }}
              >
                {props.imageSource ? (props.imageLeftLocal) ?<Image
                      style={{ width: 28, height: 28}}
                      source={props.imageLeftLocal}
                    /> :
                  (
                  <Image
                    style={{ width: 35, height: 35, borderRadius: 35 / 2 }}
                    source={{ uri: props.imageSource }}
                  />
                ) : (
                  <Image
                    style={styles.iconLeft}
                    source={require("../assets/images/profile.jpeg")}
                  />
                )
            }
              </View>
            ) : null}
            {iconLeft ? (
              <View
                style={{
                  paddingRight: 12,
                  justifyContent: "flex-start",
                  flex: 0.1
                }}
              >
                {props.iconType == "FontAwesome" ? (
                  <FontAwesome
                    style={styles.iconLeft}
                    size={24}
                    color={colors.transparentColor}
                    name={iconLeftName}
                  />
                ) : props.iconType == "MaterialIcons" ? (
                  <MaterialIcons
                    style={styles.iconLeft}
                    size={28}
                    color={
                      props.iconLeftColor
                        ? props.iconLeftColor
                        : colors.transparentColor
                    }
                    name={iconLeftName}
                  />
                ) : (
                  <Icon
                    style={styles.iconLeft}
                    size={28}
                    color={colors.transparentColor}
                    name={iconLeftName}
                  />
                )}
              </View>
            ) : null}
            {title ? (
              <View
                style={{
                  flex: iconRight || iconLeft ? (rightText ? 1 : 0.9) : 1,
                  paddingTop: imageLeft ? 4 : 0,
                  justifyContent: "flex-start",
                  paddingLeft: 10
                }}
              >
                <View
                  style={[{
                    flexDirection: "row",
                    justifyContent:  (iconRight || iconLeft ? 
                      (rightText ? "space-between" : "flex-start") :  "center"),
                      
                  }, buttonTextStyle && buttonTextStyle]}
                >
                  <Text
                    style={[
                      styles.text,
                      color && { color },
                      fontSize && { fontSize },
                      textStyle && textStyle,
                      secondary && { color: colors.grey0 },
                      secondary3 && { color: colors.blue },
                      {
                        alignSelf:
                        iconRight || iconLeft ? "flex-start" : "center"
                      },
                      buttonTextStyle && buttonTextStyle
                    ]}
                    numberOfLines={numberOfLines ? numberOfLines : 5}
                  >
                    {title}
                  </Text>
                  {rightText && (
                    <Text style={{ alignSelf: "center" }} p>{rightText}</Text>
                  )}
                </View>
                {subTitle ? (
                  <Text
                    p
                    style={[
                      {
                        fontSize: 14,
                        lineHeight: 30,
                        color: colors.transparentColor
                      },
                      props.subTitleStyle
                    ]}
                  >
                    {subTitle}
                  </Text>
                ) : null}
              </View>
            ) : null}
          </View>
          {titleView ? titleView : null}
          {iconRight ? (
            <View style={{ paddingHorizontal: 16, flex: 0.05 }}>
              <Icon
                style={styles.iconLeft}
                name={iconRightName}
                size={18}
                color={
                  props.iconColor ? colors.iconColor : colors.transparentColor
                }
              />
            </View>
          ) : null}
        </View>
      </Component>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent"
    // marginLeft: 15,
    // marginRight: 15,
  },

  button: {
    // padding: 16,
   // borderRadius: 48/2,
   backgroundColor: colors.primary,
   justifyContent: "center",
   alignItems: "center",
   flexDirection: "row",
   borderColor:colors.primary,
   borderWidth:1
  },
  text: {
    color: "white",
    // alignSelf:'center',
    fontWeight: "500",
    fontSize: normalize(16)
  },
  iconLeft: {
    alignSelf: "center"

    // width: 2,
  }
});

export default Button;

