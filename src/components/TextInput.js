import React, { Component } from "react";
import {
  TextInput,
  View,
  Animated,
  Text,
  TouchableOpacity,
  Platform,
  Image
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "../styles";
import { string } from "../utilities/languages/i18n";
import { fonts } from "../utilities/contsants";
import { normalize } from "../utilities/helpers/normalizeText";
import colors from "../utilities/config/colors";
import DropDownList from "./DropDownList";

export default class TextInputLabel extends Component {
  render() {
    let { isFocused } = this.props;
    let labelStyle = {
      // position: 'absolute',
      // left: 0,
      // top: !isFocused ? 5 : -10,

      fontSize: !isFocused ? normalize(16) : normalize(16),
      color: !isFocused ? "rgba(0,0,0,0.56)" : "#96C50F",
      ...styles.text
    };
    if (this.props.bankAccount) {
      labelStyle = {
        fontSize: normalize(15),
        color: "#000000",
        ...styles.text
      };
    }
    let borderColor = {
      borderColor: !isFocused ? "rgba(0,0,0,0.2)" : "#96C50F"
    };
    // let {textAlign,fontFamilyBold,fontFamilyRegular} = this.props.user
    return (
      <View style={{ marginTop: 10, }}>
        {
        this.props.label ? <Text p style={labelStyle}>
          {this.props.label}
        </Text> : null}
        <TouchableOpacity
          onPress={() => (this.props.onPress ?this.props.onPress() : null)}
          style={[
            this.props.viewTextStyle,
            {
              borderColor: borderColor.borderColor,
              borderRadius: 4,
              flexDirection: "row",
              // paddingVertical: 5,
              marginTop: 10,
              paddingLeft: 15
            }
          ]}
          disabled={this.props.editable}
        >
          <View
            style={{
              flex:
                this.props.rightIcon && this.props.rightIcon != null ? 0.9 : 1
            }}
          >
            <TextInput
              
              style={{
                height: 48,
                fontSize: normalize(20),
                textAlign: "left",
                // fontWeight: "500",
                color: '#000000',
                fontFamily: fonts.sourcesanspro,

             
                ...styles.text,
                ...this.props.textInputStyle,
                // lineHeight:16
                // borderBottomWidth: 1, borderBottomColor: isFocused ? '#75B152' : 'rgba(0,0,0,0.11)'
              }}
              {...this.props}
              // secureTextEntry={this.props.secureTextEntry?this.props.secureTextEntry:false}
              ref={ref =>
                this.props.inputMenthod ? this.props.inputMenthod(ref) : null
              }
            />
          </View>

          {this.props.rightIcon && this.props.rightIcon != null ? (
            <View
              style={{
                flex: 0.1,
                paddingRight: 16,
                justifyContent: "center",
                alignItems: "flex-end"
              }}
            >
              {
                <Image source={this.props.rightIcon} />
              }
              {/* <Ionicons
                name={this.props.rightIcon}
                size={18}
                color={"#96C50F"}
              /> */}
            </View>
          ) : null}

        </TouchableOpacity>
        {this.props.openDropDown ? 
          <DropDownList 
            {...this.props}
         /> : null}

      </View>
    );
  }
}
