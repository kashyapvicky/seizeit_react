import React from "react";
import { Image, View ,TouchableOpacity} from "react-native";
// Component
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../utilities/config/colors";
import styles from "../../../styles";
import Text from "../../../components/Text";
import { string } from "../../../utilities/languages/i18n";
import {Images} from '../../../utilities/contsants'
import { normalize } from "../../../utilities/helpers/normalizeText";

export default (AddressListItem = ({item,index,onPress,descriptionSize}) => {
return <TouchableOpacity
onPress={()=>onPress ? onPress() : null}
activeOpacity={9}
index={index}
style={[
  styles.shadow,
  {
    backgroundColor: "white",
    paddingVertical: 8,
    marginBottom: 8,
    shadowRadius: 0.1
  }
]}
>
<View style={{ flexDirection: "row", paddingBottom: 8 }}>
  <TouchableOpacity style={{ flex: 0.1, paddingLeft: 0,paddingTop:6,paddingRight:8 }}>
    {/* <Ionicons
      name={"md-checkmark-circle"}
      size={24}
      color={"#96C50F"}
    /> */}
  <Image source={Images.round} style={{alignSelf:'center'}}/>
  </TouchableOpacity>
  <View style={{ flex: 0.9 }}>
    <View style={{ flexDirection: "row" }}>
      <Text
        h5
        style={{
          color: "#000000",
          fontSize: normalize(16),
          fontWeight: "bold"
        }}
      >
       {item.title}
      </Text>
    </View>
    {item.subTitle ?  <View
      style={{ flexDirection: "row", justifyContent: "space-between" }}
    >
    <Text
        p
        style={{
          color: "#000000",
          fontWeight: '600',
          fontSize: normalize(12),
          letterSpacing: 0.5
        }}
      >
       {  item.subTitle }
      </Text>
      <View style={{ flex: 0.2, alignItems: "center" }}>
        <Image source={Images.delete} />
        {/* <Ionicons name={"ios-trash"} size={28} color={"#D8D8D8"} /> */}
      </View>
    </View> :null}
    <View
      style={{ flexDirection: "row", justifyContent: "space-between" }}
    >
      <View style={{flex:0.8}}>
      <Text
        p
        style={{
          color: "#000000",
          fontSize: descriptionSize ? descriptionSize :normalize(20),
          lineHeight: 30
        }}
      >
          {item.description}
      </Text>
      </View>
     
      {descriptionSize ? <View style={{ flex: 0.2, alignItems: "center" }}>
        <Image source={Images.delete} />
        {/* <Ionicons name={"ios-trash"} size={28} color={"#D8D8D8"} /> */}
      </View> : null}
    </View>
  </View>
</View>
</TouchableOpacity>
})