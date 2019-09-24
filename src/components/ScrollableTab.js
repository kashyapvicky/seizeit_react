
import React from "react";
import { SafeAreaView, View } from "react-native";
import ScrollableTabView, {
    ScrollableTabBar
  } from "react-native-scrollable-tab-view";

import colors from '..//utilities/config/colors';
import styles from '../styles'

export default ScrollableTab = props => {
return (
    <ScrollableTabView
      style={{ marginTop: 0, width: "100%" }}
      initialPage={0}
      renderTabBar={() => (
        <ScrollableTabBar
          underlineStyle={{
            position: "absolute",
            height: 1,
            backgroundColor: colors.primary,
            bottom: 0
          }}
        />
      )}
      ref={tabView => {
        this.tabView = tabView;
      }}
      //page={props.tabPage}
      scrollWithoutAnimation
      tabBarActiveTextColor={colors.primary}
      tabBarInactiveTextColor={"#000000"}
      tabBarTextStyle={[styles.text, { fontSize: 16, fontWeight: "normal" }]}
      showsHorizontalScrollIndicator={false}
      refreshControlStyle={{ backgroundColor: "red" }}
      onChangeTab={(event) => {props.onChangeTab ?  props.onChangeTab(event) :null}}

      // onChangeTab={(event) => this.changeTabState(event.ref)}
    >
      {props.tabs
        ? props.tabs.map((item, index) => {
            return props.renderListTabs(item, index);
          })
        : null}
    </ScrollableTabView>
  );
}