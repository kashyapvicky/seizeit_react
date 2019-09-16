import React, { Component } from "react";
import { View, Text } from "react-native";
import { withNavigation } from "react-navigation";
import Modal from "react-native-modal";
import styles from "../styles";
// import Indicator from "./Indicator";

const CustomModal = props => {
  let { indicator } = props.navigation.getScreenProps();
  return (
    <Modal
      visible={props.isModalVisible}
      backdropColor={"black"}
      animationType={"slide"}
      animationIn={"slideInUp"}
      animationInTiming={2000}
      animationOutTiming={2000}
      backdropTransitionInTiming={2000}
      backdropTransitionOutTiming={2000}
      backdropOpacity={0.01}
      onBackButtonPress={() => props.closeModal()}
      onBackdropPress={() => props.closeModal()}
      style={[styles.bottomModal, props.modalStyle]}
    >
      {/* {indicator && <Indicator />} */}
      {props.children}
    </Modal>
  );
};
export default withNavigation(CustomModal);
