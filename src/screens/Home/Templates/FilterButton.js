import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { string } from "../../../utilities/languages/i18n";

import colors from "../../../utilities/config/colors";
import styles from "../../../styles";
import Text from "../../../components/Text";
import { normalize } from "../../../utilities/helpers/normalizeText";
const isEmpty = (object) =>{
  return  Object.values(object).every(x => (x === null || x === ''))
};

export const FilterButton = props => {
  return (
    <TouchableOpacity
    activeOpacity={0.75}
    onPress={()=> props.onPress()}
      style={[styles.shadow,{
        position: "absolute",
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderColor:'rgba(0,0,0,0.012)',
        borderWidth:1,
        alignItems: "center",
        justifyContent: "center",
        right: '35%',
        bottom: '5%',
        width: 104,
        height: 32,
        flexDirection:'row',
      }]}
    >
    <Text p style={{color:'#455F6C',fontSize:normalize(18)}}>{string("Filters")}</Text>
    {
    !isEmpty(props.filters.filters) && <View style={{backgroundColor:'#96C50F',
    position: "absolute",top:5,right:104/7,
    height:6,width:6,borderRadius:6/2}}/>}

    </TouchableOpacity>
  );
};
