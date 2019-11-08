import React from "react";
import { ScrollView, View ,StyleSheet} from "react-native";

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

export default (InvoiceInfo = ({order,fromCheckout,subTotal}) => {
  debugger
  let {net_paid,amount,delivery_charge,payment_mode} = order
  return (
    <View style={{ marginTop: 10, paddingHorizontal: 24 }}>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text style={[styles.accountSetting, { fontSize: normalize(16) }]}>
          {"Invoice"}
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          justifyContent: "space-between",
          flexDirection: "row"
        }}
      >
        <Text style={styles.profileLabel}>{"Subtotal"}</Text>
        <Text
          style={[
            styles.amountMoney,
            { color: "#000000", fontSize: normalize(16) }
          ]}
        >
          ${fromCheckout ? subTotal :amount}
        </Text>
      </View>
      <View
        style={{
          marginTop: 2,
          paddingBottom: 5,
          justifyContent: "space-between",
          flexDirection: "row"
        }}
      >
        <Text
          style={[
            styles.profileLabel,
            {
              color: "#000000",
              fontWeight: "normal",
              fontSize: normalize(16)
            }
          ]}
        >
          {"Delivery Charges"}
        </Text>
        <Text
          style={[
            styles.amountMoney,
            { color: "#000000", fontSize: normalize(16) }
          ]}
        >
         ${delivery_charge ? delivery_charge : 0}
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          height: StyleSheet.hairlineWidth,
          backgroundColor: "rgba(91,37,31,0.12)"
        }}
      />
      <View
        style={{
          marginTop: 16,
          justifyContent: "space-between",
          flexDirection: "row"
        }}
      >
        <Text style={styles.accountSetting}>{string("total")}</Text>
        <Text
          style={[
            styles.accountSetting,
            { color: "#000000", fontSize: normalize(16) }
          ]}
        >
          ${amount}
        </Text>
      </View>
      {!fromCheckout && <View style={{ justifyContent: "space-between", marginVertical: 16 }}>
        <Text style={[styles.accountSetting, { fontSize: normalize(16) }]}>
          {`Mode of Payment: ${payment_mode == 1 ?'Cash on delivery' :'Online'}`}
        </Text>
      </View>}
    </View>
  );
});
