import React from "react";
import { Image, View ,TouchableOpacity} from "react-native";
// Component
import colors from "../../../utilities/config/colors";
import styles from "../../../styles";
import Text from "../../../components/Text";
import { string } from "../../../utilities/languages/i18n";
import { normalize } from "../../../utilities/helpers/normalizeText";

export default (OrderListItem = ({item,index,renderButton,fromReturn,onPress}) => {
      return <TouchableOpacity
      onPress={() => onPress  ?onPress ():null}
      activeOpacity={9}
      index={index}
      style={[ styles.shadow,
        {
          backgroundColor: "white",
          paddingVertical: 16,
          marginTop:10,
          shadowRadius: 0.5
        }
      ]}
    >
      <View style={{ flexDirection: "row" }}>
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
            style={{ height: 96, width: 96, borderRadius: 4 }}
            source={{
              uri:
              "https://cdn.andamen.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/0/1/01_3_19.jpg"
            }}
          />
        </View>
        <View style={{ flex: 0.7, paddingLeft: 8 }}>
          <View>
            <Text p style={{ color: "#000000", fontSize: normalize(16),lineHeight:20 }}>
              {item.name}
            </Text>
            <Text
              p
              style={{ color: "rgba(0,0,0,0.56)", fontSize: normalize(13) }}
            >
              by {item.author}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 16
            }}
          >
            <Text
              h5
              style={{
                color:(item.status == "In Transit" || item.status == "Return in process")
                    ?"#96C50F" 
                    :"rgba(0,0,0,0.56)",
                fontSize: normalize(14)
              }}
            >
              {item.status == "Delivered"
                ? `${item.status} on 2·Feb·2018`
                : item.status}
            </Text>
          </View>
        
        </View>
      </View>
      {item.status == "Delivered" && !fromReturn? (
            <View style={{ flex: 1, flexDirection: "row", paddingTop: 14 }}>
              <View style={{ flex: 0.5 }} />
              {[
                { title: "Return", transparent: true },
                { title: "Order again", transparent: false }
              ].map((btn, index) => {
                return (
                  <View
                    style={{
                      flex: 0.4,
                      justifyContent: "flex-end",
                      paddingRight: index == 0 ? 10 : 0
                    }}
                  >
                    {renderButton(btn.title, btn.transparent)}
                  </View>
                );
              })}
            </View>
          ) : null}
    </TouchableOpacity>
})