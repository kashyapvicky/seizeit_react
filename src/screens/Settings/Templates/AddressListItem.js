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

export default (AddressListItem = ({item,index,onPress,descriptionSize,deleteAddress,updateDefaultAddress,from}) => {
return <TouchableOpacity
onPress={()=>(onPress && from == 'Address') ? onPress() : null}
activeOpacity={9}
index={index}
style={[
  styles.shadow,
  {
    backgroundColor: "white",
    paddingVertical: 16,
    marginBottom: 8,
    shadowRadius: 0.1
  }
]}
>
<View style={{ flexDirection: "row", paddingBottom: 8 }}>
  <TouchableOpacity 
  onPress={()=> updateDefaultAddress ? updateDefaultAddress() : null}
  style={{ flex: 0.1, paddingLeft: 0,paddingTop:6,paddingRight:8 }}>
    {
      item.is_active ?
      <Image source={Images.check} style={{alignSelf:'center'}}/>
      :  <Image source={Images.round} style={{alignSelf:'center'}}/>
    }
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
      <TouchableOpacity 
      style={{ flex: 0.2, alignItems: "center" }}>
        <Image source={Images.delete} />
        {/* <Ionicons name={"ios-trash"} size={28} color={"#D8D8D8"} /> */}
      </TouchableOpacity>
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
     
      {descriptionSize && from == 'Address' ? <TouchableOpacity 
       onPress={() => deleteAddress ? deleteAddress() : null}
      style={{ flex: 0.2, alignItems: "center" }}>
        <Image source={Images.delete} />
        {/* <Ionicons name={"ios-trash"} size={28} color={"#D8D8D8"} /> */}
      </TouchableOpacity> : null}
    </View>
  </View>
</View>
</TouchableOpacity>
})