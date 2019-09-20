import React from "react";
import { FlatList,Image ,Dimensions,StyleSheet,View,TouchableOpacity} from "react-native";
import {string} from '../utilities/languages/i18n'
import Text from "./Text";
import { normalize } from "../utilities/helpers/normalizeText";

const {height,width} = Dimensions.get('window');

export const ListEmptyComponent = (props) => {
    return (
      <View style={{
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 16,
        justifyContent: 'center',
        backgroundColor:'white',
        alignItems: 'center'
      }}>
        <Text p style={{
          fontSize: normalize(14), lineHeight: 24,
          alignSelf: props.textAlign ? props.textAlign : 'center',
        color: '#3E3E3E', 
        }} >{props.message ? props.message : string('nodatafound')}</Text>

      </View>
    )
  }

//   export const ListEmptyWithImage = (props) => {
//     let { fontFamilySemibold,
//       textAlign } = props.user;
//     return (
//       <View style={{
//         flex: 1,
//         paddingVertical: 20,
//         paddingHorizontal: 16,
//         justifyContent: 'center',
//         backgroundColor:'white',
//         alignItems: 'center'
//       }}>
//       <View style={{height:height/6}}>
//       <Text>&nbsp;</Text>
//       </View>
//       <View style={{flex:0.5}}>
//       <Image 
//          source={(props.placeHolderIcon) ? 
//          props.placeHolderIcon : require('../screens/img/bell.png')
//        }
//        style={{height:200,width:200}}
//        resizeMode={'center'}
//        />

//       </View>
      
//       </View>
//     )
//   }