/**
 * GetStarted Screen
 */

import React, { Component } from "react";
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Ionicons from 'react-native-vector-icons/Ionicons'
// Components
import CustomeButton from "../../components/Button";
import { normalize } from "../../utilities/helpers/normalizeText";
import Text from "../../components/Text";
import colors from "../..//utilities/config/colors";
import { Images } from "../../utilities/contsants";
const { width, height } = Dimensions.get("window");
export default class AppIntro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: [
        {
          image: Images.walk1,
          title: "Browse Products",
          description: (
            <Text p style={styles.introDesc}>
              {`Browse all products in different categories,and select your favourite one. `}
            </Text>
          )
        },
        {
            image: Images.walk2,
          title: "Secure Payments",
          description: (
            <Text p style={styles.introDesc}>
              {`All payments of platform are fully secured and from trusted authorities`}
            </Text>
          )
        },

        {
            image: Images.walk3,
          title: "Easy and Fast Deliveries",
          description: (
            <Text p style={styles.introDesc}>
              {`Super easy and fast deliveries on our platform.`}
            </Text>
          )
        },
        {
            image: Images.walk4,
          title: "Grow with Seize IT",
          description: (
            <Text p style={styles.introDesc}>
              {`Earn with us, Become a Vendor and sell on our platform`}
            </Text>
          )
        }
      ]
    };
    this.props.screenProps.actions.setIndicator(false);
    this.checkWalkThrough()
  }
  checkWalkThrough = () => {
    let {walkThrough } = this.props.screenProps.user;
      if(walkThrough) {
        this.props.navigation.navigate("AuthStack");
    }
  };
  _renderItem = ({ item }) => {
    return (
      <View style={styles.mainContent}>
        <View style={{ height: (height / height) * 62 }} />
        <View style={{flex:1,paddingHorizontal:16}}>
        <Image
          source={item.image}
          style={styles.image}
        //   resizeMode={"contain"}
        />
        </View>
       
        <View
          style={{
            paddingHorizontal: 16,
            flex: 0.52,
            justifyContent: "center"
          }}
        >
          <View
            style={{
              alignSelf: "center",
              flex: 0.15,
              paddingVertical: 8,
              justifyContent: "center"
            }}
          >
            <Text
              h1
              style={{
                color: "#000000",
                fontSize: normalize(18),
                textAlign: "center"
              }}
            >
              {item.title}
            </Text>
          </View>
          {item.description}
        </View>
      </View>
    );
  };
  renderButton = (title, transparent) => {
    return (
      <CustomeButton
        buttonStyle={{
          height: 52,
          justifyContent: "center",
          alignItems: "center",
          // borderRadius: 4,
          borderColor: transparent ? "rgba(0,0,0,0.1)" : "transparent",
          backgroundColor: colors.primary
        }}
        buttonTextStyle={{ fontWeight: "500" }}
        fontSize={normalize(14)}
        color={transparent ? "#000000" : "#FFFFFF"}
        onPress={() => this.pressButton(title)}
        title={title}
      />
    );
  };
  pressButton = title => {
  
  };
  renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
          <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  onDonePress = ()=>{
      let {setWalkThrough} = this.props.screenProps.actions
      debugger
      if(setWalkThrough){
        setWalkThrough(true)

      }
       this.props.navigation.navigate('StartupScreen')
  }
  render() {
    let { user } = this.props.screenProps;
    return (
        <AppIntroSlider
          renderItem={this._renderItem}
          slides={this.state.slides}
          activeDotStyle={{ backgroundColor: colors.primary }}
          onSlideChange={(index, lastIndex) =>
            this.setState({ slideIndex: index })
          }
          onDone={()=> this.onDonePress()}
          showSkipButton={true}
          renderDoneButton={()=> this.renderDoneButton()}
          // imageStyle={{width:'100%',height:'100%'}}
        />
      
    );
  }
}

// HowPrestartwork Styles
let styles = {
  container: {
    flex: 1
    // backgroundColor: '#F5F5F5',
  },

  centerAlign: {
    justifyContent: "center",
    alignItems: "center"
  },
  mainContent: {
    flex: 1
    // alignSelf: "center"
    // justifyContent: 'center',
    // backgroundColor:'red'
  },
  image: {
    width: "100%",
    height:'100%'
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "transparent",
    textAlign: "center",
    paddingHorizontal: 16
  },
  title: {
    fontSize: 22,
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center",
    marginBottom: 16
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: { color: "#000000", fontSize: normalize(11), fontWeight: "500" },
  introDesc: { textAlign: "center", fontSize: normalize(16), color: "#000000" }
};
