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
import {postRequest,getRequest} from '../../redux/request/Service'
import { FilterButton } from "../Home/Templates/FilterButton";

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
import ListFooterComponent from '../Home/Templates/ListFooterComponent'
import SearchInput from "../../components/SearchInput";

import Listitems from "../Home/Templates/ListItem";
import {ProductPlaceholder} from '../Home/Templates/PlaceHolderProduct'
import {
  updateProductCartValue,
  updateCartSuccess,
  updateWishListSuccess
} from "../../utilities/method";
import LazyHOC from "../../LazyLoadScreen";
class Explore extends Component {
  constructor(props) {
    super(props);
    this.veiwRef={}

    this.state = {
      refreshing: false,
      cartItems: [],
      fetchingStatus:false,
      products:[],
      name:'',
      tabs: [],
      tabPage: 0,
      orders: ["1", "2"],
      price_filter: "",
      usage_filter: "",
      last_page: 0
    };
    this.current_page = 1

    this.loaderComponent = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  componentDidMount(){
      this.getProducts(1,false)
  }
  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.getProducts(1,false);
      }
    );
  };  
  /*************APi Call  *********/
  updateFilter = data => {
    this.setState(
      {
        ...this.state,
        ...data
      },
      () => {
        this.getProducts(1,false);
      }
    );
  };
  getProducts = (page,hideLoader)=>{
    let {setIndicator} = this.props.screenProps.actions
    let data = {};
    if (hideLoader) {
      this.setState({fetchingStatus: true});
    }else{
      setIndicator(true)
    }
      data["search_text"] = this.state.search_text;
      data['page'] = page
      data["usage_filter"] = this.state.usage_filter;
      data["price_filter"] = this.state.price_filter;
      data["page"] = page;
     postRequest(`user/product-listing`, data,hideLoader)
      .then(res => {
        debugger
        if (res && res.success && res.success.data && res.success.data.length > 0) {
          this.setState(
            {
              products: page > 1
              ? [...this.state.products, ...res.success.data]
              : res.success.data,
              last_page:res.success.last_page,
              fetchingStatus: false,
              refreshing: false,
            },
            () => {
              let { carts,wishlists } = this.props.screenProps.product;
              if (carts && carts.length > 0 || wishlists && wishlists.length>0) {
                let products = updateProductCartValue(this.state.products,this.props.screenProps.product);
                this.setState({
                  products,
                  fetchingStatus: false,
                  refreshing: false,
                });
              }
            }
          );
        } else {
          this.setState({
            products: [],
              fetchingStatus: false,
              refreshing: false,
          });
        }
        setIndicator(false);
      })
      .catch(err => {});
      
  }
/*********** APi Call End  *****/
  pressButton = () => {};
  renderButton = (title, transparent) => {
    return (
      <Button
        buttonStyle={{
          height: 32,
          width: 112,
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
    return <Listitems item={item} index={index} imageHeight={168} 
    onPress={()=> this.props.navigation.navigate('ProductDetails',{
          productId: item.id
    })}
    onPressWishlist={() => this.onPressWishlist(item,index)}
    onPressCart={() => this.addRemoveCart(item)}
    onGetRefWishlist={(ref)=> this.veiwRef[index] = ref}
    />;
  };
  /************** Cart Method  **************/
  bounce = (index) => this.veiwRef[index].rubberBand(500).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
 
  onPressWishlist = (item,index) => {
    this.bounce(index)
    let { addWishlitsRequestApi } = this.props.screenProps.productActions;
    let updateArray = updateWishListSuccess(this.state.products, item);
    this.setState({
      products: updateArray
    });
    addWishlitsRequestApi({
      ...item,
      isFevorite: item.isFevorite ? false : true
    });
  };
  addRemoveCart = item => {
    let { addCartRequestApi } = this.props.screenProps.productActions;
    let updateArray = updateCartSuccess(this.state.products, item);
    this.setState({
      products: updateArray
    });
    addCartRequestApi({ ...item, isCart: item.isCart ? false : true });
  };
/************** Cart Method  **************/

ItemSeparator = () => {
  return (
    <View
      style={{
        height: 0.5,
        width: '100%',
        backgroundColor: '#607D8B',
      }}
    />
  );
};
  renderProductsList = () => {
    return (
      <View
        style={{ flex: 1, paddingHorizontal: 16, marginTop: 8 }}
      >
        <View style={{ height: 6 }} />
        <FlatList
          bounces={true}
          // extraData={this.state}
          // pagingEnabled={true}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={this.state.products}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderItems}
          ListEmptyComponent={<ProductPlaceholder  
            array={[1, 2, 3, 4,5,6]}
            message={this.props.screenProps.loader ? '' :'No products found'}
            loader={this.loaderComponent}
          />}
          itemSeparatorComponent={this.ItemSeparator}
          onScrollEndDrag={() => console.log(' *********end')}
          onScrollBeginDrag={() => console.log(' *******start')}
          initialNumToRender={8}
          maxToRenderPerBatch={2}
          onEndReachedThreshold={0.5}
          onEndReached={({distanceFromEnd}) => {
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
  renderSearchInput = style => {
    return (
      <SearchInput
        editable={false}
        //backgroundColor={'white'}
        style={style && style}
        pointerEvents="none"
        onPress={() => this.props.navigation.navigate("SearchProduct")}
        placeHolder={"What are you looking for?"}
      />
    );
  };
  render() {
    return (
      <LazyHOC>
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
          title={'Explore'}
          //backPress={() => this.props.navigation.goBack()}
        />
        {/* {this.renderSearchInput()} */}
       
        {this.renderProductsList()}
        <FilterButton
          filters={this.props.screenProps.product}
          onPress={() =>
            this.props.navigation.navigate("ExploreFilter", {
              updateFilter: data => this.updateFilter(data)
            })
          }
        />
      </View>
      </LazyHOC>
    );
  }
}
export default Explore;
