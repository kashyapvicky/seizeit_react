import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  
} from "react-native";

//local imports
import Button from "../../components/Button";
import Text from "../../components/Text";
import styles from "../../styles";
import Header from "../../components/Header";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images } from "../../utilities/contsants";
import { normalize } from "../../utilities/helpers/normalizeText";
import Listitems from "../Home/Templates/ListItem";

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      cartItems: []
    };
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
    return <Listitems item={item} index={index} imageHeight={168} 
       onPress={()=> this.props.navigation.navigate('ProductDetails')}
    />;
  };
  renderProductsList = (item, index) => {
    return (
      <View
        style={{ flex: 1, marginTop: 8 }}
      >
        <View style={{ height: 6 }} />
        <FlatList
          bounces={true}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={[1, 2, 3, 4, 5, 6]}
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderItems}
        />
      </View>
    );
  };
  render() {
    return (
      <View style={{ flex: 1,backgroundColor: "#FFFFFF", }}>
        <Header
          isRightIcon={false}
          headerStyle={[
            styles.shadow,
            {
              backgroundColor: "#FFFFFF",
              shadowRadius: 0.1
            }
          ]}
          hideLeftIcon={false}
          title={"Wishlist"}
          backPress={() => this.props.navigation.goBack()}
        />
        <ScrollView style={{flex:1,paddingHorizontal: 16, }} showsVerticalScrollIndicator={false}>
          {this.renderProductsList()}
        </ScrollView>
       
      </View>
    );
  }
}
export default Wishlist;
