import React, { Component } from "react";
import { AppRegistry, FlatList, StyleSheet, Text, View } from "react-native";
import {
  PlaceholderContainer,
  Placeholder
} from "react-native-loading-placeholder";
import { screenDimensions } from "../../../utilities/contsants";
import { Gradient } from "../../../components/GradientPlaceholder";
import styles from "../../../styles";

export const NotificationPlaceholder = ({ loader = Promise, array = [1, 2] }) => {
  return (
    <PlaceholderContainer
      style={styles.placeholderContainer}
      animatedComponent={<Gradient />}
      duration={1000}
      delay={1000}
      loader={loader}
    >
      <FlatList
        bounces={true}
        //   numColumns={2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={array}
        style={{ flex: 1 }}
        keyExtractor={(item, index) => index + "product"}
        renderItem={(item, index) => {
          return (
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                marginLeft: index % 2 == 0 ? 0 : 16,
                marginTop: index == 0 ? 0 : 36
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  marginLeft: 16,
                  flex: 1,
                  //  width: '90%',
                  // marginTop:16,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Placeholder
                  style={[
                    styles.placeholder,
                    {
                      width: screenDimensions.width / 8,
                      marginTop: 5,
                      height: 10
                    }
                  ]}
                />
                <Placeholder
                  style={[
                    styles.placeholder,
                    {
                      marginTop: 10,
                      width: screenDimensions.width -32,
                      height: 12
                    }
                  ]}
                />
                   <Placeholder
                  style={[
                    styles.placeholder,
                    {
                      marginTop: 10,
                      width: screenDimensions.width /6,
                      height: 10
                    }
                  ]}
                />
              </View>
            </View>
          );
        }}
      />
      <View style={{alignSelf:'center',position:'absolute',top:'35%'}}>
             <Text p>No Notification found</Text>
         </View>
    </PlaceholderContainer>
  );
};