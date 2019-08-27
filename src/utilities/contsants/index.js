import { Dimensions } from "react-native";
import {normalize,textAligner} from '../helpers/normalizeText';

export const ISOCode = [
  { name: "United Arab Emirates", isoCode: "ARE", "country-code": "784" },
  { name: "Bahrain", isoCode: "BHR", "country-code": "048" },
  { name: "Saudi Arabia", isoCode: "SAU", "country-code": "682" }
];

export const colors = {
  appColor: "#F6871C",
  lightfontColor: "#455F6C",
  titleColor: "#5B251F",
  gradient: ["#3579C6", "#3579C6", "#28559F", "#22438C"]
};

export const fonts = {
  sourcesanspro: "SourceSansPro-Regular",
  
};

export const lineHeight = {
  normal: 16,
  medium: 18,
  large: 20,
  extraLarge: 24
};

export const fontSizes = {
  small: normalize(14),
  normal: normalize(16),
  medium: normalize(18),
  large:  normalize(20),
  title: normalize(24)
};

export const fontWeights = {
  first: "100",
  second: "200",
  third: "300",
  fourth: "400",
  fifth: "500",
  normal: "normal",
  bold: "bold"
};

export const screenDimensions = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};

export const Images = {
  homeLogo:require('../../assets/images/Logo.png'),
 backButton: require("../../assets/images/ic_back.png"),
 vendorIcon: require("../../assets/images/ic_business.png"),
 customerIcon: require("../../assets/images/ic_customer.png"),
facebookIcon:require('../../assets/images/ic_facebook.png'),
googleIcon:require('../../assets/images/ic_google.png'),
check:require('../../assets/images/ic_check.png'),
setting:require('../../assets/images/ic_settings.png'),
propfileimage:require('../../assets/images/Profile01.jpg'),
drop:require('../../assets/images/ic_dd_g.png'),
delete:require('../../assets/images/ic_delete.png'),
round:require('../../assets/images/ic_round_check_0.png'),
notification:require('../../assets/images/ic_notification.png'),
close_g :require('../../assets/images/ic_close_g.png'),
cart:require('../../assets/images/ic_cart.png'),
  addCart:require("../../assets/images/ic_add_cart.png"),
  removeCart:require("../../assets/images/ic_remove_cart.png"),

 checkBoxTrue : require("../../assets/images/ic_check_box_1.png"),
 checkBoxFalse : require("../../assets/images/ic_check_box_0.png"),
 radioBoxTrue : require("../../assets/images/ic_radio_1.png"),
 radioBoxFalse : require("../../assets/images/ic_radio_0.png"),
 inputClose : require("../../assets/images/ic_close_s.png")

};
