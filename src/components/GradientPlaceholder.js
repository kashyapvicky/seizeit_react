
import React, { Component } from 'react';

import LinearGradient from 'react-native-linear-gradient';

export const Gradient = ()=> {
    return (
      <LinearGradient
        colors={['#eeeeee', '#dddddd', '#eeeeee']}
        start={{ x: 1.0, y: 0.0 }}
        end={{ x: 0.0, y: 0.0 }}
        style={{
          flex: 1,
          width: 120
        }}
      />
    );
  };
  