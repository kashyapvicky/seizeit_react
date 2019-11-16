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
import {ReviewItem} from './Templates/ReviewItem'

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
     this.props.navigation.navigate("AddReview");

  }
  renderItems = ({ item, index }) => {
    return <ReviewItem  item={item} index={index}/>
  };
  _renderReviewList = () => {
    return (
      <View style={{ flex: 1, marginTop: 8, paddingHorizontal: 16, }}>
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
