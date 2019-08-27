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
import OrderListItem from "./Templates/OrderListItem";

class CustomerReturOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      orders: [
        {
          id: 1,
          name: "Sleeve-less Tees Tria color grays shades",
          author: "Brent Morgan",
          status: "Return in process"
        },
      ]
    };
  }
  renderButton = (title, transparent) => {
    return (
      <Button
        buttonStyle={{
          height: 32,
          justifyContent: "center",
          alignItems: "center",
          borderColor: transparent ? colors.primary : colors.transparent,
          borderRadius: 4,
          backgroundColor: transparent ? "transparent" : colors.primary
        }}
        fontSize={normalize(14)}
        color={transparent ? colors.primary : "#FFFFFF"}
        onPress={() => this.pressButton(title)}
        title={title}
      />
    );
  };
  pressButton = (title) => {
    if(title == 'Return'){
        this.props.navigation.navigate('CustomerReturnOrderRequest')
    }
  };
  renderItems = ({ item, index }) => {
    return <OrderListItem 
    item={item} index={index}
    onPress={()=> this.props.navigation.navigate('ReturnDetail')}
      renderButton={(title,transparent) =>this.renderButton(title,transparent)}
       />
  };
  renderProductsList = () => {
    return (
      <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 8 }}>
        <FlatList
          bounces={true}
          showsVerticalScrollIndicator={false}
          data={this.state.orders}
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderItems}
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
          //   hideLeftIcon={true}
          title={"Return Order"}
          backPress={() => this.props.navigation.goBack()}
        />

        {this.renderProductsList()}
      </View>
    );
  }
}
export default CustomerReturOrders;
