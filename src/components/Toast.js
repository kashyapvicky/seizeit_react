import React from "react";
import {TouchableOpacity, View } from "react-native";
// import Toast, { DURATION } from "react-native-easy-toast";
import Text from './Text'
import * as Animatable from 'react-native-animatable';
const ToastShow = props => {
  return (
    <Animatable.View 
    animation={'slideInDown'}
    duration={500}
    style={[styles.container, { top: 0 }]} 
      pointerEvents="none">
      <View
        style={[
          styles.content,
          {
            backgroundColor:props.color
          }
        ]}
       >
        {React.isValidElement(props.message) ? (
          props.message
        ) : (
          <Text p style={styles.text}>{props.message}</Text>
        )}
      </View>
    </Animatable.View>
  );
};
const styles = {
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    flex:1,
    elevation: 999,

    // alignItems: 'center',
    zIndex: 10000,
},
content: {
    backgroundColor: 'black',
    borderRadius: 0,
    padding: 10,
},
text: {
    color: 'white',
    // fontSize:16
}
};
export default ToastShow;
