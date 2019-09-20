import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Animated,
  Platform,
  Alert
} from "react-native";
import DeviceInfo from "react-native-device-info";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { postRequest,getRequest } from "../../redux/request/Service";
import ImagePicker from 'react-native-image-crop-picker';
import Permissions from 'react-native-permissions'
import Header from "../../components/Header";

import { Images } from "../../utilities/contsants";
import backButton from "../../assets/images/ic_back.png";
import TextInputComponent from "../../components/TextInput";
import CustomeButton from "../../components/Button";
import styles from "../../styles";
import Text from "../../components/Text";
import ImageSelectPickerModal from './Templates/ImageSelectPicker'
import { string } from "../../utilities/languages/i18n";
//Utilities
import Validation from "../../utilities/validations";
import colors from "../../utilities/config/colors";
import { normalize } from "../../utilities/helpers/normalizeText";

//Utilities
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  opacity: new Animated.Value(0),
  password: "",
  partnerId: "",
  avatarSource:'',
  firstNameFieldFocus: false,
  lastNameFieldFocus: false,
  emailFieldFocus: false,
  passwordFieldFocus: false,
  partnerIdFieldFocus: false,
  isModalVisible: false,
  loader: false,
  userImage: require("../../assets/images/profile.jpeg"),
  securePassword: true,
  visible: false
};
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.getUserInfo()
    this._checkCameraAndPhotos()

  }
  //Update profile 
  _checkCameraAndPhotos = () => {
    Permissions.checkMultiple(['camera', 'photo']).then(response => {
        //response is an object mapping type to permission
        this.setState({
            cameraPermission: response.camera,
            photoPermission: response.photo,
        })
    })
}
  // Get User Info
  getUserInfo = () =>{
    postRequest('user/user-details',{}).then((res) => {
            if (res) {
                    this.setState({
                        firstName:res.success.first_name,
                        lastName:res.success.last_name,
                        avatarSource:res.success.pic
                    })
            }
      })
  }

  //Form validations
  ValidationRules = () => {
    let { firstName, lastName } = this.state;
    let { lang } = this.props.screenProps.user;
    return [
      {
        field: firstName.trim(),
        name: string("firstname"),
        rules: "required",
        lang: lang
      },
      {
        field: lastName.trim(),
        name: string("lastName"),
        rules: "required",
        lang: lang
      }
    ];
  };
  //Update process
  pressButton = () => {
    let { netStatus, fcm_id } = this.props.screenProps.user;
    let { setToastMessage } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    let validation = Validation.validate(this.ValidationRules());
    if (validation.length != 0) {
      //this.setError(true,colors.danger)
      setToastMessage(true, colors.danger);
      return toastRef.show(validation[0].message);
    } else {
        let { firstName, lastName, email, password } = this.state;
        let { params } = this.props.navigation.state;
        let formData = new FormData()
        formData.append('first_name', firstName)
        formData.append('last_name', lastName)
        let file
        if (this.state.avatarSource && this.state.clickEdit) {
            let textOrder = "";
            let possible = "dhsfkhkdshfkhdksjfsdf" + "mangal" + '_qazwsxedcvfrtgbnhyujmkiolp';
            for (let i = 0; i < 60; i++) {
                textOrder += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            let finalTextOrder = textOrder.replace(/\s/g, '')
             file = {
                uri: this.state.avatarSource,
                name: finalTextOrder + '.jpg',
                type: 'multipart/form-data'
            }
            formData.append('image', file)
        }
        postRequest("user/update-profile", formData)
          .then(res => {
            debugger
            if (res) {
              toastRef.show(res.success,colors.textColor)
              this.props.navigation.goBack()
                params.getUserInfo()
            }
          })
          .catch(err => {
            debugger;
          });
      }
  };
  renderButton = (title, transparent, imageLeft, color, fontSize) => {
    return (
      <CustomeButton
        buttonStyle={{
          height: 48,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          borderColor: transparent ? "#EAEAEA" : "transparent",
          backgroundColor: transparent ? "transparent" : color
        }}
        imageSource={true}
        imageLeft={imageLeft}
        buttonTextStyle={{ fontWeight: imageLeft ? "normal" : "bold" }}
        imageLeftLocal={imageLeft}
        fontSize={normalize(fontSize)}
        color={transparent ? "#455F6C" : "#FFFFFF"}
        onPress={() => this.pressButton(title)}
        title={title.toUpperCase()}
      />
    );
  };

  openImageLibrary = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200, compressImageMaxHeight: 400,
      mediaType: "photo",
      compressImageMaxWidth: 400, cropping: true, multiple: false
    })
      .then(response => {
        let tempArray = []
        console.log("responseimage-------" + response)
        this.setState({ avatarSource: response.path ,clickEdit:true})
        this.closeModal()
        // response.forEach((item) => {
        //   let image = {
        //     uri: item.path,
        //     // width: item.width,
        //     // height: item.height,
        //   }
        //   console.log("imagpath==========" + image)
        //   tempArray.push(image)
        //   this.setState({ ImageSourceviewarray: tempArray })
        //   // console.log('savedimageuri====='+item.path);

        //   console.log("imagpath==========" + image)
        // })
      })
    }
    launchCamera = () => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        console.log(image);
        this.closeModal()
      }).catch((err) =>{
debugger
      })
      // ImagePicker.openCamera(this.options, (response) => {
      //     if (response.didCancel) {
      //         this.closeModal()
      //         console.log('User cancelled image picker');
      //     } else if (response.error) {
      //         this.closeModal()
      //         this.openPermissionModal()
      //     } else if (response.customButton) {
      //         console.log('User tapped custom button: ', response.customButton);
      //     } else {
      //         this.setState({
      //             avatarSource: response.uri,
      //             isModalVisible: false,
      //             clickEdit:true,
      //             isModalVisible:false
      //         })
      //     }
      //     this.closeModal()
      // });
  }
  // Open Permission Modal
  _requestPermission = () => {
    Permissions.request('camera').then(response => {
        // Returns once the user has chosen to 'allow' or to 'not allow' access
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        this.setState({ cameraPermission: response })
    })
}
  openPermissionModal = () => {
    return Alert.alert(
        'Allow Permissions',
        'You need to provide the permissions manually to access the feature..',
        [
            {
                text: 'No Way',
                onPress: () => console.log('Permission denied'),
                style: 'cancel',
            },
            this.state.cameraPermission == 'undetermined'
                ? { text: 'OK', onPress: this._requestPermission }
                : { text: 'Open Settings', onPress: Permissions.openSettings },
        ],
    )
}
onLoad = () => {
  Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 1000
  }).start();
}
renderProfileView = () => {
  //Show Images 
  let { avatarSource } = this.state;
  let {params} = this.props.navigation.state
  if (avatarSource) {
      return <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{
              height: 100, width: 100, borderRadius: 100 / 2,
              justifyContent: 'center', alignItems: 'center'
          }}
          onPress={() => this.setState({ isModalVisible: true })}>
          <Animated.Image
              loadingIndicatorSource={require('../../assets/images/profile_placeholder.png')}
              source={{ uri: avatarSource }}
              style={{
                  height: 100, width: 100, borderRadius: 100 / 2,
                  opacity: this.state.opacity
              }}
              onLoad={this.onLoad} />
             {
                 params && params.accountDetail ?
                 <View
                 style={{
                     height: 50, width: 50,
                     justifyContent: 'center', 
                     alignItems: 'center',
                     backgroundColor: colors.background,
                     position:'absolute',
                     bottom:0,right:0
                 }}
                 onPress={() => this.setState({ isModalVisible: true })}> 
                    <MaterialIcon name={'edit'} size={28} color={colors.primary}/>
                 </View>
                 :<Image source={require('../../assets/images/ic_cam.png')}
                 style={{ position: 'absolute', height: 16, width: 20 }} />
             }
      </TouchableOpacity>
  }
  else {
      return <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{
              height: 100, width: 100, borderRadius: 100 / 2,
              justifyContent: 'center', alignItems: 'center',
              backgroundColor: '#B0B4B8'
          }}
          onPress={() => this.setState({ isModalVisible: true })}>
          <Image source={require('../../assets/images/ic_cam.png')}
              style={{ position: 'absolute', height: 16, width: 20 }} />
      </TouchableOpacity>
  }
}
  // Profile View

  closeModal=() =>{
    this.setState({
      isModalVisible :false
    })
  }
  renderBottomModal = () =>{
    return <ImageSelectPickerModal   
    openImageLibrary={() => this.openImageLibrary()}
     launchCamera={()=> this.launchCamera()}
     closeModal ={() => this.closeModal()}
        isModalVisible={this.state.isModalVisible}
       />
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          isRightIcon={false}
          headerStyle={[
            styles.shadow,
            {
              backgroundColor: "#FFFFFF",
              shadowRadius: 0.1
            }
          ]}
          //   hideLeftIcon={true}
          title={"Edit Profile"}
          backPress={() => this.props.navigation.goBack()}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            paddingHorizontal: 24
          }}
        >
           <View style={{ height: 35 }} />
           <View style={{flex:0.25,alignSelf:'center'}}>
           {this.renderProfileView()}

           </View>
          <View style={{ height: 15 }} />
          <TextInputComponent
            // user={this.props.user}
            label={string("firstname")}
            inputMenthod={input => {
              this.firstNameField = input;
            }}
            // placeholder={string('Email')}
            placeholderTextColor="rgba(62,62,62,0.55)"
            selectionColor="#96C50F"
            returnKeyType="next"
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            viewTextStyle={styles.viewTextStyle}
            value={this.state.firstName}
            underlineColorAndroid="transparent"
            isFocused={this.state.firstNameFieldFocus}
            onFocus={() => this.setState({ firstNameFieldFocus: true })}
            onBlur={() => this.setState({ firstNameFieldFocus: false })}
            onChangeText={firstName => this.setState({ firstName })}
            onSubmitEditing={event => {
              this.lastNameField.focus();
            }}
          />
          <View style={{ height: 15 }} />
          <TextInputComponent
            label={string("lastName")}
            inputMenthod={input => {
              this.lastNameField = input;
            }}
            // placeholder={string('Password')}
            placeholderTextColor="rgba(62,62,62,0.55)"
            // secureTextEntry={this.state.securePassword}
            returnKeyType="done"
            keyboardType="default"
            autoCorrect={false}
            blurOnSubmit={false}
            autoCapitalize="none"
            value={this.state.lastName}
            viewTextStyle={styles.viewTextStyle}
        
            isFocused={this.state.lastNameFieldFocus}
            underlineColorAndroid="transparent"
            onFocus={() => this.setState({ lastNameFieldFocus: true })}
            onBlur={() => this.setState({ lastNameFieldFocus: false })}
            onChangeText={lastName => this.setState({ lastName })}
            onSubmitEditing={event => {
              Keyboard.dismiss()
            }}
          />
        </ScrollView>
        <View style={[styles.continueButton, { paddingHorizontal: 24 }]}>
          {this.renderButton("UPDATE", false, false, colors.primary, 16)}
          <View style={{ height: 30 }} />
        </View>
        {this.state.isModalVisible ? this.renderBottomModal() : null}

      </View>
    );
  }
}
export default EditProfile;
