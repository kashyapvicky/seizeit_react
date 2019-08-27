import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  Dimensions
} from "react-native";
import FlipView from "react-native-flip-view";

//local imports
import Button from "../../components/Button";
import Text from "../../components/Text";
import styles from "../../styles";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images } from "../../utilities/contsants";
import Blogs from './Blogs'
const deviceHeight = Dimensions.get("window").height;

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      mobileNumber: "",
      isFlipped: false,
      visible: false,
      userImage: require("../../assets/images/profile.jpeg"),
      modalY: new Animated.Value(-deviceHeight),
      facebookuser: null,
      isModalVisible: true,
      accountSettingArr: [
        {
          name: "Bank",
          description: "2 Bank accounts added",
          routeName: "BankAccount"
        },
        {
          name: "Wishlist",
          description: "Create your wishlist to buy in future",
          routeName: "Wishlist"
        },
        {
          name: "Address",
          description: "Add, Edit or remove your address",
          routeName: "Address"
        },
        {
          name: "Cards",
          description: "2 cards Saved",
          routeName: "PaymentsCards"
        }
      ],
      ordersArray: [
        {
          name: "Order History",
          description: "History of upcoming and past orders",
          routeName: "Orders"
        },
        {
          name: "Order Placed",
          description: "Your upcoming and past orders",
          routeName: "OrderPlaced"
        },
        {
          name: "Returns",
          description: "You can track your return process",
          routeName: "Returns"
        }
      ]
    };
  }

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
 
  closeModal = () => {};
  _flip = () => {
    this.setState({ isFlipped: !this.state.isFlipped });
}

  flipCard = () => {
    this.setState({ isFlipped: true })
}
_renderBack = () => {

  return (
      <Blogs navigation={this.props.navigation} flip={() => this._flip()} />
  )

}
  _renderFront = () => {
    return (
      <TouchableOpacity
        activeOpacity={9}
        style={{ flex: 1 }}
        onPress={() => this.closeModal()}
      >
        <View style={{ flex: 1, paddingTop: 16 }}>
          {/* {this.renderModal()} */}

          {/* {this.props && this.props.user ? */}
          <View style={styles.profileView} activeOpacity={0.7}>
            <View>
              <TouchableOpacity onPress={() => null} style={styles.shadow}>
                <Image
                  source={this.state.userImage}
                  style={{
                    height: 80,
                    width: 80,
                    borderRadius: 80 / 2,
                    borderColor: "#FFFFFF",
                    borderWidth: 4
                  }}
                />
              </TouchableOpacity>
              <Text style={[styles.notificationTitle, { paddingTop: 5 }]}>
                {"Leo Harmon"}
              </Text>
              <Text
                style={[styles.mobileNumberText, { paddingTop: 5 }]}
              >{`+91 902-319-4565`}</Text>
            </View>
            <TouchableOpacity onPress={() => null}>
              <View>
                <Image source={Images.setting} />
              </View>
            </TouchableOpacity>
          </View>
          {/* :
                        null
                    } */}

          <View style={styles.bottomSpace2} />

          {/* {this.props && this.props.user ? */}
          <ScrollView>
            <View style={{ paddingHorizontal: 30 }}>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.accountSetting}>
                  {string("accountSettings")}
                </Text>
              </View>
              {this.state.accountSettingArr.map((account, i) => {
                return (
                  <TouchableOpacity
                    key={"account" + i}
                    style={[
                      this.state.accountSettingArr.length - 1 != i &&
                        styles.shadow,
                      {
                        backgroundColor: "white",
                        shadowRadius: 0.1,
                        marginBottom:
                          this.state.accountSettingArr.length - 1 != i ? 20 : 0
                      }
                    ]}
                    onPress={() =>
                      this.props.navigation.navigate(account.routeName)
                    }
                  >
                    <View
                      style={[styles.contactUsView, { borderBottomWidth: 0 }]}
                    >
                      <Text style={styles.titleOneText}>{account.name}</Text>
                      <Text style={styles.titleTwoText}>
                        {account.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.bottomSpace2} />
            <View style={{ paddingHorizontal: 30 }}>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.accountSetting}>{string("orders")}</Text>
              </View>
              {this.state.ordersArray.map((res, index) => {
                return (
                  <TouchableOpacity
                    key={index + "order"}
                    onPress={() =>
                      this.props.navigation.navigate(res.routeName)
                    }
                  >
                    <View style={styles.contactUsView}>
                      <Text style={styles.titleOneText}>{res.name}</Text>
                      <Text style={styles.titleTwoText}>{res.description}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.bottomSpace2} />

            <View style={{ paddingHorizontal: 30 }}>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.accountSetting}>{string("other")}</Text>
              </View>
              {/* {this.props && this.props.user && this.props.user.role_id == 3 ?
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('MyCustomers')}>
                                    <View style={styles.contactUsView}>
                                        <Text style={styles.titleOneText}>{string('customers')}</Text>
                                        <Text style={styles.titleTwoText}>{string('allCustomers')}</Text>
                                    </View>
                                </TouchableOpacity>


                                :
                                null
                            } */}

              {/* {this.props && this.props.user && this.props.user.role_id == 3 ?
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfitStructure')}>
                                    <View style={styles.contactUsView}>
                                        <Text style={styles.titleOneText}>{string('profitSructure')}</Text>
                                        <Text style={styles.titleTwoText}>{string('profitbydownline')}</Text>
                                    </View>
                                </TouchableOpacity>


                                :
                                null
                            } */}

              <TouchableOpacity onPress={() => this.flipCard()}>
                <View style={styles.contactUsView}>
                  <Text style={styles.titleOneText}>{string("blogs")}</Text>
                  <Text style={styles.titleTwoText}>{string("readBlogs")}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Contact")}
              >
                <View style={[styles.contactUsView, { borderBottomWidth: 0 }]}>
                  <Text style={styles.titleOneText}>{string("contactus")}</Text>
                  <Text style={styles.titleTwoText}>
                    {string("happytohelp")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.bottomSpaceProfile} />
          </ScrollView>
          {/* :
                        null} */}
        </View>
      </TouchableOpacity>
    );
  };
  
  render() {
    return (
      <FlipView
        style={{ flex: 1 }}
        ref={input => (this.flip = input)}
        front={this._renderFront()}
        back={this._renderBack()}
        isFlipped={this.state.isFlipped}
        onFlipped={val => {
          console.log("Flipped: " + val);
        }}
        flipAxis="y"
        flipEasing={Easing.out(Easing.ease)}
        flipDuration={500}
        perspective={1000}
      />
    );
  }
}
export default Settings;
