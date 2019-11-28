import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Keyboard,
  TextInput
} from "react-native";
// import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
//local imports
import { postRequest, getRequest } from "../../redux/request/Service";

import Button from "../../components/Button";
import Text from "../../components/Text";
import styles from "../../styles";
import Header from "../../components/Header";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images } from "../../utilities/contsants";
import { normalize } from "../../utilities/helpers/normalizeText";
import TextInputComponent from "../../components/TextInput";
import Rating from "../Products/Templates/Rating";
import Validation from "../../utilities/validations";

class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      name: "",
      loader: false,
      rating: 0,
      refreshToken: null
    };
  }

  // Validation
  ValidationRules = () => {
    let { comment, rating } = this.state;
    let { lang } = this.props.screenProps.user;
    return [
      {
        field: rating,
        name: string("Rating"),
        rules: "required",
        lang: lang
      },
      {
        field: comment,
        name: string("Comment"),
        rules: "required|no_space",
        lang: lang
      }
    ];
  };
  //**************************Api Call ************************/
  submitReview = () => {
    let { setToastMessage } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    let { comment,rating } = this.state;
    let validation = Validation.validate(this.ValidationRules());
    if (validation.length != 0) {
      setToastMessage(true, colors.danger);
      return toastRef.show(validation[0].message);
    } else {
        let { params } = this.props.navigation.state;
        debugger
        let data = {}
        data['vendor_id'] =params.vendorId
        data['rating'] =rating
        data['feedback'] =comment
        debugger
        postRequest(`user/rate_vendor`, data).then(res => {
            if (res && res.success) {
               if (params && params.getAllReviews) {
                 params.getAllReviews();
               }
               if (params && params.getProductDetail) {
                params.getProductDetail();
              }
              }
              setToastMessage(true, colors.green1);
              toastRef.show(res.success);
              this.props.navigation.goBack()
          });
    }
  };
  pressButton = title => {
    if (title == "Submit") {
      this.submitReview();
    }
  };
  //**************************Api Call ************************/

  renderButton = (title, transparent,action) => {
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
        onPress={() => this.pressButton(action)}
        title={title.toUpperCase()}
      />
    );
  };
  renderLabel = title => {
    return (
      <View>
        <Text h2 style={styles.ratingHeading}>
          {title}
        </Text>
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
          title={string('Add Review')}
          backPress={() => this.props.navigation.goBack()}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={{ marginTop: 25, paddingHorizontal: 24 }}>
            <View style={{ paddingTop: 4 }}>
              {this.renderLabel(string("Rating"))}
              <View style={{ height: 8 }} />
              <Rating
                imageSize={42}
                defaultRating={this.state.rating}
                onRatingPress={rating => this.setState({ rating: rating })}
              />
            </View>
            <View style={{ height: 38 }} />
            {this.renderLabel(string("Comment"))}
            <TextInputComponent
              label={""}
              inputMenthod={input => {
                this.nameRef = input;
              }}
              placeholder={string('Enter comment')}
              placeholderTextColor="rgba(62,62,62,0.55)"
              selectionColor="#96C50F"
              returnKeyType="next"
              autoCorrect={false}
              autoCapitalize="none"
              textInputStyle={[
                styles.textInputStyle,
                { height: 150, paddingTop: 16 }
              ]}
              blurOnSubmit={false}
              multiline={true}
              viewTextStyle={[styles.viewcardTextStyle, { height: 150 }]}
              value={this.state.comment}
              underlineColorAndroid="transparent"
              isFocused={this.state.nameFieldFocus}
              onFocus={() => this.setState({ nameFieldFocus: true })}
              onBlur={() => this.setState({ nameFieldFocus: false })}
              onChangeText={comment => this.setState({ comment })}
              onSubmitEditing={event => {
                Keyboard.dismiss();
              }}
            />
          </View>
        </ScrollView>
        <View style={{ flex: 0.2, paddingHorizontal: 24 }}>
          {this.renderButton(string("Submit"),false,"Submit")}
        </View>
      </View>
    );
  }
}
export default AddReview;
