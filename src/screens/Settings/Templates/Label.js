import React from "react";
import { Image, View ,TouchableOpacity} from "react-native";
// Component
import colors from "../../../utilities/config/colors";
import styles from "../../../styles";
import Text from "../../../components/Text";
import { string } from "../../../utilities/languages/i18n";
import { normalize } from "../../../utilities/helpers/normalizeText";

export default (RenderLabel = ({label,rightLabel,onPressChange}) => {
      return <View
          style={{
            flexDirection: "row",
            justifyContent:'space-between'
          }}
        >
          <Text
            h5
            style={{
              color: "#000000",
              fontSize: normalize(16),
              fontWeight: "bold"
            }}
          >
            {label}
          </Text>
          {
            rightLabel ? 
            <TouchableOpacity onPress={() =>{
              onPressChange ? onPressChange() : null
            }}>
            <Text
              h5
              style={{
                color: colors.primary,
                fontSize: normalize(12),
                fontWeight: "bold"
              }}
            >
              {rightLabel}
            </Text>
            </TouchableOpacity>:null
           }
          </View>
})