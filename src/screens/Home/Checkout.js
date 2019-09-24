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
import Listitems from "./Templates/ListItem";
import RenderLabel from '../Settings/Templates/Label'
import InvoiceInfo from '../Settings/Templates/InvoiceInfo'
import TextInputComponent from "../../components/TextInput";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      tabs:[{
        title:'Debit/Credit'
      },{
        title:'Cash on delivery'
      },{
        title:'Bank transfer'
      }],
      cartItems: [],
    };
  }
  
  pressButton = () => {};
  renderButton = (title, transparent) => {
    return (
      <Button
        buttonStyle={{
          height: 52,
          justifyContent: "center",
          alignItems: "center",
        //   borderRadius: 5,
          backgroundColor: transparent ? "transparent" : colors.primary
        }}
        buttonTextStyle={{fontSize:normalize(14),fontWeight:'bold'}}
        color={transparent ? colors.primary : "#FFFFFF"}
        onPress={() => this.pressButton(title)}
        title={title.toUpperCase()}
      />
    );
  };
  renderItems = ({ item, index }) => {
    return <Listitems item={item} index={index} imageHeight={168} 
    onPress={()=> this.props.navigation.navigate('ProductDetails')}

    />;
  };
  renderCommentInput = ()=>{
    let textInputStyle = {
      ...styles.textInputStyle,
      fontSize:normalize(14),
      color:colors.primary
}
    return <TextInputComponent
    label={''}
    inputMenthod={input => {
      this.confirmAccountNumberRef = input;
    }}
    placeholder={'Describe the problem here…'}
    placeholderTextColor={colors.primary}
    selectionColor="#96C50F"
    returnKeyType="next"
    autoCorrect={false}
    autoCapitalize="none"
    blurOnSubmit={false}
    multiline={true}
    editable={true}
    viewTextStyle={[styles.viewcardTextStyle,{height:100,backgroundColor:'#F0F2FA',paddingTop:16}]}
    value={this.state.confirmAccountNumber}
    underlineColorAndroid="transparent"
    isFocused={this.state.confirmAccountFieldFocus}
    onFocus={() => this.setState({ confirmAccountFieldFocus: true })}
    onBlur={() => this.setState({ confirmAccountFieldFocus: false })}
    onChangeText={confirmAccountNumber => this.setState({ confirmAccountNumber })}
    onSubmitEditing={event => {
        // Keyboard.dismiss()
    }}
    textInputStyle={textInputStyle}
    bankAccount


  />
  }
  renderPaymentSelectSection = (item, index)=>{
    return <View key={index} tabLabel={item.title} style={{paddingTop:16}}>

             <RenderLabel label={'Saved cards'}/>

         </View>
  }
  renderScrollableTab = () => {
    return (
      <View style={{ paddingVertical: 16,paddingHorizontal: 24,}}>
         <RenderLabel label={'Payment'}/>
         <ScrollableTabView
        tabs={this.state.tabs}
        renderListTabs={(item, index) => this.renderPaymentSelectSection(item, index)}
      />
      </View>
     
    );
  };
  addButton =(title) =>{
    return  <TouchableOpacity style={{ paddingTop: 16,paddingHorizontal:24}}>
                <Text h5 style={{color:colors.primary,fontSize:normalize(14)}}>+{title.toUpperCase()}</Text>
          </TouchableOpacity>
  }
  renderProductsList = (item, index) => {
    return (
      <View
        key={index}
        style={{ flex: 1, paddingHorizontal: 24, marginTop: 8 }}
      >
          <RenderLabel label={'Items'}/>
          <View style={{height:10}} />
        <FlatList
          bounces={true}
          // extraData={this.state}
          // pagingEnabled={true}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={this.state.cartItems}
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderItems}
        />
      {this.renderCommentInput()}
    

      </View>
    );
  };

  renderSectionOne = () => {
      return <View style={{paddingHorizontal:24,flex:1}}>
       <RenderLabel label={'Personal details'} rightLabel={'Change'}/>
        {this.renderPersonalDetail()}
      </View>   
  }
  renderSectionTwo = () => {
    return <View style={{paddingHorizontal:24,flex:1,paddingVertical:8}}>
     <RenderLabel label={'Delivering to'} rightLabel={'Change'}/>
      <View style={{paddingTop:16}}>
        <Text  p style={[styles.subLable]}>Code Brew Labs, Arth Parkash Building Sector 29 D, Chandigarh 160030</Text>
      </View>
    </View>   
}
  renderPersonalDetail =() =>{
    return <View style={{flex:1,paddingVertical:16}}>
              <View>
                <Text h5 style={[styles.pLable]}>Name</Text>
                <Text p style={[styles.subLable]}>Leo Harmon</Text>

              </View>
              <View style={{paddingTop:16}}>
              <Text h5 style={[styles.pLable]}>Phone Number</Text>
                <Text p style={[styles.subLable]}>+91-9876543210</Text>
              </View>
           </View>   
  }
  renderOrderInvoiceInfo = () => {
    return <View >
      <InvoiceInfo fromCheckout={true}/>
      <View style={{height:10}} />
         {this.addButton('Add Promo code')}
         <View style={{height:10}} />

      </View>

  };
  renderBotttomButton = () =>{
    return <TouchableOpacity 
     onPress={() => this.props.navigation.navigate('OrderSuccessFull')}
    style={{flex:0.15,justifyContent:'flex-end',
    justifyContent:'center',
    flexDirection:'row',backgroundColor:colors.primary}}>
        <View style={{flex:0.55, justifyContent:'center',paddingHorizontal:16
      }}>
        <Text p style={{fontSize:normalize(20),fontWeight:'bold',color:'white'}}>$120</Text>
        </View>
         <View style={{flex:0.5, justifyContent:'center',paddingHorizontal:16,flexDirection:'row',alignItems:'center'
      }}>
              <Text p style={{fontSize:normalize(16),fontWeight:'bold',color:'white'}}>PLACE ORDER   </Text>
              <View >
              <Icons   name={'ios-arrow-forward'} color={'#FFFFFF'} size={20} style={{alignSelf:'center'}}/>
              </View>
        </View>
    </TouchableOpacity>
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
              isRightIcon={Images.close_g}
              headerStyle={[
                styles.shadow,
                {
                  backgroundColor: "#FFFFFF",
                  shadowRadius: 0.1
                }
              ]}
             hideLeftIcon={true}
          title={"Checkout"}
          onRightPress={() => this.props.navigation.dismiss()}
        />
        <ScrollView style={{flex:1,paddingVertical:16}} showsVerticalScrollIndicator={false}>
        {this.renderSectionOne()}
        <View style={styles.borderSalesReport} />
            {this.renderSectionTwo()}
        <View style={styles.borderSalesReport} />
        {this.renderProductsList()}
        <View style={styles.borderSalesReport} />
        { this.renderOrderInvoiceInfo()}
        <View style={styles.borderSalesReport} />
        {this.renderScrollableTab()}
        <View style={{height:48}} />
         </ScrollView>
      
              {this.renderBotttomButton()}
      </View>
    );
  }
}
export default Checkout;
