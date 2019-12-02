import React, { Component } from "react";
import {
  TextInput,
  View,
  Animated,
  Text,
  TouchableOpacity,
  Platform,
  I18nManager,
  Image
} from "react-native";
import Icons from "react-native-vector-icons/Ionicons";
import styles from "../styles";
import { string } from "../utilities/languages/i18n";
import { normalize } from "../utilities/helpers/normalizeText";
import colors from "../utilities/config/colors";
import { Images } from "../utilities/contsants";

export default  SearchInput = (props) =>{

    return <TouchableOpacity 
    onPress={()=> props.onPress ? props.onPress() : null}
    style={[styles.searchView,props.style && props.style]}>
    <View style={{flex:0.05,alignSelf:'center',paddingLeft:16}}>
    <Icons  name={'ios-search'} size={22} color={'#96C50F'} />
    </View>
    <TouchableOpacity 
    activeOpacity={0.9}
     behavior={'height'}
    style={{
      flex: 0.9,
      flexDirection: "row",
      paddingLeft:4,
      justifyContent: "space-between"
    }} onPress={()=> props.onPress ? props.onPress() : null}>
    <TextInput
          style={{
            height: 40,
            fontSize: normalize(14),
             textAlign:  I18nManager.isRTL ? "right":"left",
            paddingHorizontal:16,
            // fontWeight: "500",
            color: "#96C50F",
            // fontFamily: fonts.sourcesanspro
            // lineHeight:16
            // borderBottomWidth: 1, borderBottomColor: isFocused ? '#75B152' : 'rgba(0,0,0,0.11)'
          }}
          placeholder={props.placeHolder}
          placeholderTextColor={'#96C50F'}
          {...props}
          // secureTextEntry={this.props.secureTextEntry?this.props.secureTextEntry:false}
        />
           {props.searchText ? (
          <TouchableOpacity
            style={{ alignSelf: "center",flex:0.1 }}
            onPress={() =>
             props.closeSearch()
            }
          >
            <Image source={Images.inputClose} style={{ alignSelf: "center" }} />
          </TouchableOpacity>
        ) : null}
    </TouchableOpacity>
</TouchableOpacity>
}