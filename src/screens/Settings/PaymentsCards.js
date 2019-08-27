import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform
} from "react-native";

//Local imports
import backButton from "../../assets/images/ic_back.png";
import circleCheckTrue from "../../assets/images/ic_check_active.png";
import checkBoxFalse from "../../assets/images/ic_check_box_0.png";
import styles from "../../styles";
import { screenDimensions } from "../../utilities/contsants";
import Text from "../../components/Text";

const initialState = {
  username: "Leo Harmon",
  mobileNumber: "+91 902-319-4565",
  allProduts: [],
  allProductsListForItem: [],
  visible: false,
  selectedCardIndex:0,
  allPaymentCards: [
    {
      id: 1,
      cardType: "VISA",
      cardImage: require("../../assets/images/download.jpeg"),
      cardBank: "icici bank",
      cardNumber: "1234 XXXX XXXX 5678",
      cardHolderName: "Joel Mullins"
    },
    {
      id: 2,
      cardType: "VISA",
      cardImage: require("../../assets/images/download.jpeg"),
      cardBank: "Hdfc bank",
      cardNumber: "3256 XXXX XXXX 5695",
      cardHolderName: "Joel Mullins"
    }
  ],
  selectedCard: null,
};

export default class PaymentsCards extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  _keyExtractor2 = (item, index) => index + "flatlist2";
  _allPaymentCards = ({ item, index }) => {
    return (
      <View style={[styles.flatliStCardView, { flex: 1 }]}>
        <View style={[styles.flatliStCardViewMain, { flex: 1 }]}>
          <View style={{ flexDirection: "row", flex: 1 ,paddingVertical:4}}>
            <TouchableOpacity
              onPress={() =>
                this.setState({ selectedCardIndex: index, selectedCard: item })
              }
            >
              <View style={styles.cardImageView}>
                <Image
                  source={
                    this.state.selectedCardIndex == index
                      ? circleCheckTrue
                      : checkBoxFalse
                  }
                  style={{ alignSelf: "center" }}
                />
              </View>
            </TouchableOpacity>

            <View style={{ paddingLeft: 10, flex: 1 }}>
              <View style={styles.bankInfoView}>
                <View style={styles.BanknamaAndNumber}>
                  <Text style={[styles.cardBank,{lineHeight:26}]}>
                    {item.cardBank.toUpperCase()}
                  </Text>
                  <Text style={[styles.cardNumber, { marginTop: 5 }]}>
                    {item.cardNumber}
                  </Text>
                </View>
                <View style={{}}>
                  {item.cardImage ? <Image source={item.cardImage} /> : null}
                </View>
              </View>
              <View style={{height:25}} />
              <View style={styles.bankInfoView}>
                <View style={styles.BanknamaAndNumber}>
                <Text style={[styles.cardHolderNameLabel]}>
                    {"Card Holder Name"}
                  </Text>
                  <Text style={[styles.cardNumber, { marginTop: 5 }]}>
                    {item.cardHolderName}
                  </Text>
                </View>
                <View style={[{
                    borderRadius:4,
                    paddingHorizontal:8,
                    backgroundColor:'#F5F5F5',justifyContent:'center'}]}>
                    <Text  style={[{color:'#9E9E9E',fontSize:14}]}>{"Enter CVV"}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  addNewPaymentCard = () => {
    this.props.navigation.navigate("AddNewCard");
  };

  render() {
    return (
      <SafeAreaView
        forceInset={{ top: "never", bottom: "always" }}
        style={[{ flex: 1 }]}
      >
        <View style={styles.topViewCard}>
          {this.props && this.props.noHeader ? null : (
            <View style={styles.topViewCardSection}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ isModalVisible: false }, () => {
                      this.props.navigation.goBack();
                    })
                  }
                >
                  <View style={{ alignItems: "center" }}>
                    <Image source={backButton} />
                  </View>
                </TouchableOpacity>

                <View style={styles.cardTitileView}>
                  <Text style={styles.productTitle}>{"Cards"}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => this.addNewPaymentCard()}>
                <View style={styles.addNewView}>
                  <Text style={styles.resetTitle}>{"+ ADD NEW"}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.bottomLineCardScreen} />
          <View style={{ marginHorizontal: 20, marginTop: 20 }}>
            <FlatList
              bounces={true}
              extraData={this.state}
              // pagingEnabled={true}
              decelerationRate={0}
              snapToInterval={screenDimensions.width - 20}
              snapToAlignment={"center"}
              autoPlay={true}
              // snapToInterval={300}
              data={this.state.allPaymentCards}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={this._keyExtractor2}
              renderItem={this._allPaymentCards}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
