import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../../../utilities/config/colors";
import  styles  from "../../../styles";
import Text from "../../../components/Text";
import { normalize } from "../../../utilities/helpers/normalizeText";
import {sizeStatus} from '../../../utilities/method'
import { string } from "../../../utilities/languages/i18n";

export const FeatureLabel = ({title}) => {
    return (
      <View>
        <Text h5 style={[styles.labelHeading,{
          color:'rgba(0,0,0,0.56)',
          fontSize: normalize(15),}]}>
          {title}
        </Text>
      </View>
    );
};
const FeatureText = ({title}) => {
    return (
      <View>
        <Text p style={[styles.labelHeading,{
          color:'#000000',
          fontSize: normalize(18),}]}>
          {title}
        </Text>
      </View>
    );
};
const Features = ({product}) => {
  let sizeText = sizeStatus(product.size_id)
  return <View style={{flex:1,}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}} >
              <FeatureLabel title={string('Size')}/>
              <FeatureLabel title={string("noOfTimes")}/>
            </View>
            <View style={{height:8}}/>

            <View style={{flexDirection:'row',justifyContent:'space-between'}} >
              <FeatureText title={sizeText ?sizeText.name :'' }/>
              <FeatureText title={product.times == 1 ? product.times == 2 ?'Two' :'Once' :'Once'}/>
            </View>
       </View>

};

export default Features