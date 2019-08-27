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
import { Images } from "../../utilities/contsants";
import { normalize } from "../../utilities/helpers/normalizeText";
import AddressListItem from './Templates/AddressListItem'
import RenderLabel from './Templates/Label'
class BankAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      bankArray: [{
        title :'HDFC BANK',
        subTitle:'ACCOUNT NUMBER',
        description:'3541 **** **** 6789',

      },{
        title :'ICICI',
        subTitle:'ACCOUNT NUMBER',
        description:'3541 **** **** 6789',

      }]
    };
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
    this.props.navigation.navigate("AddNewBankAccount");
  };
  renderItems = ({ item, index }) => {
    return <AddressListItem item={item} index={index} 
            onPress={() => null}
            />
  };
  renderBankList = () => {
    return (
      <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 8 }}>
        <FlatList
          bounces={true}
          showsVerticalScrollIndicator={false}
          data={this.state.bankArray}
          keyExtractor={(item, index) => index + "bank"}
          renderItem={this.renderItems}
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
          title={"Bank Account"}
          backPress={() => this.props.navigation.goBack()}
        />
         <View style={{paddingHorizontal:24,marginBottom: 8,marginTop:16}}>
        <RenderLabel label={'Saved Address'}/>
        </View>
        {this.renderBankList()}
        <View style={{ flex: 0.2, paddingHorizontal: 16 }}>
          {this.renderButton("ADD NEW")}
        </View>
      </View>
    );
  }
}
export default BankAccount;
