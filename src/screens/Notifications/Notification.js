import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  ScrollView,
  ImageBackground
} from "react-native";

//local imports
import styles from "../../styles";
import homelogo from "../../assets/images/logo2.png";
import propfileimage2 from "../../assets/images/Notification.jpg";
import propfileimage from "../../assets/images/Profile01.jpg";
import moment from "moment";
import { string } from "../../utilities/languages/i18n";
import { screenDimensions, Images } from "../../utilities/contsants";
import { normalize } from "../../utilities/helpers/normalizeText";
import {NotificationPlaceholder} from './Templates/NotoficationPlaceholder'
import {GuestLoginView} from "../../components/GuestLoginView";

//Global libs
import Button from "../../components/Button";
const initialState = {
  notificationsArray: [
    {
      id: 1,
      title: "Order Accepted",
      notificationMessage:
        "Your order request placed successfully and accepted.",
      orderId: "#62DFG5636",
      status: "success",
      time: "1 min"
    },
    {
      id: 2,
      title: "Payment Successful",
      notificationMessage:
        "Your order request placed successfully and accepted.",
      orderId: "#62DFG5636",
      status: "success",
      time: "1 min"
    },
    {
      id: 3,
      title: "Order on the way",
      notificationMessage:
        "Your order request placed successfully and accepted.",
      orderId: "#62DFG5636",
      status: "inprogres",
      time: "1 min"
    },
    {
      id: 4,
      title: "10% Flat Discount",
      notificationMessage:
        "Your order request placed successfully and accepted.",
      orderId: "#62DFG5636",
      status: "discount",
      time: "1 min"
    },
    {
      id: 5,
      title: "Order Cancelled",
      notificationMessage:
        "Your order request placed successfully and accepted.",
      orderId: "#62DFG5636",
      status: "cancel",
      time: "1 min"
    }
  ]
};
class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.loaderComponent = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
 
  }
  componentWillMount = () => {
    // willFocusSubscription = this.props.navigation.addListener('willFocus', (playload) => {
    //     console.log(playload);
    //     this.setState({ visible: true }, () => {
    //         this.getNotification()
    //     })
    // });
  };
  getNotification = () => {
    // if(this.props.user){
    //     this.props.orderActions.getAllNotification(this.props.user).then((res) => {
    //         if (res && res.status == 200) {
    //             if (res && res.data.status == 200) {
    //                 this.setState({
    //                     visible: false,
    //                   //  notificationsArray: res.data.data.data
    //                 })
    //             } else {
    //                 this.setState({ visible: false })
    //             }
    //         } else {
    //             this.setState({ visible: false })
    //         }
    //     }).catch((err) => {
    //         this.setState({ visible: false })
    //     })
    // }
  };
  componentWillUnmount() {}
  //Notification list
  _keyExtractor2 = (item, index) => index + "flatlist2";
  notificationsList = ({ item, index }) => {
    return (
      <View style={{ marginHorizontal: 5, marginBottom: 5 }}>
        <View style={[styles.cardViewNotification]}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                paddingVertical: 10
              }}
            >
              <Text
                style={[
                  styles.title,
                  {
                    color: "#96C50F"

                    // color: item.status == 1 ? '#8AC64E' : item.status == 'inprogres' ? '#F6871C' : item.status == 'discount' ? '#4A90E2' : item.status == 'cancel' ? '#F9594F' : '#8AC64E'
                  }
                ]}
              >
                {item.title}
              </Text>
              <View style={{paddingTop:2}}>
              <Text style={styles.notificationMessage}>
                {item.notificationMessage}
              </Text>
              </View>
              <View style={styles.notificationTimeView}>
                <Text style={styles.time}>
                  {item.time}
                  {/* {moment(item.time).fromNow()} */}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  renderMainView = () =>{
    let {user} = this.props.screenProps.user
    if(user){
return  <SafeAreaView
forceInset={{ top: "never", bottom: "always" }}
style={[{ flex: 1 }]}
>
<View style={styles.mainViewNotifications}>
  <View style={styles.notificationHeaderView}>
    <View>
      <Text style={styles.notificationTitle}>
        {string("notifications")}
      </Text>
    </View>
    <View>
      <Text style={[styles.clearAll, { fontSize: normalize(12) }]}>
        {string("clearAll")}
      </Text>
    </View>
  </View>
  <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{ marginTop: 20 }}>
      <FlatList
        bounces={true}
        extraData={this.state}
        pagingEnabled={true}
        data={[]}
        keyExtractor={this._keyExtractor2}
        renderItem={this.notificationsList}
        ListEmptyComponent={<NotificationPlaceholder  
          array={[1, 2, 3, 4,5,6]}
          message={string('No notification found')}
          loader={this.loaderComponent}
        />}
      />
    </View>
  </ScrollView>
</View>
</SafeAreaView>
    }else{
      return <GuestLoginView image={Images.propfileimageNotification}
       {...this.props}
      />
    }
  }


  render() {
    return this.renderMainView();
  }
}
//Connecting component with redux structure to get or dispatch data
export default Notifications;
