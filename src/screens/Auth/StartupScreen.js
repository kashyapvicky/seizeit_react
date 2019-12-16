import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView
} from "react-native";
import RNRestart from "react-native-restart";
//local imports
import { getRequest } from "../../redux/request/Service";
import Button from "../../components/Button";
import Text from "../../components/Text";
import styles from "../../styles";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images, screenDimensions } from "../../utilities/contsants";
import { normalize } from "../../utilities/helpers/normalizeText";
class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      cartItems: [],
      language:'en'
    };
    this.props.screenProps.actions.setIndicator(false);
    this.checkUserLogin()
  }
  //component did mount
  componentDidMount(){
    let {lang} = this.props.screenProps.user
    this.setState({
      language:lang
    })
  }
  shopasguest = () => {
    this.props.navigation.navigate("App");
  };
  checkUserLogin = () => {
    let { user } = this.props.screenProps.user;
    if (user) {
      let { user_type } = user;
      if (user_type == "vendor") {
        this.props.navigation.navigate("VendorTabNavigator");
      } else if (user_type == "customer") {
        this.props.navigation.navigate("CustomerTabNavigator");
      }
    }
  };
  // Change Language Function
  changeLanguage = async lang => {
    this.setState(
      {
        language: lang
      },
      async () => {
        if (lang == "en") {
          this.props.screenProps.setI18nConfig("en", false);
        } else if (lang == "ar") {
          this.props.screenProps.setI18nConfig("ar", true);         
        }
       this.props.screenProps.actions.setLanguage(lang);
       this.reloadApp(lang)
      }
    );
  };
  reloadApp = async (lang)=>{
    this.props.screenProps.actions.setLanguage(lang).then(async(res) =>{
      setTime = setTimeout(async () => {
          await RNRestart.Restart();
      }, 500)
    })
  }
  pressButton = title => {
    if (title == "Login") {
      this.props.navigation.navigate("Login");
    } else {
      //  this.props.screenProps.setI18nConfig('en',false)
      this.props.navigation.navigate("CustomerTabNavigator");
    }
  };

  renderButton = (title, transparent,action) => {
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
        onPress={() => this.pressButton(action)}
        title={title.toUpperCase()}
      />
    );
  };
  renderLangButton = () => {
    let language = this.props.screenProps.user.lang
    return (
      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-end",
          paddingVertical: 16
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: screenDimensions.width / 4
          }}
        >
          <TouchableOpacity
             onPress={() => this.changeLanguage("en")}
            style={
             [language == "en"
                ? styles.selectedLangButton
                : styles.unSelectedLangButton,{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }]
            }
          >
            <Text
              p
              style={
                language == "en"
                  ? styles.selectedLangText
                  : styles.unSelectedLangText
              }
            >
              EN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
             onPress={() => this.changeLanguage("ar")}
            style={
             [ language == "ar"
                ? styles.selectedLangButton
                : styles.unSelectedLangButton,{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderTopRightRadius:10,
                  borderBottomRightRadius: 10,
                }]
            }
          >
            <Text
              p
              style={
                language == "ar"
                  ? styles.selectedLangText
                  : styles.unSelectedLangText
              }
            >
              AR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {this.renderLangButton()}
        <View style={[styles.homeLogo, { flex: 1, justifyContent: "center" }]}>
          <Image source={Images.homeLogo} />
        </View>
        <View style={[styles.bottomStyle]}>
          {this.renderButton(string('Shop as a guest'),false,'Shop as a guest')}
          <View style={{ height: 20 }} />
          {this.renderButton(string("Login"), "transparent",'Login')}
          <View style={{ height: 20 }} />
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Signup", {
                role: "Vendor"
              })
            }
            style={styles.dontHaveAnAccountView}
          >
            <Text style={styles.whatisPetPartner}>
              {string("BecomeAVendor")}
            </Text>
          </TouchableOpacity>
          <View style={{ height: 20 }} />
        </View>
      </View>
    );
  }
}
export default StartScreen;
