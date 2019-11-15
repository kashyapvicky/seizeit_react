import React, { Component } from 'react';
import { 
  Text, View, ScrollView, SafeAreaView, Platform, StyleSheet
} from 'react-native';
import { Rating } from 'react-native-ratings';
import colors from '../../../utilities/config/colors';


class SwipeRatingScreen extends React.Component {
  ratingCompleted( rating ) {
    console.log( `Rating is: ${rating}` );
  }
  render() {
      let {showRating,readOnly} =this.props
    return (
          <View  style={styles.card}>
            <Rating 
              showRating={showRating} 
              fractions={2} 
              ratingColor={colors.primary}
              imageSize={22}
              readonly={readOnly}
              ratingTextColor={colors.yellow} 
              style={{flexDirection:'row',justifyContent:'flex-start',flex:1,alignItems:'flex-start'}}
              onStartRating={() => console.log("started rating")}
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