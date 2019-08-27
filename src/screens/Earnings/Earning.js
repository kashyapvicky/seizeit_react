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
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/Ionicons";

//local imports
import Button from "../../components/Button";
import Text from "../../components/Text";
import styles from "../../styles";
import Header from "../../components/Header";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images } from "../../utilities/contsants";
import { normalize } from "../../utilities/helpers/normalizeText";
import ScrollableTabView from "../../components/ScrollableTab";

class Earnings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      cartItems: [],
      tabs: [
        {
          title: "All Transactions"
        },
        {
          title: "Received"
        },
        {
          title: "Deducted"
        }
      ]
    };
  }
  pressButton = ()=>{
    return null
  }
  renderButton = (title, transparent) => {
    return (
      <Button
        buttonStyle={{
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          backgroundColor: transparent ? "transparent" : colors.primary
        }}
        fontSize={14}
        color={transparent ? colors.primary : "#FFFFFF"}
        onPress={() => this.pressButton(title)}
        title={title}
      />
    );
  };
  renderItems = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={9}
        index={index}
        style={[
          styles.shadow,
          {
            backgroundColor: "white",
            paddingVertical: 8,
            marginTop: 8,
            // borderBottomWidth:1,
            paddingHorizontal: 16,
            shadowRadius: 0.1
          }
        ]}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 0.7, paddingLeft: 8 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                p
                style={{
                  color: "#233138",
                  letterSpacing: 0.5,
                  fontSize: normalize(13)
                  // fontWeight: "600"
                }}
              >
                Received
              </Text>
            </View>
            <View>
              <Text p style={{ color: "#000000", fontSize: normalize(16) }}>
                Transaction Id:MI743274
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 6
              }}
            >
              <Text
                p
                style={{ color: "rgba(0,0,0,0.5)", fontSize: normalize(13) }}
              >
                Tue · Aug 21 2018
              </Text>
              <View
                style={{
                  flex: 0.5,
                  alignItems: "center"
                  // justifyContent:'center',
                  // flexDirection:'row',
                }}
              />
            </View>
          </View>
          <View style={{ flex: 0.3, paddingRight: 8, alignItems: "flex-end" }}>
            <Text p style={{ color: "#96C50F", fontSize: normalize(18) }}>
              {`+$500 `}
            </Text>
            <Ionicons name={"chevron-right"} size={28} color={"#96C50F"} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  renderProductsList = (item, index) => {
    return (
      <View skey={index} tabLabel={item.title} style={{  }}>
        <View
          style={[
            styles.shadow,
            {
              shadowRadius: 0.1,
              paddingHorizontal: 16,
              paddingTop: 12,
              paddingBottom: 16,
              backgroundColor: "#FFFFFF"
            }
          ]}
        >
          <Text
            p
            style={[
              styles.totalProduct,
              { color: "#000000", fontSize: normalize(18) }
            ]}
          >
            Last 30 Days
          </Text>
        </View>
        <FlatList
          bounces={true}
          // extraData={this.state}
          // pagingEnabled={true}
          showsVerticalScrollIndicator={false}
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderItems}
          // refreshing={this.state.isRefreshing}
          // onRefresh={this.handleRefresh}
          // onEndReached={this.handleLoadMore}
          // onEndReachedThreshold={0.9}
          // ListFooterComponent={this.renderFooter}
          // ListEmptyComponent={
          //     (this.state.allProductsListForItem.length == 0) ?
          //         ListEmpty2({ state: this.state.visible, margin: screenDimensions.height / 3 - 20, message: string('noproductfound') })

          //         :
          //         null
          // }
        />

      </View>
    );
  };
  renderSearchInput = () => {
    return (
      <View style={[styles.searchhView]}>
        <View style={{ flex: 0.1, alignSelf: "center", paddingLeft: 16 }}>
          <Icons name={"ios-search"} size={22} color={"#96C50F"} />
        </View>
        <View style={{ flex: 0.9 }}>
          <TextInput
            style={{
              height: 40,
              fontSize: normalize(14),
              textAlign: "left",
              // fontWeight: "500",
              color: "#96C50F"
              // fontFamily: fonts.sourcesanspro
              // lineHeight:16
              // borderBottomWidth: 1, borderBottomColor: isFocused ? '#75B152' : 'rgba(0,0,0,0.11)'
            }}
            placeholder={"Search your products here"}
            placeholderTextColor={"#96C50F"}
            // secureTextEntry={this.props.secureTextEntry?this.props.secureTextEntry:false}
          />
        </View>
      </View>
    );
  };
  renderTopSection = () => {
    return (
      <View style={[styles.totalProfitOverSales, { marginTop: 16 }]}>
        <View>
          <Text style={[styles.totalProfitOverSale, { marginBottom: 5 }]}>
            {"Available Income"}
          </Text>
          <Text
            style={[styles.profitAndSale, { fontSize: 26 }]}
            numberOfLines={1}
          >
            ${`4,500`}
          </Text>
        </View>
        <View style={{ flex: 0.7, alignSelf: "center" }}>
          {this.renderButton("Request Transfer")}
        </View>
      </View>
    );
  };
  renderScrollableTab = () => {
    return (
      <ScrollableTabView
        tabs={this.state.tabs}
        renderListTabs={(item, index) => this.renderProductsList(item, index)}
      />
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
          hideLeftIcon={true}
          title={"Earnings"}
          backPress={() => this.props.navigation.dismiss()}
        />
        {this.renderTopSection()}
        <View style={{ height: 16 }} />
        {this.renderScrollableTab()}

        {/* {this.renderProductsList()} */}
      </View>
    );
  }
}
export default Earnings;
