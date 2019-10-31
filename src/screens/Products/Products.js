import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Keyboard,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Alert
} from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import { postRequest, getRequest } from "../../redux/request/Service";

//local imports
import Button from "../../components/Button";
import Text from "../../components/Text";
import styles from "../../styles";
import Header from "../../components/Header";
import SearchInput from "../../components/SearchInput";
import { AddButton } from "./Templates/AddButton";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images } from "../../utilities/contsants";
import { normalize } from "../../utilities/helpers/normalizeText";
import { ListEmptyComponent } from "../../components/ListEmptyComponent";
import UpdateDeleteModal from "./Templates/UpdateDeleteModal";
import ListFooterComponent from "../Home/Templates/ListFooterComponent";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      products: [],
      selectedStatus: "",
      refreshing: false,
      selectedIndex: -1,
      isRefreshing: false,
      search_text: "",
      isModalVisible: false,
      fetchingStatus: false,
      selectedProduct: null
    };
    this.current_page = 1;
  }
  componentDidMount() {
    this.getProducts(1, false);
  }
  /****************** Api Call ************/
  getProducts = (page, hideLoader) => {
    let { setIndicator } = this.props.screenProps.actions;
    let data = {};
    if (hideLoader) {
      this.setState({ fetchingStatus: true });
    }
    data["search_text"] = this.state.search_text;
    data["page"] = page;
    postRequest(`vendor/product-listing`, data, hideLoader)
      .then(res => {
        debugger;
        if (
          res &&
          res.success &&
          res.success.data &&
          res.success.data.length > 0
        ) {
          this.setState({
            products:
              page > 1
                ? [...this.state.products, ...res.success.data]
                : res.success.data,
            last_page: res.success.last_page,
            fetchingStatus: false,
            refreshing: false
          });
        } else {
          this.setState({
            products: [],
            fetchingStatus: false,
            refreshing: false
          });
        }
        setIndicator(false);
      })
      .catch(err => {});
  };
  deleteProduct = () => {
    this.closeModal();
    let { selectedProduct } = this.state;
    let { toastRef } = this.props.screenProps;
    let { setToastMessage } = this.props.screenProps.actions;
    let { setIndicator } = this.props.screenProps.actions;
    getRequest(`vendor/deleteProducts?product_id=${selectedProduct.id}`)
      .then(res => {
        debugger;
        if (res.success) {
          let newFilterProduct = this.state.products.filter(
            x => x.id != selectedProduct.id
          );
          this.setState({
            products: newFilterProduct
          });
          setToastMessage(true, colors.danger);
          toastRef.show(res.success);
        }
        debugger;
        setIndicator(false);
      })
      .catch(err => {});
  };

  // Update Product Status
  updateroductStaus = (statusI, parentItem) => {
    let statusPro = parentItem.sold_out == 1 ? "ACTIVE" : "SOLD OUT";
    if (statusPro == statusI) {
      let { toastRef } = this.props.screenProps;
      let { setToastMessage } = this.props.screenProps.actions;
      let data = {};
      data["product_id"] = parentItem.id;
      data["sold_out"] = parentItem.sold_out == 1 ? 0 : 1;
      postRequest(`vendor/updateProductstatus`, data)
        .then(res => {
          debugger;
          if (res.success) {
            this.onSelectStatus(statusI, parentItem);
            setToastMessage(true, colors.green1);
            toastRef.show(res.success);
          }
        })
        .catch(err => {});
    } else {
      this.setState({
        selectedIndex: -1
      });
    }
  };
  /****************Api Call   **************/
  renderButton = (title, transparent) => {
    return (
      <Button
        buttonStyle={{
          height: 48,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          backgroundColor: transparent ? "transparent" : colors.primary
        }}
        fontSize={18}
        color={transparent ? colors.primary : "#FFFFFF"}
        onPress={() => this.pressButton(title)}
        title={title.toUpperCase()}
      />
    );
  };

  //Status Dropdown
  openStatusDropDown = index => {
    this.setState({
      selectedIndex: index == this.state.selectedIndex ? -1 : index
    });
  };
  onSelectStatus = (statusI, parentItem) => {
    this.setState({
      products: this.state.products.map(res => {
        if (parentItem.id == res.id) {
          return { ...res, sold_out: statusI == "ACTIVE" ? 0 : 1 };
        } else {
          return { ...res };
        }
      }),
      selectedIndex: -1
    });
  };

  warningMessage = () => {
    this.closeModal();
    setTimeout(() => {
      Alert.alert(
        "",
        string("areyousureremove"),
        [
          { text: string("cancel"), onPress: () => null },
          {
            text: string("OK"),
            onPress: () => {
              this.deleteProduct();
            }
            // style:'cancel'
          }
        ],
        { cancelable: false }
      );
    }, 200);
  };
  updateProduct = () => {
    let { selectedProduct } = this.state;
    this.props.navigation.navigate("AddNewProduct", {
      selectedProduct: selectedProduct,
      getProducts: () => this.getProducts(1, false)
    });
    this.closeModal();
  };
  onChangeTextInput = text => {
    if(this.searchTimeout){
      clearTimeout(this.searchTimeout);
    }
    this.setState({
      search_text: text
    });
   this.searchTimeout= setTimeout(()=>this.getProducts(1,false),600)
    // this.setState(
    //   {
    //     search_text: text
    //   },
    //   () => {
    //     this.getProducts(1, false);
    //   }
    //);
  };
  // Render drop dowm list
  renderDropDownListItem = parentItem => {
    return (
      <ScrollView
        style={[
          styles.shadow,
          {
            flex: 0.1,
            backgroundColor: "white",
            paddingHorizontal: 16,
            borderWidth: 0.5,
            borderColor: "#96C50F",
            zIndex: 100,
            shadowOpacity: 0.1,
            shadowRadius: 6,
            height: 100,
            marginBottom: 10,
            marginTop: 5
          }
        ]}
      >
        {["ACTIVE", "SOLD OUT"].map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => this.updateroductStaus(item, parentItem)}
            >
              <View
                //  duration={'300'}
                style={[
                  {
                    paddingVertical: 8
                  }
                ]}
              >
                <Text p style={{ fontSize: normalize(14), color: "#96C50F" }}>
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };
  // Open Edit Modal
  closeModal = () => {
    this.setState({
      isModalVisible: false
    });
  };
  renderBottomModal = () => {
    return (
      <UpdateDeleteModal
        deleteProduct={() => this.warningMessage()}
        updateProduct={() => this.updateProduct()}
        closeModal={() => this.closeModal()}
        isModalVisible={this.state.isModalVisible}
      />
    );
  };
  //Render Item
  renderItems = ({ item, index }) => {
    console.log(item, "teee");
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("ProductDetails", {
            productId: item.id
          })
        }
        activeOpacity={9}
        index={index}
        style={[
          styles.shadow,
          {
            backgroundColor: "white",
            paddingVertical: 8,
            marginTop: 8,
            shadowRadius: 0.1,
            elevation: 0.5
          }
        ]}
      >
        <View style={{ flexDirection: "row", paddingBottom: 6 }}>
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
              style={{ height: 96, width: 96, borderRadius: 4 }}
              source={{
                uri:
                  item.pics && item.pics.length > 0
                    ? item.pics[0].pic
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_CxVo-e0CajwrW3CZsXsasW9zRIi1TieY7KbDSdHTYIaz8kkg"
              }}
            />
          </View>
          <View style={{ flex: 0.7, paddingLeft: 8 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                p
                style={{
                  color: "#233138",
                  letterSpacing: 0.5,
                  fontSize: normalize(12),
                  fontWeight: "600"
                }}
              >
                {item.category ? item.category.name : ""}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    isModalVisible: true,
                    selectedProduct: item
                  })
                }
              >
                <Ionicons name={"dots-vertical"} size={28} color={"#D8D8D8"} />
              </TouchableOpacity>
            </View>
            <View>
              <Text p style={{ color: "#000000" }}>
                {item.product_title}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 6
              }}
            >
              <Text h5 style={{ color: "#000000", fontSize: normalize(18) }}>
                {`$${item.price}`}
              </Text>
              <TouchableOpacity
                onPress={() => this.openStatusDropDown(index)}
                // onPress={() => null}
                style={{
                  // flex: 0.5,
                  borderWidth: 1,
                  width: "auto",
                  paddingLeft: 16,
                  paddingRight: 8,
                  alignItems: "center",
                  paddingVertical: 0,
                  // justifyContent:'center',
                  flexDirection: "row",
                  borderColor: item.sold_out == 1 ? "#E06D7B" : "#96C50F",
                  borderRadius: 4
                }}
              >
                <Text
                  h5
                  textAlign
                  style={{
                    color: item.sold_out == 1 ? "#E06D7B" : "#96C50F",
                    fontSize: normalize(11)
                  }}
                >
                  {item.sold_out == 1 ? "SOLD OUT" : "ACTIVE"}
                  {"  "}
                  {item.sold_out == 1 ? (
                    <Icons
                      name={"ios-arrow-down"}
                      color={"#E06D7B"}
                      size={14}
                    />
                  ) : (
                    <Icons
                      name={"ios-arrow-down"}
                      color={"#96C50F"}
                      size={14}
                    />
                  )}
                </Text>
              </TouchableOpacity>
            </View>
            {index == this.state.selectedIndex ? (
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 0.9 }} />
                {this.renderDropDownListItem(item)}
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.getProducts();
      }
    );
  };
  renderProductsList = () => {
    return (
      <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 8 }}>
        <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
          {this.state.products.length > 0 ? (
            <Text p={styles.totalProduct}>
              {`${this.state.products.length}`} Products in total
            </Text>
          ) : null}
        </View>
        <FlatList
          bounces={true}
          // extraData={this.state}
          // pagingEnabled={true}
          showsVerticalScrollIndicator={false}
          data={this.state.products}
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderItems}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          // onEndReached={this.handleLoadMore}
          // onEndReachedThreshold={0.9}
          // ListFooterComponent={this.renderFooter}
          ListEmptyComponent={() =>
            !this.props.screenProps.loader ? <ListEmptyComponent /> : null
          }
          itemSeparatorComponent={this.ItemSeparator}
          onScrollEndDrag={() => console.log(" *********end")}
          onScrollBeginDrag={() => console.log(" *******start")}
          initialNumToRender={8}
          maxToRenderPerBatch={2}
          onEndReachedThreshold={0.5}
          onEndReached={({ distanceFromEnd }) => {
            this.current_page = this.current_page + 1;
            if (this.state.last_page >= this.current_page) {
              this.getProducts(this.current_page, true);
            }
          }}
          ListFooterComponent={() => (
            <ListFooterComponent fetchingStatus={this.state.fetchingStatus} />
          )}
        />
      </View>
    );
  };
  renderSearchInput = () => {
    return (
      <SearchInput
        placeHolder={"Search your products here"}
        onChangeText={text => {
          this.onChangeTextInput(text);
        }}
        value={this.state.search_text}
        closeSearch={() =>{
           this.onChangeTextInput("")
           Keyboard.dismiss()
        }
          }
        searchText={this.state.search_text}
      />
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          isRightIcon={false}
          hideLeftIcon={true}
          title={"Products"}
          backPress={() => this.props.navigation.dismiss()}
        />
        <View
          style={[
            styles.shadow,
            {
              backgroundColor: "#FFFFFF",
              flex: 0.1,
              shadowRadius: 0.1,
              paddingBottom: 16,
              elevation: 0.25
            }
          ]}
        >
          {this.renderSearchInput()}
        </View>

        {this.renderProductsList()}
        <AddButton
          onPress={() => this.props.navigation.navigate("AddNewProduct")}
        />
        {this.state.isModalVisible ? this.renderBottomModal() : null}
      </View>
    );
  }
}
export default Products;
