import React,{useState} from "react";
import { StyleSheet, View,ActivityIndicator, TouchableOpacity, Image } from "react-native";
import colors from "../../../utilities/config/colors";
const  ListFooterComponent = props => {
  return (
    <View>
      {props.fetchingStatus ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{marginLeft: 6}}
        />
      ) : null}
    </View>
  );
};

export default ListFooterComponent
