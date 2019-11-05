import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView
} from "react-native";

//local imports
import { Images } from "../../utilities/contsants";
import Button from "../../components/Button";
import Text from "../../components/Text";
import styles from "../../styles";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { normalize } from "../../utilities/helpers/normalizeText";
class ChooseType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      chooseType: [
        {
          name: "Vendor",
          icon: Images.vendorIcon,
          isSelect: false
        },
        {
          name: "Customer",
          icon: Images.customerIcon,
          isSelect: false
        }
      ]
    };
  }

  pressButton = role => {
    this.setState({
      chooseType: this.state.chooseType.map(x => {
        if (x.name == role) {
          return {
            ...x,
            isSelect: true
          };
        } else {
          return {
            ...x,
            isSelect: false
          };
        }
      })
    });
    this.props.navigation.navigate("Signup", {
      role: role
    });
  };
  renderButton = (title, transparent) => {
    return (
      <Button
        buttonStyle={{
          height: 48,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          backgroundColor: transparent ? "transparent" : colors.primary
        }}
        fontSize={18}
        color={transparent ? colors.primary : "#FFFFFF"}
        onPress={() => this.pressButton(title)}
        title={title.toUpperCase()}
      />
    );
  };
  renderLabel = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text
          h4
          textAlign
          style={{ fontSize: normalize(24), fontWeight: "normal" }}
        >{`Please choose what type of user are you?`}</Text>
      </View>
    );
  };

  renderType = () => {
    return this.state.chooseType.map(item => (
      <TouchableOpacity
        onPress={() => this.pressButton(item.name)}
        style={[
          styles.shadow,
          {
            alignSelf: "center",
            justifyContent: "center",
            marginBottom: 24,
            elevation: 2,
            backgroundColor: "#FFFFFF",

            width: 168,
            height: 192,
            borderRadius: 24,
            borderColor: item.isSelect ? colors.primary : "transparent",
            borderWidth: 1
          }
        ]}
      >
        {item.isSelect ? (
          <View style={{ top: 10, right: 10, position: "absolute" }}>
            <Image source={Images.check} />
          </View>
        ) : null}
        <View style={{ alignSelf: "center", paddingTop: 16 }}>
          <Image source={item.icon} />
        </View>

        <View style={{ height: 16 }} />
        <Text
          h4
          textAlign
          style={{ fontSize: normalize(16), fontWeight: "bold" }}
        >{`${item.name}`}</Text>
      </TouchableOpacity>
    ));
  };
  render() {
    return (
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={[styles.backButtonImage, { alignItems: "center" }]}>
              <Image source={Images.backButton} />
            </View>
          </TouchableOpacity>
        </View>
        {this.renderLabel()}
        <View style={{ height: 32 }} />
        {this.renderType()}
      </View>
    );
  }
}
export default ChooseType;
