import React, { Component } from "react";
import {
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";

//local imports
import Button from "../../components/Button";
import ScrollableTabView from '../../components/ScrollableTab'
import Text from "../../components/Text";
import LineChartComponet from "./Templates/Chart";
import Header from "../../components/Header";
import { normalize } from "../../utilities/helpers/normalizeText";

import styles from "../../styles";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images } from "../../utilities/contsants";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      tabs: [
        {
          title: "Order Recieved"
        },
        {
          title: "In Processing"
        },
        {
          title: "Dispatched"
        }
      ],
      buttons:[{
        name:'Reject Order',
        backgroundColor:'#6B7580'
      },{
      name:'Confirm Order',
      backgroundColor:'#96C50F',
      
    },{
    name:'Order details',
    backgroundColor:'#FFFFFF',
    color:'#96C50F'
  }]
    };
  }

  renderButton = (title, backgroundColor,color) => {
    return (
      <Button
        buttonStyle={{
          height: 32,
          width:deviceWidth/3-20,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          borderColor:color?color:backgroundColor,
          backgroundColor: backgroundColor
        }}
        fontSize={14}
        color={color}
        onPress={() => alert()}
        title={title}
      />
    );
  };
  //***************** */Tabs Function  **********************//
  setStateForTabChange = i => {};
  renderListForProducts = (item, index) => {
    return (
      <View key={index} tabLabel={item.title} style={{ paddingVertical: 16 ,paddingHorizontal:8}}>
        <View style={{ paddingHorizontal: 16,paddingVertical:8 }}>
          <Text p={{ color: "#6B7580", fontSize: normalize(14) }}>
            2 Orders in total
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        {this.renderAllItem()}
        <View style={styles.borderSalesReport} />

        <LineChartComponet />
        </ScrollView>
      
      </View>
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
            marginTop: 16,
            shadowRadius: 0.1
          }
        ]}
      >
        <View style={{ flexDirection: "row" }}>
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
                  "https://cdn.andamen.com/media/catalog/product/cache/1/list_image/500x/040ec09b1e35df139433887a97daa66f/o/p/openfileartboard15.jpg"
              }}
            />
          </View>
          <View style={{ flex: 0.7,paddingLeft:8 }}>
            <View>
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
            </View>
            <View>
              <Text p style={{ color: "#000000" }}>
                Dotted Red payjama bottom wear
              </Text>
            </View>
            <View style={{paddingTop:6}}>
              <Text h5 style={{ color: "#000000", fontSize: normalize(18) }}>
                $1,256
              </Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection:'row',flex:1,paddingTop:16,paddingBottom:8}}>
          {this.state.buttons.map((button,index) => {
            return <View style={{flex:0.5}}>{this.renderButton(button.name,button.backgroundColor,button.color)}</View>
          })}

        </View>
      </TouchableOpacity>
    );
  };
  renderAllItem = (data, index) => {
    return (
      <View style={{ paddingHorizontal: 10 }} key={index}>
        <FlatList
          bounces={true}
          // extraData={this.state}
          // pagingEnabled={true}
          showsVerticalScrollIndicator={false}
          data={[1, 2]}
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
  renderScrollableTab = () => {
    return (
      <ScrollableTabView
      tabs={this.state.tabs}
      renderListTabs={(item, index) => this.renderListForProducts(item, index)}
      />  
    )
  };
  //***************** */Tabs Function End **********************//

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          isRightIcon={Images.notification}
          hideLeftIcon={true}
          title={"Dashboard"}
          backPress={() => this.props.navigation.dismiss()}
        />
        {this.renderScrollableTab()}
      
      </View>
    );
  }
}
export default Home;
