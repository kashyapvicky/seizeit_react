import React, { Component } from 'react';
import { 
  Text, View, ScrollView, SafeAreaView, Platform, StyleSheet
} from 'react-native';
import { Rating ,AirbnbRating} from 'react-native-ratings';
import colors from '../../../utilities/config/colors';


class SwipeRatingScreen extends React.Component {
  ratingCompleted =(rating)=> {
    if(this.props.onRatingPress){
      this.props.onRatingPress(rating)
    }
  }
  render() {
      let {showRating,readOnly,imageSize,defaultRating} =this.props
    return (
          <View  style={styles.card}>
            <AirbnbRating 
              showRating={false} 
              defaultRating={defaultRating}
              ratingColor={colors.primary}
              size={imageSize ? imageSize : 20}
              isDisabled={readOnly}
              ratingTextColor={colors.yellow} 
              style={{flexDirection:'row',justifyContent:'flex-start',flex:1,alignItems:'flex-start'}}
              onFinishRating={(rating) => this.ratingCompleted(rating)}
            />
          </View>
       
    );
  }
}

const styles = StyleSheet.create( {
   card: {
    flex:1,
    justifyContent:'flex-start',
    flexDirection:'row',
    alignItems:'flex-start',
    // backgroundColor:'red'
  }
});

export default SwipeRatingScreen;