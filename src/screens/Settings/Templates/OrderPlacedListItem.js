import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
// Component
import colors from "../../../utilities/config/colors";
import styles from "../../../styles";
import Text from "../../../components/Text";
import { string } from "../../../utilities/languages/i18n";
import { normalize } from "../../../utilities/helpers/normalizeText";
import { Images } from "../../../utilities/contsants";

export default OrderPlacedListItem = ({
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
      <View style={{ flex: 1, paddingTop: 8 }}>
        <Text
          h5
          style={{
            color: "#000000",
            fontSize: normalize(16),
            lineHeight: 18
          }}
        >
          {`#ORDER${item.id}`}
        </Text>
      </View>
      {item &&
        item.order_detail &&
        item.order_detail.length > 0 &&
        item.order_detail.map((resItem, i) => {
          let {product_detail, status, stausMessage} = resItem
          return (
            <View key={i + "orderplaced"}>
              <View
                style={{ flexDirection: "row", flex: 1, paddingVertical: 16 }}
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
                    source={
                      product_detail.pics && product_detail.pics.length > 0
                        ? {
                            uri: product_detail.pics[0].pic
                          }
                        : Images.no_image
                    }
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
                      {product_detail.product_title}
                    </Text>
                    <View
                      style={{
                        justifyContent: "flex-end",
                        flex: 1,
                        paddingTop: 8
                      }}
                    >
                      <Text
                        p
                        style={{
                          color: "rgba(0,0,0,0.56)",
                          fontSize: normalize(13)
                        }}
                      >
                        by{" "}
                        {product_detail.vendor && product_detail.vendor.name
                          ? product_detail.vendor.name
                          : ""}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row"
                }}
              >
                <View style={{ flex: 0.4 }}></View>
                <View style={{ flex: 0.8, alignItems: "flex-start" }}>
                  <Text
                    h5
                    style={{
                      color:
                        status == 1 || status == 5
                          ? "#96C50F"
                          : "rgba(0,0,0,0.56)",
                      fontSize: normalize(14)
                    }}
                  >
                    {status == 7
                      ? `${stausMessage} on 2·Feb·2018`
                      : stausMessage}
                  </Text>
                </View>
              </View>
         {status == 7 && <View style={{flexDirection:'row',flex:1,paddingTop:16,paddingBottom:16}}>
          <View style={{flex:0.35}}/>
          <View style={{flex:0.3}}>
          {renderButton('Return',true,resItem,item)}
          </View>
          <View style={{flex:0.05}} />
          <View style={{flex:0.3}}>
          {renderButton('Order again',false,resItem,item)}
          </View>
          </View>}
            </View>
          );
        })}
      
    </TouchableOpacity>
  );
};
