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
  TextInput,
  TouchableWithoutFeedback
} from "react-native";
// import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import ToggleSwitch from "toggle-switch-react-native";
//local imports
import Button from "../../components/Button";
import Text from "../../components/Text";
import styles from "../../styles";
import Header from "../../components/Header";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images } from "../../utilities/contsants";
import { normalize } from "../../utilities/helpers/normalizeText";
import TextInputComponent from "../../components/TextInput";
import DropDownList from "../../components/DropDownList";
const rightIcon=require('../../assets/images/ic_dd_g.png')

let initalSetDropdownState = {
  openDropDownCat: false,
  openDropDownProductPrice: false,
  openDropDownProductSize: false,
  openDropDownSubCat: false
};
class AddNewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountNumber: "",
      confirmAccountNumber: "",
      ifscNumber: "",
      productCategory: "",
      productSubCategory: "",
      productSize: "",
      noOfTimeUsed: "",
      name: "",
      loader: false,
      securePassword: true,
      visible: false,
      refreshToken: null,
      openDropDown: false
    };
  }

  renderButton = (title, transparent) => {
    return (
      <Button
        buttonStyle={{
          height: 48,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 0,
          backgroundColor: transparent ? "transparent" : colors.primary
        }}
        fontSize={18}
        color={transparent ? colors.primary : "#FFFFFF"}
        onPress={() => this.pressButton(title)}
        title={title.toUpperCase()}
      />
    );
  };
  renderTopSection = () => {
    return (
      <View style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 16 }}>
        <View style={[styles.rowWithSpaceBetween]}>
          <Text
            p
            textAlign
            style={{
              color: "#000",
              alignSelf: "flex-start",
              fontSize: normalize(18)
            }}
          >
            Available for sale
          </Text>
          <ToggleSwitch
            isOn={this.state.isOnAvailSale}
            onColor="#96C50F"
            offColor="rgba(0,0,0,0.12)"
            size="medium"
            onToggle={isOnAvailSale => {
              this.setState({ isOnAvailSale });
            }}
          />
        </View>
        <View style={{ height: 24 }} />
        <View style={[styles.rowWithSpaceBetween]}>
          <Text
            p
            textAlign
            style={{
              color: "#000",
              alignSelf: "flex-start",
              fontSize: normalize(18)
            }}
          >
            Sold out
          </Text>
          <ToggleSwitch
            isOn={this.state.isSoldOut}
            onColor="#96C50F"
            offColor="rgba(0,0,0,0.12)"
            size="medium"
            onToggle={isSoldOut => {
              this.setState({ isSoldOut });
            }}
          />
        </View>
      </View>
    );
  };
  renderLabel = title => {
    return (
      <View style={{ paddingVertical: 8 }}>
        <Text
          p
          textAlign
          style={{
            color: "#000000",
            alignSelf: "flex-start",
            fontSize: normalize(18)
          }}
        >
          {title}
        </Text>
      </View>
    );
  };
  renderImages = () => {
    return (
      <View
        style={[
          styles.shadow,
          {
            flex: 0.3,
            shadowColor: "rgba(0,0,0)",
            shadowOpacity: 0.19,
            shadowRadius: 0.1
          }
        ]}
      >
        <Image
          style={{ height: 72, width: 72, borderRadius: 4 }}
          source={{
            uri:
              "https://cdn.andamen.com/media/catalog/product/cache/1/list_image/500x/040ec09b1e35df139433887a97daa66f/o/p/openfileartboard15.jpg"
          }}
        />
      </View>
    );
  };
  renderProductImgaes = () => {
    return (
      <FlatList
        bounces={true}
        numColumns={4}
        showsVerticalScrollIndicator={false}
        data={[1, 2, 3, 5]}
        keyExtractor={(item, index) => index + "images"}
        renderItem={this.renderImages}
      />
    );
  };
  pressButton = ()=>{

  }
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          this.setState({
            ...this.state,
            ...initalSetDropdownState
          })
        }
      >
        <View style={{ flex: 1 }}>
          <Header
            isRightIcon={Images.close_g}
            hideLeftIcon={true}
            headerStyle={[
              styles.shadow,
              {
                backgroundColor: "#FFFFFF",
                shadowRadius: 0.1
              }
            ]}
            title={"Add a Product"}
            onRightPress={() => this.props.navigation.goBack()}
          />
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <View style={{ height: 16 }} />
            {this.renderTopSection()}
            <View style={styles.borderSalesReport} />
            <View
              style={{ marginTop: 10, paddingHorizontal: 24, paddingBottom: 8 }}
            >
              {this.renderLabel("Product Details")}
              <TextInputComponent
                user={this.props.user}
                onPress={() =>
                  this.setState({
                    openDropDownCat: !this.state.openDropDownCat
                  })
                }
                selectItem={(item)=> this.setState({
                  productCategory:item,
                  openDropDownCat:false
                })}
                openDropDown={this.state.openDropDownCat}
                label={"Product category"}
                editable={false}
                inputMenthod={input => {
                  this.productCateRef = input;
                }}
                // placeholder={'6985 9685 9452 6623'}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                textInputStyle={[styles.addProductTextInputStyle]}
                viewTextStyle={styles.addProductTextInputView}
                value={this.state.productCategory}
                underlineColorAndroid="transparent"
                isFocused={this.state.productCatFieldFocus}
                onFocus={() => this.setState({ productCatFieldFocus: true })}
                onBlur={() => this.setState({ productCatFieldFocus: false })}
                //   onChangeText={productTitle => this.setState({ productTitle })}
                rightIcon={rightIcon}
                onSubmitEditing={event => {
                  this.productSubCateRef.focus();
                }}
              />
              <View style={{ height: 10 }} />
              <TextInputComponent
                user={this.props.user}
                label={"Sub Category"}
                inputMenthod={input => {
                  this.productSubCateRef = input;
                }}
                onPress={() =>
                  this.setState({
                    openDropDownSubCat: !this.state.openDropDownSubCat,
                 

                  })
                }
                selectItem={(item)=> this.setState({
                  productSubCategory:item,
                  openDropDownSubCat:false
                })}
                openDropDown={this.state.openDropDownSubCat}
                editable={false}
                // placeholder={'6985 9685 9452 6623'}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                textInputStyle={[styles.addProductTextInputStyle]}
                viewTextStyle={styles.addProductTextInputView}
                value={this.state.productSubCategory}
                underlineColorAndroid="transparent"
                isFocused={this.state.productSubCatFieldFocus}
                onFocus={() => this.setState({ productSubCatFieldFocus: true })}
                onBlur={() => this.setState({ productSubCatFieldFocus: false })}
                //   onChangeText={productTitle => this.setState({ productTitle })}
                rightIcon={rightIcon}
                onSubmitEditing={event => {
                  this.productTitleRef.focus();
                }}
              />
              <View style={{ height: 10 }} />
              <TextInputComponent
                user={this.props.user}
                label={"Product Title"}
                inputMenthod={input => {
                  this.productTitleRef = input;
                }}
                // placeholder={'6985 9685 9452 6623'}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                textInputStyle={[styles.addProductTextInputStyle]}
                viewTextStyle={styles.addProductTextInputView}
                value={this.state.productTitle}
                underlineColorAndroid="transparent"
                isFocused={this.state.productTitleFieldFocus}
                onFocus={() => this.setState({ productTitleFieldFocus: true })}
                onBlur={() => this.setState({ productTitleFieldFocus: false })}
                onChangeText={productTitle => this.setState({ productTitle })}
                onSubmitEditing={event => {
                  this.productDesRef.focus();
                }}
                // textInputStyle={styles.textInputStyle}
              />
              <View style={{ height: 10 }} />
              <TextInputComponent
                label={"Product Description"}
                inputMenthod={input => {
                  this.productDesRef = input;
                }}
                // placeholder={'Vikram Bawa'}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                textInputStyle={[
                  styles.addProductTextInputStyle,
                  { height: 72 }
                ]}
                blurOnSubmit={false}
                multiline
                viewTextStyle={[styles.addProductTextInputView, { height: 72 }]}
                value={this.state.productDes}
                underlineColorAndroid="transparent"
                isFocused={this.state.productDesFieldFocus}
                onFocus={() => this.setState({ productDesFieldFocus: true })}
                onBlur={() => this.setState({ productDesFieldFocus: false })}
                onChangeText={productDes => this.setState({ productDes })}
                onSubmitEditing={event => {
                  this.productSizeRef.focus();
                }}
              />
              <View style={{ height: 10 }} />
              <TextInputComponent
                user={this.props.user}
                label={"Size"}
                inputMenthod={input => {
                  this.productSizeRef = input;
                }}
                selectItem={(item)=> this.setState({
                  productSize:item,
                  openDropDownProductSize:false
                })}
                editable={false}
                // placeholder={'6985 9685 9452 6623'}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                textInputStyle={[styles.addProductTextInputStyle]}
                viewTextStyle={styles.addProductTextInputView}
                value={this.state.productSize}
                underlineColorAndroid="transparent"
                rightIcon={rightIcon}
                onPress={() =>
                  this.setState({
                    openDropDownProductSize: !this.state.openDropDownProductSize
                  })
                }
                openDropDown={this.state.openDropDownProductSize}
                isFocused={this.state.productSizeFieldFocus}
                onFocus={() => this.setState({ productSizeFieldFocus: true })}
                onBlur={() => this.setState({ productSizeFieldFocus: false })}
                //   onChangeText={productTitle => this.setState({ productTitle })}
                onSubmitEditing={event => {
                  this.productNameOfTimeRef.focus();
                }}
                // textInputStyle={styles.textInputStyle}
              />
              <View style={{ height: 10 }} />
              <TextInputComponent
                user={this.props.user}
                label={"Number of time it is used"}
                inputMenthod={input => {
                  this.productNameOfTimeRef = input;
                }}
                selectItem={(item)=> this.setState({
                  noOfTimeUsed:item,
                  openDropDownProductPrice:false
                })}
                editable={false}
                placeholder={"in $$"}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                textInputStyle={[styles.addProductTextInputStyle]}
                viewTextStyle={styles.addProductTextInputView}
                value={this.state.noOfTimeUsed}
                onPress={() =>
                  this.setState({
                    openDropDownProductPrice: !this.state
                      .openDropDownProductPrice
                  })
                }
                openDropDown={this.state.openDropDownProductPrice}
                underlineColorAndroid="transparent"
                rightIcon={rightIcon}
                isFocused={this.state.productPriceFieldFocus}
                onFocus={() => this.setState({ productPriceFieldFocus: true })}
                onBlur={() => this.setState({ productPriceFieldFocus: false })}
                //   onChangeText={productTitle => this.setState({ productTitle })}
                onSubmitEditing={event => {
                  Keyboard.dismiss();
                }}
                // textInputStyle={styles.textInputStyle}
              />
            </View>
            <View style={styles.borderSalesReport} />
            <View style={{ paddingHorizontal: 24 }}>
              {this.renderLabel("Product Images")}
              <View style={{ height: 10 }} />
              {this.renderProductImgaes()}
            </View>
            <View style={{ height: 20 }} />
          </ScrollView>
          {this.renderButton("Add a Product")}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
export default AddNewProduct;
