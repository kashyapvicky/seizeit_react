import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import * as Animatable from 'react-native-animatable';

import Text from "./Text";
import styles from '../styles'

export default  DropDownList = props => {
  return <ScrollView style={[styles.shadow,{
    backgroundColor:'white',borderWidth:1,paddingHorizontal:16,
    borderTopWidth:0,
    borderColor:'rgba(0,0,0,0.2)',
      flex:1,height:100,marginBottom:10}]}>
      <Animatable.View  
      animation="slideInDown" 
      
    //   duration={'500'} direction={'normal'}
      style={[{         
      paddingVertical:16}]}
     >
      {
          ['1','3','3',3,3,'1','3','3',3,3,'1','3','3',3,3].map((item,index) =>{
              return <Text p >Hello</Text>
          })
      }
      </Animatable.View  >  
      </ScrollView>

};
