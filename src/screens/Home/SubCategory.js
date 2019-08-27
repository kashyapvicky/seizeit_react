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
import {FilterButton} from "./Templates/FilterButton";

class SubCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      cartItems: [],
      tabs: [
        {
          title: "All"
        },
        {
          title: "Shirt"
        },
        {
          title: "T-Shirt"
        },
        {
          title: "Jeans"
        },
        {
          title: "Coats"
        },
        {
          title: "Blazers"
        },
        {
          title: "All"
        },
        {
          title: "Shirt"
        },
        {
          title: "T-Shirt"
        },
        {
          title: "Jeans"
        },
        {
          title: "Coats"
        },
        {
          title: "Blazers"
        }
      ],
      orders: ["1", "2"]
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
  renderItems = ({ item, index }) => {
    return <Listitems item={item} index={index} imageHeight={168} 
    onPress={()=> this.props.navigation.navigate('ProductDetails')}

    />;
  };
  renderProductsList = (item, index) => {
    return (
      <View
        skey={index}
        tabLabel={item.title}
        style={{ flex: 1, paddingHorizontal: 16, marginTop: 8 }}
      >
        <View style={{ height: 6 }} />

        <FlatList
          bounces={true}
          // extraData={this.state}
          // pagingEnabled={true}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={[1, 2, 3, 4, 5, 6]}
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
          title={"Women"}
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
