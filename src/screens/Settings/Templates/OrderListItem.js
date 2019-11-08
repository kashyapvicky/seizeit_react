import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
// Component
import colors from "../../../utilities/config/colors";
import styles from "../../../styles";
import Text from "../../../components/Text";
import { string } from "../../../utilities/languages/i18n";
import { normalize } from "../../../utilities/helpers/normalizeText";
import { Images } from "../../../utilities/contsants";

export default OrderListItem = ({
  item,
  index,
  renderButton,
  fromReturn,
  onPress
}) => {
  return (
    <TouchableOpacity
      onPress={() => (onPress ? onPress() : null)}
      activeOpacity={9}
      index={index}
      style={[
        styles.shadow,
        {
          backgroundColor: "white",
          paddingVertical: 16,
          marginTop: 10,
          shadowRadius: 0.5
        }
      ]}
    >
        {item &&
          item.product_detail &&
          item.product_detail &&
              <View
                style={{ flexDirection: "row", flex: 1 }}
              >
                <View
                  style={[
                    styles.shadow,
                    {
                      flex: 0.3,
                      shadowColor: "rgba(0,0,0)",
                      shadowOpacity: 1,
                      shadowRadius: 0.1
                    }
                  ]}
                >
                  <Image
                    style={{ height: 96, width: "100%", borderRadius: 4 }}
                    source={item.product_detail.pics && item.product_detail.pics.length > 0 ? {
                      uri:item.product_detail.pics[0].pic }: Images.no_image}
                  />
                </View>
                <View style={{ flex: 0.7, paddingLeft: 12 }}>
                  <View>
                    <Text
                      p
                      style={{
                        color: "#000000",
                        fontSize: normalize(16),
                        lineHeight: 20
                      }}
                    >
                      {item.product_detail.product_title}
                    </Text>
                    <View style={{ justifyContent: "flex-end", flex: 1,paddingTop:8 }}>
                    <Text
                      p
                      style={{
                        color: "rgba(0,0,0,0.56)",
                        fontSize: normalize(13)
                      }}
                    >
                      by{" "}
                      {item.product_detail.vendor && item.product_detail.vendor.name
                        ? item.product_detail.vendor.name
                        : ""}
                    </Text>
                  </View>
                  </View>
              
                </View>
              </View>
        }
        <View
          style={{
            flex:1,
            flexDirection:'row',
          }}
        >
        <View style={{flex:0.4}}></View>
        <View style={{flex:0.8,alignItems:'flex-start'}}>
          <Text
            h5
            style={{
              color:
                item.status == 1 || item.status == 5
                  ? "#96C50F"
                  : "rgba(0,0,0,0.56)",
              fontSize: normalize(14)
            }}
          >
            {item.status == 4 ? `${item.stausMessage} on 2·Feb·2018` : item.stausMessage}
          </Text>
          </View>
        </View>
    </TouchableOpacity>
  );
};
