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
          check: true
        },
        {
          title: "High to Low",
          check: false
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
          title: "1 to 5 Days",
          check: false
        },
        {
          title: "5 to 10 Days",
          check: false
        },
        {
          title: "15 to 20 Days",
          check: true
        },
        {
          title: "Fresh",
          check: true
        }
      ]
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
            return <FilterItemsRadio item={item} index={index} />;
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
            return <FilterItemsCheckBox item={item} index={index} />;
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
          backPress={() => this.props.navigation.dismiss()}
        />
        <ScrollView
          style={{ flex: 1, paddingHorizontal: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ height: 16 }} />
          {this.renderPrice()}
          <View style={{ height: 16 }} />
          {this.renderBrands()}
          <View style={{ height: 16 }} />
          {this.renderFrequencyOfUsage()}
          <View style={{ height: 16 }} />
        </ScrollView>
      </View>
    );
  }
}
export default Filter;
