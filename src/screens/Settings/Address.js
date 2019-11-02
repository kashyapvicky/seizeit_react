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
import { postRequest, getRequest } from "../../redux/request/Service";

//local imports
import Button from "../../components/Button";
import Text from "../../components/Text";
import styles from "../../styles";
import Header from "../../components/Header";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images } from "../../utilities/contsants";
import { normalize } from "../../utilities/helpers/normalizeText";
import AddressListItem from "./Templates/AddressListItem";
import RenderLabel from "./Templates/Label";
import { AddressPlaceholder } from "./Templates/AddressPlaceholder";
class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      addresses: []
    };
    // Placeholder Product
    this.loaderComponent = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  componentDidMount() {
    this.getAddresses();
  }
  /*************APi Call  *********/
  getAddresses = () => {
    getRequest("customer/address-listing")
      .then(res => {
        debugger;
        if (res && res.success && res.success.length > 0) {
          let { params } = this.props.navigation.state;
          this.setState(
            {
              addresses: res.success.map(x => {
                return {
                  ...x,
                  title: x.full_address,
                  id: x.address_id,
                  is_active: x.is_active,
                  description: `${x.flat},${x.city},${x.landmark}.${x.state} ${x.country_name} ${x.pincode}  `
                };
              }),
              isRefreshing: false
            },
            () => {
              if (
                params &&
                params.fromCheckout &&
                this.state.addresses.length > 0
              ) {
                debugger;
                if (this.state.addresses.length > 1) {
                  let is_activeAddress = this.state.addresses.filter(
                    x => x.is_active
                  )[0];
                  params.updateDefaultAddress(
                    is_activeAddress.description,
                    is_activeAddress.id
                  );
                } else {
                  let is_activeAddress = this.state.addresses[0];
                  params.updateDefaultAddress(
                    is_activeAddress.description,
                    is_activeAddress.id
                  );
                }

                // this.props.navigation.goBack()
              }
            }
          );
        } else {
          this.setState({
            isRefreshing: false
          });
        }
        setIndicator(false);
      })
      .catch(err => {});
  };
  getAddressDetail = address => {
    debugger;
    this.props.navigation.navigate("AddNewAddress", {
      address: address,
      getAddress: () => this.getAddresses()
    });
  };
  // Update Address
  updateDefaultAddress = item => {
    let { setToastMessage } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    let data = {};
    data["address_id"] = item.id;
    data["is_active"] = item.is_active ? 0 : 1;
    postRequest("customer/updateAddressStatus", data)
      .then(res => {
        if (res && res.success) {
          let { params } = this.props.navigation.state;
          setToastMessage(true, colors.green1);
          toastRef.show(res.success);
          if (params && params.updateDefaultAddress) {
            params.updateDefaultAddress(item.description);
            this.props.navigation.goBack();
          }
          this.setState({
            addresses: this.state.addresses.map(x => {
              if (x.id == item.id) {
                return {
                  ...x,
                  is_active: item.is_active ? 0 : 1
                };
              } else {
                return {
                  ...x,
                  is_active: 0
                };
              }
            })
          });
        }
        setIndicator(false);
      })
      .catch(err => {});
  };
  // Update Address
  deleteAddress = item => {
    let { setToastMessage } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    let { params } = this.props.navigation.state;
    getRequest(`customer/deleteAddress?address_id=${item.id}`)
      .then(res => {
        if (res && res.status == 200) {
          setToastMessage(true, colors.green1);
          toastRef.show(res.response);
          this.setState({
            addresses: this.state.addresses.filter(x => x.id != item.id)
          });
          if ((params && params.address_id) == item.id) {
            params.updateDefaultAddress("", false);
            
          }
        }
        setIndicator(false);
      })
      .catch(err => {});
  };
  /*************APi Call  *********/
  handleRefresh = () => {
    this.setState(
      {
        isRefreshing: true
      },
      () => {
        this.getAddresses();
      }
    );
  };
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
    this.props.navigation.navigate("AddNewAddress", {
      getAddress: () => this.getAddresses()
    });
  };
  renderItems = ({ item, index }) => {
    return (
      <AddressListItem
        item={item}
        index={index}
        onPress={() => this.getAddressDetail(item)}
        descriptionSize={normalize(14)}
        updateDefaultAddress={() => this.updateDefaultAddress(item)}
        deleteAddress={() => this.deleteAddress(item)}
      />
    );
  };
  renderBankList = () => {
    return (
      <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 8 }}>
        <FlatList
          bounces={true}
          refreshing={this.state.isRefreshing}
          onRefresh={this.handleRefresh}
          showsVerticalScrollIndicator={false}
          data={this.state.addresses}
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderItems}
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
          title={"Address"}
          backPress={() => this.props.navigation.goBack()}
        />
        <View style={{ paddingHorizontal: 24, marginBottom: 8, marginTop: 16 }}>
          <RenderLabel label={"Saved Address"} />
        </View>

        {this.renderBankList()}
        <View style={{ flex: 0.2, paddingHorizontal: 16 }}>
          {this.renderButton("ADD NEW")}
        </View>
      </View>
    );
  }
}
export default Address;
