import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../../../utilities/config/colors";
import styles from "../../../styles";
import Text from "../../../components/Text";
import { normalize } from "../../../utilities/helpers/normalizeText";
import { Images } from "../../../utilities/contsants";

export const FilterItemsCheckBox = ({item,index,onSelect}) => {
  return  <TouchableOpacity key={index} activeOpacity={9} onPress={() => onSelect(item)}>
  <View key={index} style={{ flexDirection: 'row', paddingBottom: 7,
   alignItems: 'center' }}>
      {item.check ?
          <Image source={Images.checkBoxTrue} />
          : <Image source={Images.checkBoxFalse} />
      }
      <Text style={[styles.range, { paddingLeft: 10 }]}>{item.title}</Text>
  </View>
</TouchableOpacity>
};

export const FilterItemsRadio = ({item,index,onSelect}) => {
    return  <TouchableOpacity key={index} activeOpacity={9} onPress={() => onSelect(item)}>
    <View key={index} style={{ flexDirection: 'row', paddingBottom: 7,
     alignItems: 'center' }}>
        {item.check ?
            <Image source={Images.radioBoxTrue} />
            : <Image source={Images.radioBoxFalse} />
        }
        <Text style={[styles.range, { paddingLeft: 10 }]}>{item.title}</Text>
    </View>
  </TouchableOpacity>
  };
  