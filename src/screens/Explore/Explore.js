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
import Listitems from "../Home/Templates/ListItem";
import {ProductPlaceholder} from '../Home/Templates/PlaceHolderProduct'

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      cartItems: [],
      name:'',
      tabs: [],
      orders: ["1", "2"]
    };
    this.loaderComponent = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  componentDidMount(){
      this.getProducts()
    
  }
    /*************APi Call  *********/
     getProducts = ()=>{
    let {setIndicator} = this.props.screenProps.actions
    getRequest('user/product-listing').then((res) => {  
      if(res && res.success && res.success.length > 0){
        console.log(res.success,"res.success")
        this.setState({
          prouducts : res.success
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
          data={this.state.prouducts}
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderItems}
          ListEmptyComponent={<ProductPlaceholder  
            array={[1, 2, 3, 4,5,6]}
            loader={this.loaderComponent}
          />}
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
          hideLeftIcon={true}
          title={'Explore'}
          // backPress={() => this.props.navigation.goBack()}
        />
        {this.renderProductsList()}
           
      </View>
    );
  }
}
export default Explore;
