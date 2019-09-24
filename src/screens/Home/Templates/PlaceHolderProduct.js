import React, { Component } from 'react';
import { AppRegistry, FlatList,StyleSheet, Text, View } from 'react-native';
import {
  PlaceholderContainer,
  Placeholder
} from 'react-native-loading-placeholder';
import { screenDimensions } from "../../../utilities/contsants";
import {Gradient} from '../../../components/GradientPlaceholder'
import styles from "../../../styles";

export const ProductPlaceholder =({loader=Promise,array=[1,2],message}) => {
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
          numColumns={2}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={array}
          style={{flex:1}}
          keyExtractor={(item, index) => index + "product"}
          renderItem={(item,index)=>{
            return <View style={{ flexDirection: 'column' ,
             marginLeft:index%2 == 0 ? 0:16,
            marginTop:16
          }}>
            <Placeholder style={[styles.placeholder, { 
                 borderRadius:8,
                width: screenDimensions.width/2-32, height: 96 }]} />
            <View
              style={{
                flexDirection: 'column',
                // width: '100%',
                marginTop:16,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Placeholder
                style={[
                  styles.placeholder,
                  {
                    width: '25%',
                    // marginTop:30,
                    height: 10
                  }
                ]}
              />
                <Placeholder
                style={[
                  styles.placeholder,
                  {
                    width: '75%',
                    height: 10
                  }
                ]}
              />
                 <Placeholder
                style={[
                  styles.placeholder,
                  {
                    width: '90%',
                    height: 10
                  }
                ]}
              />
            </View>
            </View>
          }}
        />
       {
         message ? 
           <View style={{alignSelf:'center',position:'absolute',top:'35%'}}>
             <Text p>{message}</Text>
         </View>:null
       } 
      </PlaceholderContainer>
    );
  };


