import React, { Component } from "react";
import {
  View,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Keyboard,
  I18nManager,
  TextInput
} from "react-native";
import DeviceInfo from "react-native-device-info";

import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
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
import SearchInput from "../../components/SearchInput";

class SearchProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      searchProduct: [],
      searchText: "",
      previousSerachProduct: []
    };
  }
  componentDidMount() {
    this.getPreviousSearch();
  }
  /******************** Api Call  *****************/
  getPreviousSearch = () => {
    let device_id = DeviceInfo.getUniqueID();
    getRequest(`user/searchShow?device_id=${device_id}`)
      .then(res => {
        debugger;
        if (res && res.success && res.success.length > 0) {
          this.setState({
            previousSerachProduct: res.success
          });
        } else {
          this.setState({
            previousSerachProduct: []
          });
        }
      })
      .catch(err => {});
  };
  searchApi = () => {
    const { searchText } = this.state;
    if (searchText) {
      let { setIndicator } = this.props.screenProps.actions;
      getRequest(`user/search?search=${searchText}`)
        .then(res => {
          if (res && res.success && res.success.length > 0) {
            this.setState({
              searchProduct: res.success,
              searchText: searchText
            });
          } else {
            this.setState({
              searchProduct: []
            });
          }
          setIndicator(false);
        })
        .catch(err => {});
    }
  };
  onChangeSearchProduct = searchText => {
    if(this.searchTimeout){
      clearTimeout(this.searchTimeout);
    }
    this.setState({
      searchText: searchText
    });
   this.searchTimeout= setTimeout(this.searchApi,600)
  };
  saveSearchProduct = product => {
    debugger;
    let { setIndicator } = this.props.screenProps.actions;
    let data = {};
    data["searchsave"] = product.product_title;
    data["product_id"] = product.product_id;
    data["device_id"] = DeviceInfo.getUniqueID();
    postRequest(`user/searchStore`, data)
      .then(res => {
        if (res && res.success == "Saved") {
          this.props.navigation.navigate("ProductDetails", {
            productId: product.product_id
          });
        }
        setIndicator(false);
      })
      .catch(err => {});
  };
  onSelectGetProductDetail = (product, fromPreviousSearch) => {
    debugger
    if (fromPreviousSearch) {
      this.props.navigation.navigate("ProductDetails", {
        productId: product.product_id
      });
    } else {
      this.saveSearchProduct(product);
    }
  };
  /******************** Api Call End *****************/
  renderItem = (item, index, fromPreviousSearch) => {
    return (
      <View style={[styles.listItemWrapper]}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={
            (styles.listItem,
            styles.shadow,
            {
              shadowRadius: 0.01,
              shadowOpacity: 0.04,
              elevation: 2,
              flexDirection: "row",
              backgroundColor: "white",
              paddingVertical: 18
            })
          }
          onPress={() =>
            this.onSelectGetProductDetail(item, fromPreviousSearch)
          }
        >
          <View style={styles.placeMeta}>
            <Text p style={[styles.primaryText, { color: "#000000" }]}>
              {item.product_title || item.search_title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderSearchInput = () => {
    return (
      <View
        behavior={"height"}
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          style={[
            styles.searchProInput,
            {
              flex: 1,
              paddingLeft: 16,
              textAlign:I18nManager.isRTL?"right":'left',
              height: 48,
              justifyContent: "center",
              paddingTop: 4
            }
          ]}
          placeholder={string("Search product")}
          placeholderTextColor={"rgba(0,0,0,0.56)"}
          value={this.state.searchText}
          onChangeText={text => this.onChangeSearchProduct(text)}
        />
        {this.state.searchText ? (
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() => {
              this.setState({
                searchText: "",
                searchProduct: []
              });
              Keyboard.dismiss();
            }}
          >
            <Image source={Images.inputClose} style={{ alignSelf: "center" }} />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };
  keyExtractor = item => item.product_id;
  renderSerachProduct = () => {
    return (
      <View style={[styles.list, { paddingHorizontal: 32, marginTop: 16 }]}>
        <FlatList
          data={this.state.searchProduct}
          renderItem={({ item, index }) => this.renderItem(item, index, false)}
          keyExtractor={this.keyExtractor}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View
              style={{
                alignSelf: "center",
                flex: 1,
                justifyContent: "center",
                height: 100
              }}
            >
          <Text p>{string("No Search result found")}</Text>
            </View>
          )}
          // contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
    );
  };
  renderPreviousSerachProduct = () => {
    return (
      <View style={[styles.list, { paddingHorizontal: 32 }]}>
        <FlatList
          data={this.state.previousSerachProduct}
          renderItem={({ item, index }) => this.renderItem(item, index, true)}
          keyExtractor={this.keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={() => (
            <View
              style={{
                alignSelf: "center",
                flex: 1,
                justifyContent: "center",
                height: 100
              }}
            >
          <Text p>{string("No Previous result found")}</Text>
            </View>
          )}
        />
      </View>
    );
  };
  renderLabel = title => {
    return (
      <View style={{ paddingHorizontal: 32,alignItems:'flex-start'  }}>
        <Text h4 style={[styles.labelHeading, { color: "rgba(0,0,0,0.56)" }]}>
          {title}
        </Text>
      </View>
    );
  };
  render() {
    return (
      <KeyboardAvoidingView
        enabled={false}
        behavior={"height"}
        style={{ flex: 1 }}
      >
        <Header
          //   isRightIcon={Images.close_g}
          headerStyle={[
            styles.shadow,
            {
              backgroundColor: "#FFFFFF",
              shadowRadius: 0.1
            }
          ]}
          hideLeftIcon={false}
          backPress={() => this.props.navigation.goBack()}
        >
          {this.renderSearchInput()}
        </Header>
        <ScrollView
          keyboardShouldPersistTaps={"handled"}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {this.renderSerachProduct()}
          <View style={{ height: 16,}} />
          {this.renderLabel(string("Previous Searches"))}
          <View style={{ height: 16 }} />
          {this.renderPreviousSerachProduct()}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
export default SearchProduct;
