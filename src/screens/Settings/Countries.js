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
import ListFooterComponent from "../Home/Templates/ListFooterComponent";

class Countries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      searchProduct: [],
      search_text: "",
      previousSerachProduct: [],
      refreshing: false,
      fetchingStatus: false,
      last_page: 0
    };
    this.current_page = 1;
  }
  componentDidMount() {
    this.getCountries(1, false);
  }
  /******************** Api Call  *****************/
  getCountries = (page, hideLoader) => {
    let { setIndicator } = this.props.screenProps.actions;
    let data = {};
    if (hideLoader) {
      this.setState({ fetchingStatus: true });
    }
    data["search"] = this.state.search_text;
    data["page"] = page;
    postRequest(`user/showcountries`, data, hideLoader)
      .then(res => {
        debugger;
        if (
          res &&
          res.success &&
          res.success.data &&
          res.success.data.length > 0
        ) {
          this.setState({
            countries:
              page > 1
                ? [...this.state.countries, ...res.success.data]
                : res.success.data,
            last_page: res.success.last_page,
            fetchingStatus: false,
            refreshing: false
          });
        } else {
          this.setState({
            countries: [],
            fetchingStatus: false,
            refreshing: false
          });
        }
        setIndicator(false);
      })
      .catch(err => {});
  };
  onChangeSearchProduct = searchText => {
    if(this.searchTimeout){
      clearTimeout(this.searchTimeout);
    }
    this.setState({
      search_text: searchText
    });
    this.searchTimeout= setTimeout(()=>this.getCountries(1,false),600)

    // this.setState(
    //   {
    //     search_text: searchText
    //   },
    //   () => {
    //     this.getCountries(1, false);
    //   }
    // );
  };
  onSelectGetProductDetail = (item) => {
    let {params} = this.props.navigation.state
    if(params && params.updateCountry){
      params.updateCountry(item)
      this.props.navigation.goBack()
    }
  };
  /******************** Api Call End *****************/
  renderItem = (item, index) => {
    return (
      <View style={[styles.listItemWrapper]}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={
            (styles.listItem,
            styles.shadow,
            {
              shadowRadius: 0.01,
              shadowOpacity: 0.04,
              elevation: 1,
              flexDirection: "row",
              backgroundColor: "white",
              paddingVertical: 18
            })
          }
          onPress={() =>
            this.onSelectGetProductDetail(item)
          }
        >
          <View style={styles.placeMeta}>
            <Text p style={[styles.primaryText, { color: "#000000" }]}>
              {item.name}
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
          paddingTop: 4
        }}
      >
        <TextInput
          style={[
            styles.searchProInput,
            {
              flex: 1,
              paddingLeft: 16,
              height: 48,
              justifyContent: "center",
              paddingTop: 0,
            }
          ]}
          placeholder={string("Search Country")}
          placeholderTextColor={"rgba(0,0,0,0.56)"}
          value={this.state.search_text}
          onChangeText={text => this.onChangeSearchProduct(text)}
        />
        {this.state.search_text ? (
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() => {
              this.setState(
                {
                  search_text: ""
                },
                () => this.getCountries(1, false)
              );
              Keyboard.dismiss();
            }}
          >
            <Image source={Images.inputClose} style={{ alignSelf: "center" }} />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };
  keyExtractor = item => item.id;
  ItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#607D8B"
        }}
      />
    );
  };
  renderSerachProduct = () => {
    return (
      <View style={[styles.list, { paddingHorizontal: 32, marginTop: 16 }]}>
        <FlatList
          data={this.state.countries}
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
              <Text p>{string("No Search country found")}</Text>
            </View>
          )}
          itemSeparatorComponent={this.ItemSeparator}
          onScrollEndDrag={() => console.log(" *********end")}
          onScrollBeginDrag={() => console.log(" *******start")}
          initialNumToRender={8}
          maxToRenderPerBatch={2}
          onEndReachedThreshold={0.5}
          onEndReached={({ distanceFromEnd }) => {
            this.current_page = this.current_page + 1;
            if (this.state.last_page >= this.current_page) {
              this.getCountries(this.current_page, true);
            }
          }}
          ListFooterComponent={() => (
            <ListFooterComponent fetchingStatus={this.state.fetchingStatus} />
          )}
        />
      </View>
    );
  };
  renderLabel = title => {
    return (
      <View style={{ paddingHorizontal: 32 }}>
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
          <View style={{ height: 16 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
export default Countries;
