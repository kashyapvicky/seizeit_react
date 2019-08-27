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
} from "react-native";

//local imports
import submitRequest from "../../assets/images/illustration_cart.png";
import styles from "../../styles";
import Button from "../../components/Button";
import { string } from "../../utilities/languages/i18n";
import { screenDimensions } from "../../utilities/contsants";
import { normalize } from "../../utilities/helpers/normalizeText";
import colors from "../../utilities/config/colors";

const initialState = {
  username: "Leo Harmon",
  mobileNumber: "+91 902-319-4565",
  allProduts: [],
  addresses: [
    {
      id: 1,
      name: "Leo Harmon",
      address:
        "3065 Kirlin Prairie Suite 200, Sector 29D,  oppo. Tribune colony Chandigarh 160030"
    },
    {
      id: 2,
      name: "Cody Ramos",
      address:
        "3065 Kirlin Prairie Suite 200, Sector 29D,  oppo. Tribune colony Chandigarh 160030"
    }
  ],
  refreshing: false,
  isModalVisible: false,
  qauntity: []
};

export default class OrderSuccessFull extends Component {
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

  handleBackPress = () => {
    this.props.navigation.navigate("Home");
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
    this.props.navigation.navigate("Home");
  };
  render() {
    let { params } = this.props.navigation.state;
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <ScrollView style={{flex:1,paddingHorizontal:24}}>
          <View style={{ flex:1, alignItems: "center" ,justifyContent:'center',paddingTop:16}}>
                <Image source={submitRequest} resizeMode={"cover"} />
              </View>
              <View style={{height:35 }} />

              <View style={styles.OrderSuccessFullViewTitleMessge}>
                <Text style={styles.requetSubmitted}>
                  {string("orderSuccessfull")}
                </Text>
                <View style={{height:15 }} />
                <View style={{ marginHorizontal: 10,}}>

                  <Text style={styles.requestSubmitedMessage}>
                    {`Thanks for your order, You will receive it by Thursday, 21 Feb 2019`}
                  </Text>
                </View>
              </View>
              <View style={{height:55 }} />
              <View style={{flex:1, }}>
                {this.renderButton(string("continueShopping"))}
                <View style={{height:10 }} />
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Orders", {
                      orderSuccessTrue: true
                    })
                  }
                >
                  <View style={{ marginTop: 15 }}>
                    <Text style={styles.moreDetail}>
                      {string("vieworderdetails")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
