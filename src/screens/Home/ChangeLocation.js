/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Dimensions
} from "react-native";
import RNGooglePlaces from "react-native-google-places";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/Ionicons";
//local imports
import Button from "../../components/Button";
import Text from "../../components/Text";
import appstyles from "../../styles";
import Header from "../../components/Header";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images } from "../../utilities/contsants";
import { normalize } from "../../utilities/helpers/normalizeText";

export default class ChangeLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      currentAddress: "Failed to find your current location.",
      addressQuery: "",
      predictions: [],
      currentPlaceID:''
    };
    this.onGetCurrentPlacePress();
  }

  onShowInputPress = () => {
    this.setState({ showInput: true });
  };
  onOpenAutocompletePress = () => {
    RNGooglePlaces.openAutocompleteModal(
      {
        initialQuery: "vestar",
        locationRestriction: {
          latitudeSW: 6.3670553,
          longitudeSW: 2.7062895,
          latitudeNE: 6.6967964,
          longitudeNE: 4.351055
        }
      },
      [
        "placeID",
        "location",
        "name",
        "address",
        "types",
        "openingHours",
        "plusCode",
        "rating",
        "userRatingsTotal",
        "viewport",
        "addressComponents"
      ]
    )
      .then(place => {
        console.log(place);
      })
      .catch(error => console.log(error.message));
  };

  // On Change Get Location
  onQueryChange = text => {
    this.setState({ addressQuery: text });
    RNGooglePlaces.getAutocompletePredictions(this.state.addressQuery, {})
      .then(places => {
        this.setState({ predictions: places });
      })
      .catch(error => console.log(error.message));
  };

  onSelectSuggestion(placeID) {
    let {toastRef} = this.props.screenProps
    debugger
    if(placeID){
      RNGooglePlaces.lookUpPlaceByID(placeID)
      .then(results => {
        this.setState({
          selectedAddress:results.address,
          selectedLocation:results.location
        })
        let {params} = this.props.navigation.state
        if(params){
          let location={}
          location['currentAddress'] = results.address
          location['name'] = results.name
          location['currentLocation'] = results.location
          params.updateLocation(location)
          this.props.navigation.goBack()
        }
      })
      .catch(error => console.log(error.message));
    }else{
      toastRef.show('Place id not found')
    }
  }

  // OnPress Get Current Location
  onGetCurrentPlacePress = () => {
    RNGooglePlaces.getCurrentPlace()
      .then(results => {
        if (results && results.length > 0) {
          this.setState({
            currentAddress: results[0].address,
            currentLocation: results[0].location,
            currentPlaceID:results[0].placeID
          });
        }
      })
      .catch(error => console.log(error.message));
  };

  keyExtractor = item => item.placeID;

  renderItem = ({ item }) => {
    return (
      <View style={[styles.listItemWrapper]}>
        <TouchableOpacity
          style={
            (styles.listItem,
            appstyles.shadow,
            {
              shadowRadius: 0.01,
              shadowOpacity: 0.04,
              flexDirection: "row",
              backgroundColor: "white",
              paddingVertical: 18
            })
          }
          onPress={() => this.onSelectSuggestion(item.placeID)}
        >
          <View style={styles.avatar}>
            <Image
              style={styles.listIcon}
              source={require("../../assets/images/ic_location_pin.png")}
            />
          </View>
          <View style={styles.placeMeta}>
            <Text p style={styles.primaryText}>
              {item.primaryText}
            </Text>
            <Text style={styles.secondaryText}>{item.secondaryText}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  // Render Current Place
  renderCurrentPlaceItem = () => {
    return (
      <TouchableOpacity
        style={
          (styles.listItem,
          {
            flexDirection: "row",
            backgroundColor: "white",
            paddingTop: 16,
            marginTop: 16
          })
        }
        onPress={() => this.onSelectSuggestion(this.state.currentPlaceID)}
        >
        <View style={styles.avatar}>
          <FontAwesome
            name={"location-arrow"}
            size={28}
            color={"#96C50F"}
            style={{ alignSelf: "center" }}
          />
        </View>
        <View style={styles.placeMeta}>
          <Text p style={styles.primaryText}>{`Current Location`}</Text>
          <Text style={styles.secondaryText}>{this.state.currentAddress}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <KeyboardAvoidingView 
      enabled={false}
      behavior={'height'} 
      style={{ flex: 1 }}>
        <Header
          isRightIcon={false}
          headerStyle={[
            appstyles.shadow,
            {
              backgroundColor: "#FFFFFF",
              shadowRadius: 0.5,
              shadowOpacity: 0.1
            }
          ]}
          title={"Location"}
          backPress={() => this.props.navigation.goBack()}
        />
        <ScrollView
          style={{ flex: 1, paddingHorizontal: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: 24 }}>
            <View style={styles.inputWrapper}>
              <View style={{ flex: 0.9 }}>
                <TextInput
                  ref={input => (this.pickUpInput = input)}
                  style={styles.input}
                  value={this.state.addressQuery}
                  onChangeText={this.onQueryChange}
                  placeholder={"Search Location"}
                  placeholderTextColor="#9BABB4"
                  underlineColorAndroid={"transparent"}
                  autoFocus
                />
              </View>
              {this.state.addressQuery ? (
                <TouchableOpacity
                  style={{ flex: 0.1, alignSelf: "center" }}
                  onPress={() =>
                    this.setState(
                      {
                        addressQuery: ""
                      },
                      () => {
                        this.onQueryChange("");
                      }
                    )
                  }
                >
                  <Icons
                    name={"ios-close-circle"}
                    size={28}
                    color={"rgba(0,0,0,0.56)"}
                    style={{ alignSelf: "center" }}
                  />
                </TouchableOpacity>
              ) : null}
            </View>

            {this.renderCurrentPlaceItem()}
            <View style={styles.list}>
              <FlatList
                data={this.state.predictions}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 12,
    paddingTop: 45
  },
  button: {
    backgroundColor: "#263238",
    flexDirection: "row",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  avatar: {
    flex: 0.1
  },
  placeMeta: {
    flex: 0.9
  },
  buttonText: {
    color: "white"
  },
  inputLauncher: {
    backgroundColor: "#F3F7F9",
    width: "100%",
    borderRadius: 4,
    height: 35,
    justifyContent: "center",
    paddingLeft: 10,
    marginBottom: 16
  },
  inputWrapper: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    flexDirection: "row",
    height: 48,
    borderWidth: 1,
    borderColor: "#96C50F",
    borderRadius: 24,
    justifyContent: "space-between",
    paddingHorizontal: 8
  },
  input: {
    color: "#000000",
    height: 48,
    paddingLeft: 8,
    fontSize: normalize(18),
    paddingVertical: 4
  },
  list: {
    marginTop: 16,
    height: Dimensions.get("window").height - 70
  },
  listItemWrapper: {
    backgroundColor: "white",
    flex: 1
    // paddingVertical:16
    // paddingTop:16,
    // marginTop:8,
    // height: 75
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"

    // paddingHorizontal: 16,
    // height: '100%'
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.09)",
    marginHorizontal: 16
    // opacity: 0.6
  },
  primaryText: {
    color: "#000000",
    fontSize: normalize(16)
    // marginBottom: 3
  },
  placeMeta: {
    flex: 1,
    marginLeft: 15
  },
  secondaryText: {
    color: "rgba(0,0,0,0.56)",
    fontSize: normalize(14)
  },
  listIcon: {
    width: 28,
    height: 28
  }
});
