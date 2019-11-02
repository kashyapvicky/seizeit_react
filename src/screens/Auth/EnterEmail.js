// import React, { Component } from "react";
// import {
//   View,
//   SafeAreaView,
//   Image,
//   StatusBar,
//   Keyboard,
//   TouchableOpacity,
//   ScrollView,
//   Platform
// } from "react-native";
// //Local imports
// import backButton from "../../assets/images/ic_back.png";
// import TextInputComponent from "../../components/TextInput";
// import Text from '../../components/Text'
// import {postRequest} from '../../redux/request/Service'

// import CustomeButton from "../../components/Button";
// import styles from "../../styles";
// import { string } from "../../utilities/languages/i18n";
// //Utilities
// import Validation from "../../utilities/validations";
// import colors from '../../utilities/config/colors';
// import { normalize } from "../../utilities/helpers/normalizeText";

// const initialState = {
//   email: "",
//   emailFieldFocus: false,
//   loader: false,
//   securePassword: true,
//   visible: false
// };

// class EnterEmail extends Component {
//   constructor(props) {
//     super(props);
//     this.state = initialState;
//   }
//   inputText(ref) {
//     this.value = ref;
//   }
//   submitMethod() {
//     this.value.focus();
//   }
//   componentDidMount = () => {
//     // this.props.navigation.navigate('App')
//     // console.log("this.props.navigation", this.props.navigation)
//   };
//   ValidationRules = () => {
//     let { email } = this.state;
//     let { lang } = this.props.screenProps.user;
//     debugger;
//     return [
//       {
//         field: email,
//         name: string("email"),
//         rules: "required|email|no_space",
//         lang: lang
//       }
//     ];
//   };
//   addEmail = () => {
//     let { netStatus } = this.props.screenProps.user;
//     let {setToastMessage,setIndicator,setLoggedUserData} = this.props.screenProps.actions
//     let {toastRef} = this.props.screenProps
//     let validation = Validation.validate(this.ValidationRules());
//     if (validation.length != 0) {
//         //this.setError(true,colors.danger)
//         setToastMessage(true,colors.danger)
//         return toastRef.show(validation[0].message)
//     }
//     else {
//         let { email } = this.state
//         let {params} = this.props.navigation.state
//         let data = {}
//         if(params && params.user){
//            data = {...params.user}
//         }
//         data['email'] = email
//         postRequest('user/verifySocialAccount',data).then((res) => {
//             if(res.statuscode == 200){
//                 if(res.result && res.result.user && res.result.user.phone){
//                 setLoggedUserData(res.result.user)
//                 if(res.result.user.user_type == 'customer'){
//                   this.props.navigation.navigate('CustomerTabNavigator')
//                  }else if(res.result.user.user_type == 'vendor'){
//                   this.props.navigation.navigate('VendorTabNavigator')
//                  }
//                 }else{
//                   this.props.navigation.navigate('EnterMobile',{
//                     user:{user:res.result.user.id}
//                    })
//                 }
//               }
//         }).catch((err) => {
//         })
//      }
//   };
//   backToFirst = () => {
//     this.props.navigation.navigate("Login");
//   };
//   renderButton = (title,transparent,imageLeft,color,fontSize) => {
//     return (
//       <CustomeButton
//         buttonStyle={{
//           height: 48,
//           justifyContent: "center",
//           alignItems: "center",
//           borderRadius:8,
//           borderColor:transparent ? '#EAEAEA' : 'transparent',
//           backgroundColor:transparent ?'transparent':color
//         }}
//         buttonTextStyle={{fontWeight:imageLeft ?'normal' :'bold'}}
//         fontSize={normalize(fontSize)}
//         color={transparent ?'#455F6C':'#FFFFFF'}
//         onPress={() => this.pressButton(title)}
//         title={title.toUpperCase()}
//       />
//     );
//   };
//   pressButton = () => {
//     this.addEmail()
//   };
//   render() {
//     return (
//       <View style={{ flex: 1 ,paddingHorizontal:24}}>
//         <ScrollView>
//           <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
//             <View style={styles.backButtonImage}>
//               <Image source={backButton} />
//             </View>
//           </TouchableOpacity>

//             <View style={{ marginTop: 20 }}>
//               <Text style={styles.loginText}>{string("mobilenumber")}</Text>
//             </View>
//             <View style={{ marginTop: 10 }}>
//               <Text style={styles.forgetPassMessage}>
//                 {'Enter '}
//               </Text>
//             </View>
//             <View style={{marginVertical:32}}>
//               {/* <Text></Text> */}
//               <TextInputComponent
//                 user={this.props.user}
//                 label={string("email")}
//                 inputMenthod={input => {
//                   this.emailField = input;
//                 }}
//                 placeholder={'Email'}
//                 placeholderTextColor="rgba(62,62,62,0.55)"
//                 selectionColor="#3B56A6"
//                 returnKeyType="next"
//                 keyboardType="email-address"
//                 autoCorrect={false}
//                 autoCapitalize="none"
//                 blurOnSubmit={false}
//                 viewTextStyle={styles.viewTextStyle}
//                 value={this.state.email}
//                 underlineColorAndroid="transparent"
//                 isFocused={this.state.emailFieldFocus}
//                 onFocus={() => this.setState({ emailFieldFocus: true })}
//                 onBlur={() => this.setState({ emailFieldFocus: false })}
//                 onChangeText={email => this.setState({ email })}
//                 onSubmitEditing={event => {
//                   Keyboard.dismiss();
//                 }}
//               />
//             </View>
//             <View style={{ height: 32 }} />
//           {this.renderButton('CONTINUE',false,false,colors.primary,16)}
//           <View style={{ height: 20 }} />
//         </ScrollView>
//       </View>
//     );
//   }
// }

// export default EnterEmail;
