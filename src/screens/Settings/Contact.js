import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
  ActivityIndicator
} from "react-native";

import backButton from "../../assets/images/ic_back.png";
import contact_us from "../../assets/images/illustration_contact.png";
import email from "../../assets/images/ic_email.png";
import phone from "../../assets/images/ic_call.png";
import { colors } from "../../utilities/contsants";
import styles from "../../styles";
import Communications from "react-native-communications";
import { string } from "../../utilities/languages/i18n";

const initialState = {
  username: "Leo Harmon",
  mobileNumber: "+91 902-319-4565",
  email: "liliana_ledner@rachel.ca",
  visible2: false,
  contact: "+171 578-938-2642"
};

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentWillMount = () => {
    this.setState({ visible2: false });
  };
  render() {
    return (
      <View style={{ flex: 1, zIndex: 1000 }}>
        <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <View style={styles.topOfProductDetail}>
            <View style={styles.filterModalView}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.goBack()}
              >
                <View>
                  <Image source={backButton} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.borderBottom} />

            <ScrollView>
              <View style={{ marginTop: 20 }}>
                <Image source={contact_us} />
              </View>
              <View style={{ marginTop: 50, paddingHorizontal: 20 }}>
                <Text style={styles.leaveMessage}>
                  {string("leaveMessage")}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  Communications.email(
                    [this.state.email, ""],
                    null,
                    null,
                    "",
                    ""
                  )
                }
              >
                <View
                  style={[
                    styles.emailView,
                    styles.shadow,
                    {
                      elevation: 2,
                      shadowRadius: 2,
                      shadowOpacity: 0.4,
                      marginTop: 50
                    }
                  ]}
                >
                  <View style={{ flex: 0.2 }}>
                    <View style={[styles.emailViewImage]}>
                      <Image source={email} style={{ alignSelf: "center" }} />
                    </View>
                  </View>
                  <View style={styles.emailView2}>
                    {this.state.visible2 ? (
                      <ActivityIndicator size={"small"} />
                    ) : (
                      <Text style={styles.contactText} numberOfLines={1}>
                        {this.state.email}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Communications.phonecall(this.state.contact, true)
                }
              >
                <View
                  style={[
                    styles.emailView,
                    styles.shadow,
                    { shadowRadius: 2, shadowOpacity: 0.4, elevation: 2 }
                  ]}
                >
                  <View style={{ flex: 0.2 }}>
                    <View style={[styles.emailViewImage]}>
                      <Image source={email} style={{ alignSelf: "center" }} />
                    </View>
                  </View>
                  <View style={styles.emailView2}>
                    {this.state.visible2 ? (
                      <ActivityIndicator size={"small"} />
                    ) : (
                      <Text style={styles.contactText} numberOfLines={1}>
                        {this.state.contact}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
              <View style={{ marginVertical: 40 }} />
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
export default Contact;
