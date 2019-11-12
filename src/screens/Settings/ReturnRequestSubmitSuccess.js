import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  ImageBackground
}
from "react-native";
import {
  DrawerActions,
  NavigationActions,
  StackActions
} from "react-navigation";

//local imports
import styles from "../../styles";
import Button from "../../components/Button";
import { string } from "../../utilities/languages/i18n";
import { screenDimensions, Images } from "../../utilities/contsants";
import { normalize } from "../../utilities/helpers/normalizeText";
import colors from "../../utilities/config/colors";

const initialState = {
  username: "Leo Harmon",
  mobileNumber: "+91 902-319-4565",
  orderArrivedDate: "",
  allProduts: [],
  refreshing: false,
  isModalVisible: false,
  qauntity: []
};
export default class ReturnRequestSubmitSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  resetStack = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: "CardStack" }),
      ]
    });
    this.props.navigation.dispatch(resetAction);
    // this.props.navigation.dismiss()
  };
  handleBackPress = () => {
    this.resetStack()
    setTimeout(()=>this.props.navigation.navigate("Home"),0)
  };
  renderButton = (title, transparent) => {
    return (
      <Button
        buttonStyle={{
          height: 48,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 24,
          backgroundColor: transparent ? "transparent" : colors.primary
        }}
        buttonTextStyle={{ fontSize: normalize(16), fontWeight: "bold" }}
        color={transparent ? colors.primary : "#FFFFFF"}
        onPress={() => this.pressButton(title)}
        title={title}
      />
    );
  };
  pressButton = () => {
    //;
    this.resetStack()
    setTimeout(()=>this.props.navigation.navigate("Home"),0)
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <ScrollView style={{ flex: 1, paddingHorizontal: 24 }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 16
              }}
            >
              <Image
                source={Images.returnRequestSuccess}
                resizeMode={"cover"}
              />
            </View>
            <View style={{ height: 35 }} />
            <View style={styles.OrderSuccessFullViewTitleMessge}>
              <Text style={styles.requetSubmitted}>{"Request Submitted"}</Text>
              <View style={{ height: 15 }} />
              <View style={{ marginHorizontal: 8 }}>
                <Text style={styles.requestSubmitedMessage}>
                  {`Our pickup person will pick item from your selected address within 2  working days.`}
                </Text>
              </View>
            </View>
            <View style={{ height: 55 }} />
            <View style={{ flex: 1 }}>
              {this.renderButton(string("continueShopping"))}
              <View style={{ height: 10 }} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
