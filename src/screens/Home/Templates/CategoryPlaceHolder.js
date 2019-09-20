import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import {
  PlaceholderContainer,
  Placeholder
} from 'react-native-loading-placeholder';
import { screenDimensions } from "../../../utilities/contsants";
import {Gradient} from '../../../components/GradientPlaceholder'
import styles from "../../../styles";

export const CategoryPlaceholder =({loader=Promise}) => {
    return (
       <PlaceholderContainer
        style={styles.placeholderContainer}
        animatedComponent={<Gradient />}
        duration={1000}
        delay={1000}
        loader={loader}
      >
      <View style={{ flexDirection: 'row',flex:1 }}>
     { [1,2,3,4,5,6].map((item,index) => {
        return <View style={{ flexDirection: 'column',width:screenDimensions.width/7 }} key={index+'placeholder'}>
           <Placeholder style={[styles.placeholder, {
             borderRadius:32/2,
              marginLeft: 15,
              width: 32, height: 32 }]} />
         <View
           style={{
             flexDirection: 'column',
             width: '100%',
             marginTop:8,
             alignItems: 'center',
             marginLeft: 15,
             justifyContent: 'center'
           }}
         >
           <Placeholder
             style={[
               styles.placeholder,
               {
                 width: '60%',
                 // marginTop:30,
                 height: 10
               }
             ]}
           />
         </View>
       </View>
       })
     } 
     </View>
      </PlaceholderContainer>
    );
  };
