import React, { Component } from 'react';
import { AppRegistry, FlatList,StyleSheet, View } from 'react-native';
import {
  PlaceholderContainer,
  Placeholder
} from 'react-native-loading-placeholder';
import { screenDimensions } from "../../../utilities/contsants";
import Text from "../../../components/Text";
import {Gradient} from '../../../components/GradientPlaceholder'
import styles from "../../../styles";
import { string } from "../../../utilities/languages/i18n";

export const BannerPlaceholderComp =({loader=Promise,array=[1,2]}) => {
    return (
       <PlaceholderContainer
        style={[styles.placeholderContainer,{
            height: 'auto',
            marginBottom:16,
            marginHorizontal:8
        }]}
        animatedComponent={<Gradient />}
        duration={1000}
        delay={1000}
        loader={loader}
      >
     <Placeholder style={[styles.placeholder, { 
        borderRadius:8,
        marginTop: 0,
         width: screenDimensions.width-16, height: 'auto' }]} />
         <View style={{alignSelf:'center',position:'absolute',top:'35%'}}>
             <Text p>{string('loading')}</Text>
         </View>
     </PlaceholderContainer>
    );
  };
