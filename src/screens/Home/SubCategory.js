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
import Listitems from "./Templates/ListItem";
import {FilterButton} from "./Templates/FilterButton";
import {ProductPlaceholder} from './Templates/PlaceHolderProduct'

class SubCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      cartItems: [],
      name:'',
      catId:'',
      tabs: [],
      products:[],
      orders: ["1", "2"]
    };
    this.loaderComponent = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  componentDidMount(){
    let {params} = this.props.navigation.state
    if(params && params.category){
      let {category} = params
      this.setState({
        name : category.name,
        catId:category.id
      },()=>{
      })
      this.getSubCategories(category.id)

    }
  }
    /*************APi Call  *********/
     getSubCategories = (category_id)=>{
    let {setIndicator} = this.props.screenProps.actions
    let data ={}
    data['category_id'] = category_id
     postRequest('user/getsubcategory',data).then((res) => {  
      if(res && res.success && res.success.length > 0){
        this.setState({
          tabs : res.success
        },()=>{
          let prependedValue = [{ created_at: 1557140964, description: null, icon: false, id: -1, slug: "allproduct", status: 1, name: "All", updated_at: 1557140964 }]
          this.setState({ tabs: [...prependedValue, ...this.state.tabs] })
          this.onSelectCategoryGetProduct(-1)

        })
      }   
      setIndicator(false)
    }).catch((err) => {
    })
  }
  onSelectCategoryGetProduct = (catId) =>{
    let {setIndicator} = this.props.screenProps.actions
    let data ={}
     let apiName
     if(catId == -1){
       data['category_id'] = this.state.catId
       apiName = `user/productList_category`
     }else{
      data['category_id'] = this.state.catId
      data['subcategory_id'] = catId
      apiName = `user/productList_subcategory`
     }
     postRequest(apiName,data).then((res) => { 
       debugger
      if(res && res.success && res.success.length > 0){
        this.setState({
          products : res.success
        },()=>{
        })
      }   
      setIndicator(false)
    }).catch((err) => {
    })
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
      productId:item.product_id
    })}

    />;
  };
  renderProductsList = (item, index) => {
    return (
      <View
        skey={index}
        tabLabel={item.name}
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
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderItems}
          ListEmptyComponent={<ProductPlaceholder  
            array={[1, 2, 3, 4,5,6]}
            loader={this.loaderComponent}
          />}
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
  setStateForTabChange = (event)=>{
    debugger
    if(event){
      let catId= this.state.tabs[event.i].id
      debugger
      this.onSelectCategoryGetProduct(catId)
    }
    console.log(event,"event")
  }
  renderScrollableTab = () => {
    return (
      <ScrollableTabView
        tabs={this.state.tabs}
        onChangeTab={(event) => { this.setStateForTabChange(event) }}
        renderListTabs={(item, index) => this.renderProductsList(item, index)}
      />
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          isRightIcon={false}
            // headerStyle={[
            //   styles.shadow,
            //   {
            //     backgroundColor: "#FFFFFF",
            //     shadowRadius: 0.1
            //   }
            // ]}
          //   hideLeftIcon={true}
          title={this.state.name}
          backPress={() => this.props.navigation.goBack()}
        />
        {this.renderScrollableTab()}
            <FilterButton 
            onPress={()=>this.props.navigation.navigate('Filter')}
            />
      </View>
    );
  }
}
export default SubCategory;
