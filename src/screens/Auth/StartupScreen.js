import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView

} from 'react-native';

//local imports
import {getRequest} from '../../redux/request/Service'
import Button from '../../components/Button'
import Text from '../../components/Text'
import styles from '../../styles'
import { string } from '../../utilities/languages/i18n'
import colors from '../../utilities/config/colors';
import {Images} from '../../utilities/contsants'
class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      cartItems: []
    }
     this.props.screenProps.actions.setIndicator(false)
  }

  shopasguest = () => {
    this.props.navigation.navigate('App')
  }

  pressButton = (title) => {
    if(title == 'Login'){
      this.props.navigation.navigate('Login')
    }else{
      this.props.navigation.navigate('CustomerTabNavigator')

    }

  }

  renderButton = (title,transparent) => {
    return (
      <Button
        buttonStyle={{
          height: 48,
          justifyContent: "center",
          alignItems: "center",
          borderRadius:8,
          backgroundColor:transparent ?'transparent':colors.primary
        }}
        fontSize={18}
        color={transparent ?colors.primary:'#FFFFFF'}
        onPress={() => this.pressButton(title)}
        title={title.toUpperCase()}
      />
    );
  };
  
  render() {
    return (
        <View style={{ flex: 1 ,paddingHorizontal:16}}>
            <View style={[styles.homeLogo,{flex:1,justifyContent:'center'}]}>
                <Image source={Images.homeLogo} />
            </View>
            <View style={[styles.bottomStyle,]}>
                {this.renderButton('Shop as a guest')}
              <View style={{ height: 20 }} />
              {this.renderButton('Login','transparent')}
              <View style={{ height: 20 }} />
              <TouchableOpacity 
               onPress={()=> this.props.navigation.navigate("Signup",{
                role:'Vendor'
              })}
              style={styles.dontHaveAnAccountView}>
                <Text style={styles.whatisPetPartner}>{string('BecomeAVendor')}
                </Text>
              </TouchableOpacity>
              <View style={{ height: 20 }} />
            </View>
        </View>
    

    );
  }
}
export default  StartScreen


