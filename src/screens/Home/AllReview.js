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
// import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
//local imports
import Button from "../../components/Button";
import Text from "../../components/Text";
import styles from "../../styles";
import Header from "../../components/Header";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images, screenDimensions } from "../../utilities/contsants";
import { normalize } from "../../utilities/helpers/normalizeText";
import { NotificationPlaceholder } from "../Notifications/Templates/NotoficationPlaceholder";
import Rating from "../Products/Templates/Rating";
class AllReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      reviews: [1, 1, 1]
    };
    this.loaderComponent = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  renderButton = (title, transparent) => {
    return (
      <Button
        buttonStyle={{
          height: 48,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
          backgroundColor: transparent ? "transparent" : colors.primary
        }}
        fontSize={18}
        color={transparent ? colors.primary : "#FFFFFF"}
        onPress={() => this.pressButton(title)}
        title={title.toUpperCase()}
      />
    );
  };
  pressButton = () => {
    // this.props.navigation.navigate("AddNewBankAccount");
  };
  rightPress = () =>{

  }
  renderItems = ({ item, index }) => {
    return (
      <View style={[styles.shadow,{ flex: 1, marginTop: 8 ,
        paddingVertical:16,
        shadowRadius: 0.1,
        elevation:1,
      backgroundColor:'white'}]}>
        <View style={{ flexDirection: "row", flex: 1, paddingHorizontal: 16, }}>
          <View style={{ flex: 0.2 }}>
            {!item.vendor ? (
              <View>
                <Image
                  source={{
                    uri:
                      "https://www.seizeit-me.com/categories/94c8f26313f797911edada31ec1cdf0aRaT1oqa3Gf73A81FkCoaJuYGockq.jpg"
                  }}
                  style={{ width: 56, height: 56, borderRadius: 56 / 2 }}
                />
              </View>
            ) : null}
          </View>
          <View style={{ flex: 0.8 }}>
            <View style={{ justifyContent: "flex-start", flex: 0.8 }}>
              <Text p style={{ fontSize: normalize(12), color: "#000000" }}>
                {`${"Mangal Singh"}`}
              </Text>
              <Text p style={{ fontSize: normalize(12), color: "#000000" }}>
                {`${"January 29,2019"}`}
              </Text>
            </View>
            <View style={{ paddingTop: 2 }}>
            <Rating readOnly/>
            </View>
            <View style={{ paddingTop: 4 }}>
              <Text p style={{ fontSize: normalize(12), color: "#000000" }}>
                {`This component is imported from react-native-ratings ... Labels to show when each value is tapped e.g. If the first star is tapped, then value in index 0 will be used `}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  _renderReviewList = () => {
    return (
      <View style={{ flex: 1, marginTop: 8 }}>
        <FlatList
          bounces={true}
          showsVerticalScrollIndicator={false}
          data={this.state.reviews}
          keyExtractor={(item, index) => index + "bank"}
          renderItem={this.renderItems}
          ListEmptyComponent={
            <NotificationPlaceholder
              array={[1, 2, 2]}
              message={this.props.screenProps.loader ? "" : "No review found"}
              loader={this.loaderComponent}
            />
          }
        />
      </View>
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

          title={"All Review"}
          isRightText={"Add"}
          onRightPress={() => {
            this.rightPress();
          }}
          backPress={() => this.props.navigation.goBack()}
        />
        {this._renderReviewList()}
      </View>
    );
  }
}
export default AllReviews;
