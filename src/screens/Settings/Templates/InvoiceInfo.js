import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";

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

export default InvoiceInfo = ({ order, fromCheckout, subTotal,promoCode,promoAmount }) => {
  let { net_paid, amount, delivery_charge, payment_mode,vat,tax } = order;
  return (
    <View style={{ marginTop: 10, paddingHorizontal: 24 }}>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text style={[styles.accountSetting, { fontSize: normalize(16) }]}>
          {string("Invoice")}
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          justifyContent: "space-between",
          flexDirection: "row"
        }}
      >
        <Text style={styles.profileLabel}>{string("Subtotal")}</Text>
        <Text
          style={[
            styles.amountMoney,
            { color: "#000000", fontSize: normalize(16) }
          ]}
        >
           {String.currency} {fromCheckout ? subTotal : amount}
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
          {string("Delivery Charges")}
        </Text>
        <Text
          style={[
            styles.amountMoney,
            { color: "#000000", fontSize: normalize(16) }
          ]}
        >
           {String.currency} {delivery_charge ? delivery_charge : 0}
        </Text>
      </View>
      {/* <View
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
          {"Tax Charges"}
        </Text>
        <Text
          style={[
            styles.amountMoney,
            { color: "#000000", fontSize: normalize(16) }
          ]}
        >
          ${tax ? tax : 0}
        </Text>
      </View> */}
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
          {string("Vat Charges")}
        </Text>
        <Text
          style={[
            styles.amountMoney,
            { color: "#000000", fontSize: normalize(16) }
          ]}
        >
         {String.currency} {vat ? vat : 0}
        </Text>
      </View>
      {
        promoCode && 
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
              color: "#FF7E5D",
              fontWeight: "normal",
              fontSize: normalize(13)
            }
          ]}
        >
          {`${string("Promo")} ${promoCode.coupan_code}`}
        </Text>
        <Text
          style={[
            styles.amountMoney,
            { color: "#FF7E5D", fontSize: normalize(13) }
          ]}
        >
          {`-${promoAmount}`}
        </Text>
      </View>
      }
     
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
          flexDirection: "row",
          alignItems:'flex-start'
        }}
      >
        <Text style={styles.accountSetting}>{string("total")}</Text>
        <Text
          style={[
            styles.accountSetting,
            { color: "#000000", fontSize: normalize(16) }
          ]}
        >
           {String.currency} {amount}
        </Text>
      </View>
      {!fromCheckout && (
        <View style={{ justifyContent: "space-between",alignItems:'flex-start', marginVertical: 16 }}>
          <Text style={[styles.accountSetting, { fontSize: normalize(16) }]}>
            {`${string('ModeofPayment')} ${
              payment_mode == 1 ? string("Cash on delivery") :string("Online")
            }`}
          </Text>
        </View>
      )}
    </View>
  );
};
