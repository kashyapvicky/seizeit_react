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
  }
  shopasguest = () => {
    this.props.navigation.navigate('App')
  }
  pressButton = () => {
    this.props.navigation.navigate('Login')

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
              <View style={styles.dontHaveAnAccountView}>
                <Text style={styles.whatisPetPartner}>{string('BecomeAVendor')}
                </Text>
              </View>
              <View style={{ height: 20 }} />
            </View>
        </View>
    

    );
  }
}
export default  StartScreen


