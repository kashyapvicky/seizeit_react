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
import { getRequest, postRequest } from '../../redux/request/Service'

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
import { AddressPlaceholder } from "./Templates/AddressPlaceholder";

class BankAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      bankArray: [],
      selectedBank: null,
      isRefreshing: false
    };
    this.loaderComponent = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  componentDidMount() {
    this.getBankList()
  }
  handleRefresh = () => {
    this.setState({
      isRefreshing: true
    }, () => {
      this.getBankList()
    })
  }

  /*******************************APi Call  ***************************/

  getBankList = () => {
    let { setToastMessage, setIndicator } = this.props.screenProps.actions;
    getRequest("vendor/get_banks")
      .then(res => {
        debugger;
        if (res && res.data && res.data.length > 0) {
          let { params } = this.props.navigation.state;
          this.setState(
            {
              bankArray: res.data.map((item, i) => {
                return {
                  ...item,
                  title: item.bank_name,
                  subTitle: 'ACCOUNT NUMBER',
                  description: item.account_number
                }
              }),
              isRefreshing: false
            }, () => {
              if (this.state.bankArray.length == 1 && (params && params.fromRequestTransfer)) {
                this.setState({
                  bankArray: this.state.bankArray.map((x) => {
                    return { ...x, is_active: true }
                  }),
                  selectedBank: this.state.bankArray[0]
                })



              }
            })


        } else {
          this.setState({
            bankArray: [],
            isRefreshing: false
          });
        }
        setIndicator(false);
      })
      .catch(err => { });
  };
  // Update Address
  deleteBank = item => {
    debugger
    let { setToastMessage, setIndicator } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    let { params } = this.props.navigation.state;
    let data = {}
    data['bank_id'] = item.id
    postRequest(`vendor/delete_bank`, data)
      .then(res => {
        debugger
        if (res && res.success) {
          setToastMessage(true, colors.green1);
          toastRef.show(res.success);
          this.setState({
            bankArray: this.state.bankArray.filter(x => x.id != item.id)
          });
          // if ((params && params.address_id) == item.id) {
          //     params.updateDefaultAddress("", false);

          // }
        }
        setIndicator(false);
      })
      .catch(err => { });
  };
  updateDefaultBank = (item) => {
    this.setState({
      bankArray: this.state.bankArray.map((bank, i) => {
        if (item.id == bank.id) {
          return {
            ...bank,
            is_active: true
          }
        } else {
          return {
            ...bank,
            is_active: false
          }
        }
      }),
      selectedBank: item
    })
  }
  /*******************************APi Call  ***************************/
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
  pressButton = (title) => {
    if(title == 'ADD NEW'){
      this.props.navigation.navigate("AddNewBankAccount", {
        getBankList: () => this.getBankList()
      });
    }else if(title == 'SUBMIT'){
      let { params } = this.props.navigation.state;
      let { toastRef } = this.props.screenProps;

      let { setToastMessage,setIndicator } = this.props.screenProps.actions;
      if(this.state.selectedBank){
        let data = {}
        data['amount'] =params.amount
        data['account_id'] = this.state.selectedBank.id
       postRequest(`vendor/request_transfer`,data)
       .then(res => { 
         debugger
         if(res.transaction){
             setToastMessage(true,colors.green1)
             toastRef.show(res.success)
             this.props.navigation.pop(2)
         }
         setIndicator(false);
       })
      }else{
        setToastMessage(true,colors.danger)
        toastRef.show('Select bank first')
      }
     
    }
   
  };
  renderItems = ({ item, index }) => {
    let { params } = this.props.navigation.state
    return <AddressListItem item={item} index={index}
      onPress={() => null}
      updateDefaultAddress={() => this.updateDefaultBank(item)}
      fromSetting={params && params.fromSetting ? true : false}
      deleteAddress={() => this.deleteBank(item)}
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
          refreshing={this.state.isRefreshing}
          onRefresh={this.handleRefresh}
          ListEmptyComponent={
            <AddressPlaceholder
              array={[1, 2, 3]}
              loader={this.loaderComponent}
            />
          }


        />
      </View>
    );
  };

  render() {
    let { params } = this.props.navigation.state
     let buttonTitle='ADD NEW'
     let labelName = 'Saved Bank Account'
    let {selectedBank} = this.state
    if(params && params.fromRequestTransfer && selectedBank){
      buttonTitle = 'SUBMIT'
   }
   if(params && params.fromRequestTransfer){
    buttonTitle = 'Select Bank Account'
   }
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
        {this.state.bankArray.length > 0 && <View style={{ paddingHorizontal: 24, marginBottom: 8, marginTop: 24 }}>
          <RenderLabel label={labelName} />
        </View>}
        {this.renderBankList()}
        <View style={{ flex: 0.2, paddingHorizontal: 16 }}>
          {this.renderButton(buttonTitle)}
        </View>
      </View>
    );
  }
}
export default BankAccount;
