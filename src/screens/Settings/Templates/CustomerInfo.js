import React from "react";
import { ScrollView, View,StyleSheet,Image } from "react-native";

import { LineChart } from "react-native-chart-kit";
import Feather from "react-native-vector-icons/Feather";

// Component
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../utilities/config/colors";
import styles from "../../../styles";
import Text from "../../../components/Text";
import { string } from "../../../utilities/languages/i18n";
import { screenDimensions } from "../../../utilities/contsants";
import { normalize } from "../../../utilities/helpers/normalizeText";
import { Images } from "../../../utilities/contsants";


export default CustomerInfo = props => {
return <View style={{ marginTop: 5, paddingHorizontal: 24 }}>
<View style={{ justifyContent: "space-between", flexDirection: "row" }}>
  <Text
    style={[
      styles.accountSetting,
      { color: "rgba(0,0,0,0.56)", fontSize: normalize(16) }
    ]}
  >
    {"Customer info"}
  </Text>
</View>
<View style={{ flexDirection: "row",paddingBottom:16 }}>
  <View style={{ marginTop: 10, flex: 0.9 }}>
    <Text
      style={[
        styles.profileLabel,
        { color: "#000000", lineHeight: 30, fontSize: normalize(16) }
      ]}
    >
      {"Leo Harmon"}
    </Text>
    <Text
      style={[
        styles.amountMoney,
        {
          color: "#000000",
          fontWeight: "normal",
          fontSize: normalize(16),
          lineHeight:28,
        }
      ]}
    >
      3065 Kirlin Prairie Suite 200, Sector 29D, oppo. Tribune colony
      Chandigarh 160030
    </Text>

    <View style={{ marginTop: 10 }}>
      <Text
        style={[
          styles.profileLabel,
          { color: "#000000", fontSize: normalize(16) }
        ]}
      >
        {"Delivered on"}
      </Text>
      <Text
        style={[
          styles.amountMoney,
          {
            color: "#000000",
            fontWeight: "normal",
            lineHeight: 24,
            fontSize: normalize(16)
          }
        ]}
      >
        Tuesday · 08-05-2019 · 8:42 PM
      </Text>
    </View>
  </View>
  <View
    style={{
       flex: 0.135,
      height:40,
      width:40,
      borderRadius:40/2,
      marginLeft:16,
      backgroundColor:'#96C50F',
      justifyContent: "center",
      alignItems: "center",
      marginTop:25
    }}
  >
    <Image   source={Images.phoneCall} style={{alignSelf:'center'}}/>
    {/* <Feather
      name={"phone-call"}
      size={28}
      color={"#96C50F"}
      style={{ alignSelf: "center" }}
    /> */}
  </View>
</View>
</View>
}
