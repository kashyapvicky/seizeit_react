import React, { Fragment } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

const { width } = Dimensions.get("window");
const OfflineNotice = props => {
  const netInfo = useNetInfo();
  if (netInfo && !netInfo.isConnected && !netInfo.isInternetReachable) {
    return (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>No Internet Connection</Text>
      </View>
    );
  } else {
    return null;
  }
};
export default OfflineNotice;

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: "#b52424",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width,
    position: "absolute",
    top: 0,
    zIndex: 10
  },
  offlineText: {
    color: "#fff"
  }
});
