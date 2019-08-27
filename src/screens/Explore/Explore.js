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

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      cartItems: [],
      tabs: [
        {
          title: "All Transactions"
        },
        {
          title: "Received"
        },
        {
          title: "Deducted"
        }
      ]
    };
  }
  pressButton = ()=>{
    return null
  }
 

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
          title={"Explore"}
          backPress={() => this.props.navigation.dismiss()}
        />
     
      </View>
    );
  }
}
export default Explore;
