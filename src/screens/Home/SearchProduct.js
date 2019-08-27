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
import SearchInput from "../../components/SearchInput";

class SearchProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false
    };
  }
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
  renderSearchInput = () => {
    return (
      <View style={{ flex: 1, paddingLeft: 16 ,flexDirection:'row',
      justifyContent:'space-between'}}>
        <View>
        <TextInput
          style={[styles.searchProInput,{flex:1}]}
          placeholder={"Search product"}
          placeholderTextColor={"rgba(0,0,0,0.56)"}
        />
        </View>
       
        <Image source={Images.inputClose} style={{alignSelf:'center'}} onPress={() => alert()}/>
      </View>
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          //   isRightIcon={Images.close_g}
          headerStyle={[
            styles.shadow,
            {
              backgroundColor: "#FFFFFF",
              shadowRadius: 0.1,
              height:48,
            }
          ]}
          hideLeftIcon={false}
          backPress={() => this.props.navigation.dismiss()}
        >
          {this.renderSearchInput()}
        </Header>
        {/* <ScrollView
            keyboardShouldPersistTaps={'handled'}
          style={{ flex: 1, paddingHorizontal: 24 }}
          showsVerticalScrollIndicator={false}
        /> */}
      </View>
    );
  }
}
export default SearchProduct;
