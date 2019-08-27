import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput
} from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/Ionicons";
//local imports
import Button from "../../components/Button";
import Text from "../../components/Text";
import styles from "../../styles";
import Header from "../../components/Header";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images } from "../../utilities/contsants";
import { normalize } from "../../utilities/helpers/normalizeText";

class ChangeLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      prices: [
        {
          title: "Low to High",
          check: true
        },
        {
          title: "High to Low",
          check: false
        }
      ],
    };
  }
  pressButton = () => {};
  renderButton = (title, transparent) => {
    return (
      <Button
        buttonStyle={{
          height: 32,
          width: 112,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          backgroundColor: transparent ? "transparent" : colors.primary
        }}
        fontSize={14}
        color={transparent ? colors.primary : "#FFFFFF"}
        onPress={() => this.pressButton(title)}
        title={title}
      />
    );
  };
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          isRightIcon={false}
          headerStyle={[
            styles.shadow,
            {
              backgroundColor: "#FFFFFF",
              shadowRadius: 0.1
            }
          ]}
          title={"Location"}
          backPress={() => this.props.navigation.dismiss()}
        />
        <ScrollView
          style={{ flex: 1, paddingHorizontal: 24 }}
          showsVerticalScrollIndicator={false}
        >
         
        </ScrollView>
      </View>
    );
  }
}
export default ChangeLocation;
