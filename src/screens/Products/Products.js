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
import * as Animatable from "react-native-animatable";
import {postRequest,getRequest} from '../../redux/request/Service'

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
import {ListEmptyComponent} from '../../components/ListEmptyComponent'
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      products: [],
      selectedStatus:'',
      selectedIndex:-1
    };
  }
  componentDidMount(){
    this.getProducts()
  }
  /****************** Api Call ************/
  getProducts = ()=>{
    let {setIndicator} = this.props.screenProps.actions
    getRequest('vendor/product-listing').then((res) => {  
      debugger
      if(res && res.success && res.success.length > 0){
        this.setState({
          products : res.success
        })
      }   
      setIndicator(false)
    }).catch((err) => {
    })
  }


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
  openStatusDropDown = (index) =>{
    this.setState({
      selectedIndex:index == this.state.selectedIndex ? -1 :index,
      
    })
  }
  onSelectStatus = (statusI,parentItem) =>{
    this.setState({
      products : this.state.products.map((res) =>{
            if(parentItem.id == res.id){
                return {...res,available :statusI == 'ACTIVE' ? 1 :0}
            }else{
              return {...res}
            }
      }),
      selectedIndex:-1

    })
  }
  // Render drop dowm list
  renderDropDownListItem = (parentItem) =>{
    return (
      <ScrollView
        style={[
          styles.shadow,
          {
            flex:0.1,
            backgroundColor: "white",
            paddingHorizontal: 16,
            borderWidth: 0.5,
            borderColor: "#96C50F",
            zIndex: 100,
            shadowOpacity: 0.1,
            shadowRadius: 6,
            height: 100,
            marginBottom: 10,
            marginTop:5
          }
        ]}
      >
        {[
          "ACTIVE",
          "SOLD OUT",
        ].map((item, index) => {
          return (
            <TouchableOpacity onPress={() =>  this.onSelectStatus(item,parentItem)}>
            <Animatable.View
              animation="slideInDown"
              //  duration={'300'} 
               direction={'normal'}
              style={[
                {
                  paddingVertical: 8
                }
              ]}
            >
              <Text
                p
                style={{ fontSize: normalize(14), color: "#96C50F", }}
              >
                {item}
              </Text>
            </Animatable.View>
            </TouchableOpacity>
          );
        })
        }
        </ScrollView>
    )
  }

  //Render Item
  renderItems = ({ item, index }) => {
    return (
      <TouchableOpacity
      onPress={() => this.props.navigation.navigate('ProductDetails')}
        activeOpacity={9}
        index={index}
        style={[
          styles.shadow,
          {
            backgroundColor: "white",
            paddingVertical: 8,
            marginTop: 8,
            shadowRadius: 0.1,
            elevation:0.5,
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
                  "https://lsco.scene7.com/is/image/lsco/Levis/clothing/373910227-front-pdp.jpg?$grid_desktop_full$"
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
                CLOTHING
              </Text>
              <Ionicons name={"dots-vertical"} size={28} color={"#D8D8D8"} />
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
                  borderColor:  item.available == 1? '#96C50F': "#E06D7B",
                  borderRadius: 4
                }}
              >
                <Text
                  h5
                  textAlign
                  style={{ color: item.available == 1? '#96C50F': "#E06D7B", fontSize: normalize(11) }}
                >
                  {item.available == 1? 'ACTIVE':'SOLD OUT'} 
                  
                <Image source={Images.drop} />
                </Text>
              </TouchableOpacity>
            </View>
            {
              index == this.state.selectedIndex ?
              <View style={{flexDirection:'row'}}>
              <View style={{flex:0.9}} />
              {this.renderDropDownListItem(item)}
  
              </View> : null
            }
           
           

          </View>
        </View>
      </TouchableOpacity>
    );
  };
  renderProductsList = () => {
    return (
      <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 8 }}>
        <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        {this.state.products.length > 0 ?
          <Text p={styles.totalProduct}>{`${this.state.products.length}`} Products in total</Text>:null}
        </View>
        <FlatList
          bounces={true}
          // extraData={this.state}
          // pagingEnabled={true}
          showsVerticalScrollIndicator={false}
          data={this.state.products}
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderItems}
          // refreshing={this.state.isRefreshing}
          // onRefresh={this.handleRefresh}
          // onEndReached={this.handleLoadMore}
          // onEndReachedThreshold={0.9}
          // ListFooterComponent={this.renderFooter}
          ListEmptyComponent={() => !this.props.screenProps.loader ? <ListEmptyComponent /> : null
          }
        />
      </View>
    );
  };
  renderSearchInput = () => {
    return <SearchInput placeHolder={"Search your products here"} />;
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
              elevation:0.25
            }
          ]}
        >
          {this.renderSearchInput()}
        </View>

        {this.renderProductsList()}
        <AddButton
          onPress={() => this.props.navigation.navigate("AddNewProduct")}
        />
      </View>
    );
  }
}
export default Products;
