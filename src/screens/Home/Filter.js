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
import { FilterItemsCheckBox, FilterItemsRadio } from "./Templates/FilterItem";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      prices: [
        {
          title: "Low to High",
          check: false,
          value:'ASC'
        },
        {
          title: "High to Low",
          check: false,
          value:'DESC'
        }
      ],
      productBrands: [
        {
          title: "Nike",
          check: false
        },
        {
          title: "Adidas",
          check: false
        },
        {
          title: "Mufti",
          check: true
        },
        {
          title: "Puma",
          check: true
        },
        {
          title: "Zara",
          check: false
        }
      ],
      frequencyOfUsage: [
        {
          title: "Once",
          check: false,
          value:1
        },
        {
          title: "Two",
          check: false,
          value:2
        },
        {
          title: "Three",
          check: false,
          value:3
        },
        {
          title: "Four",
          check: false,
          value:4
        },
        {
          title: "Five",
          check: false,
          value:5
        }
      ]
    };
  }
  componentDidMount(){
    let {filters} = this.props.screenProps.product
    let {frequencyOfUsage,prices} = this.state
      this.setState({
        frequencyOfUsage:filters.usage_filter ? this.updateState(filters.usage_filter,frequencyOfUsage):frequencyOfUsage,
        prices:filters.price_filter ? this.updateState(filters.price_filter,prices):prices
      })
  }
  updateState = (value,array) =>{
    return array.map(x => {
        if(x.value == value){
          return {...x,check:true}
        }else{ return {...x,check:false}}
    })
  } 
  pressButton = () => {
    let findPrices = this.state.prices.filter(x=>x.check == true)
    let findfrequencyOfUsage = this.state.frequencyOfUsage.filter(x=>x.check == true)
    let {params} = this.props.navigation.state
    let {addFilterSuccess} = this.props.screenProps.productActions
    debugger
    if(params && params.updateFilter){
      let data = {}
      data['price_filter']=findPrices.length > 0 ? findPrices[0].value : ''
      data['usage_filter']=findfrequencyOfUsage.length > 0 ? findfrequencyOfUsage[0].value : ''
      params.updateFilter(data)
      addFilterSuccess(data)
      this.props.navigation.pop()
    }
  };
  seletctSortByPrice = (item)=>{
    this.setState({
      prices : this.state.prices.map(x=>{
        if(x.value == item.value){
          return {
            ...x,
            check:true
          }
        }else{
          return {
            ...x,
            check:false

          }
        }
      })
    })
  }
  seletctFrequecnyOfUse = (item)=>{
    this.setState({
      frequencyOfUsage : this.state.frequencyOfUsage.map(x=>{
        if(x.value == item.value){
          return {
            ...x,
            check:true
          }
        }else{
          return {
            ...x,
            check:false

          }
        }
      })
    })
  }
  resetFilter = () =>{
    this.setState({
      frequencyOfUsage : this.state.frequencyOfUsage.map(x=>({...x,check:false})),
      prices : this.state.prices.map(x=>({...x,check:false}))
    })
  }
  renderButton = (title, transparent) => {
    return (
      <Button
        buttonStyle={{
          height: 40,
          width:200,
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
  renderBrands = () => {
    return this.state.productBrands.length ? (
      <View style={{ paddingVertical: 0 }}>
        <View>
          <Text h5 style={styles.shortByPrice}>
            {string("brand")}
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          {this.state.productBrands.map((item, index) => {
            return <FilterItemsCheckBox item={item} index={index} />;
          })}
        </View>
      </View>
    ) : null;
  };
  renderPrice = () => {
    return this.state.prices.length ? (
      <View style={{ paddingVertical: 0 }}>
        <View>
          <Text h5 style={styles.shortByPrice}>
            {"Sort by Price"}
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          {this.state.prices.map((item, index) => {
            return <FilterItemsRadio item={item} index={index} 
            onSelect={() => this.seletctSortByPrice(item)}
            />;
          })}
        </View>
      </View>
    ) : null;
  };
  renderFrequencyOfUsage = () => {
    return this.state.frequencyOfUsage.length ? (
      <View style={{ paddingVertical: 0 }}>
        <View>
          <Text h5 style={styles.shortByPrice}>
            {"Frequency of Usage"}
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          {this.state.frequencyOfUsage.map((item, index) => {
            return <FilterItemsCheckBox item={item} index={index} 
            onSelect={()=> this.seletctFrequecnyOfUse(item)}
            />;
          })}
        </View>
      </View>
    ) : null;
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          isRightIcon={false}
          isRightText={"RESET"}
          headerStyle={[
            styles.shadow,
            {
              backgroundColor: "#FFFFFF",
              shadowRadius: 0.1
            }
          ]}
          hideLeftIcon={false}
          title={"Filter"}
          onRightPress={() => this.resetFilter()}
          backPress={() => this.props.navigation.dismiss()}
        />
        <ScrollView
          style={{ flex: 1, paddingHorizontal: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ height: 16 }} />
          {this.renderPrice()}
          {/* <View style={{ height: 16 }} />
          {this.renderBrands()} */}
          <View style={{ height: 16 }} />
          {this.renderFrequencyOfUsage()}
          <View style={{ height: 16 }} />
        </ScrollView>
        <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
        {this.renderButton('Apply')}

        </View>
      </View>
    );
  }
}
export default Filter;
