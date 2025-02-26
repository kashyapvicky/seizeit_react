import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback
} from "react-native";
// import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import {postRequest,getRequest} from '../../redux/request/Service'

import ToggleSwitch from "toggle-switch-react-native";
//local imports
import Button from "../../components/Button";
import ImageSelectPickerModal from '../Settings/Templates/ImageSelectPicker'
import ImagePicker from 'react-native-image-crop-picker';

import Text from "../../components/Text";
import styles from "../../styles";
import Header from "../../components/Header";
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images } from "../../utilities/contsants";
import { screenDimensions } from "../../utilities/contsants";
import Validation from "../../utilities/validations";
import {sizeStatus} from '../../utilities/method'

import { normalize } from "../../utilities/helpers/normalizeText";
import TextInputComponent from "../../components/TextInput";
import DropDownList from "../../components/DropDownList";
const rightIcon=require('../../assets/images/ic_dd_g.png')

let initalSetDropdownState = {
  openDropDownCat: false,
  openDropDownProductPrice: false,
  openDropDownProductSize: false,
  openDropDownSubCat: false,
  openDropDownBrand:false,
};
class AddNewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountNumber: "",
      confirmAccountNumber: "",
      ifscNumber: "",
      productCategory: "",
      productBrand:"",
      productSubCategory: "",
      sizes:[
        {
        id:1,
        name:'X',
      },{
        id:2,
        name:'M',
    
      },{
        id:3,
        name:'XL',
      },
      {
        id:4,
        name:'XXL',
      }],
      brands:[],
      isModalVisible:false,
      productSize: "",
      noOfTimeUsed: "",
      name: "",
      loader: false,
      productImages:[{
        image :require('../../assets/images/ic_camera_c.png'),
        type:'add'
      }],
      categories:[],
      noOfTimeUsedList:[{
        id:1,
        name:'Once'
      },{
        id:1,
        name:'Two'
      },{
        id:1,
        name:'Three'
      }],
      subcategories:[],
      securePassword: true,
      visible: false,
      refreshToken: null,
      openDropDown: false
    };
  }
 
  noOfTimeUsedStatus = (status) =>{
    switch(status){
      case 1 :
      return {
        id:1,
        name:'Once'
      }
      case 2 :
      return  {
        id:1,
        name:'Two'
      }
      case 3 :
       return   {
        id:1,
        name:'Three'
      }
       default:
       return {
        id:1,
        name:'Once'
      }
    }
  }
  componentDidMount(){
    let {params} = this.props.navigation.state
    if(params && params.selectedProduct){
      let {selectedProduct} = params
      this.setProductData(selectedProduct)
    }
    this.getCategories()
    this.getBrands()
  }

  setProductData=(selectedProduct)=>{
    let {lang} = this.props.screenProps.user
    debugger  
    this.setState({
      productCategory:{name:(lang == 'ar') ?selectedProduct.category.arabic_name : selectedProduct.category.name,
      category_id:selectedProduct.category_id},
      productSubCategory:{name:(lang == 'ar') ?selectedProduct.subcategory.arabic_name :  selectedProduct.subcategory.name,
      id:selectedProduct.subcategory_id},
      productDes:selectedProduct.description,
      productPrice:`${selectedProduct.price}`,
      productBrand:selectedProduct.brand,
      isOnAvailSale:selectedProduct.available,
      isSoldOut:selectedProduct.sold_out,
      noOfTimeUsed:this.noOfTimeUsedStatus(selectedProduct.times),
      productSize:sizeStatus(selectedProduct.size_id),
      productTitle:selectedProduct.product_title,
      product_id:selectedProduct.id
    })
    if(selectedProduct.pics && selectedProduct.pics.length > 0){
      let newImages = selectedProduct.pics.map((x) =>{
          return {
            uri:x.pic,
            remoteUrl:true
          }
        })
        this.setState({
          productImages : [...newImages,...this.state.productImages]
        })
    }
  }
/*****************  Api Function  *************/
  getSubCategories = (category_id)=>{
    let {setIndicator} = this.props.screenProps.actions
    let {lang} = this.props.screenProps.user

    let data ={}
    data['category_id'] = category_id
    postRequest('user/getsubcategory',data).then((res) => {  
      console.log(res.success,"res.success")
      if(res && res.success && res.success.length > 0){
        this.setState({
          subcategories:res.success.map(x=> ({...x,name :( lang == 'ar') ?x.arabic_name : x.name  })),

          productSubCategory:''
        })
      }   
      setIndicator(false)
    }).catch((err) => {
    })
  }
  getBrands = ()=>{
    let {setIndicator} = this.props.screenProps.actions
    let data ={}
    let {lang} = this.props.screenProps.user
    getRequest('order/get_brands').then((res) => {  
      if(res && res.success && res.success.length > 0){
        this.setState({
          brands : res.success.map(x=> ({...x,name :( lang == 'ar') ?x.arabic_name : x.name  })),
        })
      }   
      setIndicator(false)
    }).catch((err) => {
    })
  }
  getCategories = ()=>{
    let {setIndicator} = this.props.screenProps.actions
    let {lang} = this.props.screenProps.user
    getRequest('user/fetchcategory').then((res) => {  
      if(res && res.success && res.success.length > 0){
        console.log(res.success,"catrrr")
        this.setState({
          categories : res.success.map(x=> ({...x,name :( lang == 'ar') ?x.arabic_name : x.name  }))
        })
      }   
      setIndicator(false)
    }).catch((err) => {
    })
  }
  selectCategory =(item)=>{
    this.setState({
      productCategory:item,
      openDropDownCat:false
    },() =>{
      this.getSubCategories(item.category_id)
    })
  }
  selectBrand = (item) =>{
    this.setState({
        productBrand:item,
        openDropDownBrand:false
    })
  }
  addProduct = ()=>{
    let {setToastMessage} = this.props.screenProps.actions
    let {toastRef} = this.props.screenProps
    let { productCategory, productSubCategory,productTitle,productSize,productBrand,
      productImages,
      productDes, noOfTimeUsed,productPrice,isOnAvailSale,isSoldOut} = this.state;
    let validation = Validation.validate(this.ValidationRules());
    if (validation.length != 0) {
        setToastMessage(true,colors.danger)
        return toastRef.show(validation[0].message)
    }else{
      let formData = new FormData();
      debugger
      formData.append("product_category", productCategory.category_id);
      formData.append("product_subcategory",productSubCategory.id);
      formData.append('brand_id',productBrand.id)
      formData.append("title", productTitle);
      formData.append("description", productDes);
      formData.append("size",productSize.id);
      formData.append("times",noOfTimeUsed.id);
      formData.append("price",productPrice);
      formData.append("for_sale",isOnAvailSale ? 1 : 0);
      formData.append("sold_out",isSoldOut ? 1 : 0);
      if (productImages && productImages.length > 0) {
        let newImages = productImages.filter(x=> x.type && x.type != 'add')
        debugger
        let myArr = newImages;
        for (var i = 0; i < myArr.length; i++) {
          formData.append(`image[${i}]`, myArr[i]);
        }
      }
      postRequest('vendor/AddProduct',formData).then((res) => {
        if (res && res.success) {
          setToastMessage(true,colors.green1)
          toastRef.show(res.success) 
          let {params} = this.props.navigation.state
          params.getProducts()
          this.props.navigation.goBack()
        }
       })
    }
  }
  updateProduct = ()=>{
    debugger
    let {setToastMessage} = this.props.screenProps.actions
    let {toastRef} = this.props.screenProps
    let { productCategory, productSubCategory,productTitle,productSize,productBrand,
      productImages,
      productDes, noOfTimeUsed,productPrice,isOnAvailSale,isSoldOut} = this.state;
    let validation = Validation.validate(this.ValidationRules());
    if (validation.length != 0) {
        setToastMessage(true,colors.danger)
        return toastRef.show(validation[0].message)
    }else{
      let formData = new FormData();
      debugger
      formData.append("product_id", this.state.product_id);
      formData.append('brand_id',productBrand.id)
      formData.append("product_category", productCategory.category_id);
      formData.append("product_subcategory",productSubCategory.id);
      formData.append("title", productTitle);
      formData.append("description", productDes);
      formData.append("size",productSize.id);
      formData.append("times",noOfTimeUsed.id);
      formData.append("price",productPrice);
      formData.append("for_sale",isOnAvailSale ? 1 : 0);
      formData.append("sold_out",isSoldOut ? 1 : 0);
      if (productImages && productImages.length > 0) {
        let newImages = productImages.filter(x=> x.type && x.type != 'add' && !x.remoteUrl)
        debugger
        let myArr = newImages;
        for (var i = 0; i < myArr.length; i++) {
          formData.append(`image[${i}]`, myArr[i]);
        }
      }
      postRequest('vendor/updateProducts',formData).then((res) => {
        if (res && res.success) {
          setToastMessage(true,colors.green1)
          toastRef.show(res.success) 
          let {params} = this.props.navigation.state
          params.getProducts()
          this.props.navigation.goBack()
        }
       })
    }
  }
  pressButton = (title)=>{
    debugger
    if(title =='AddProduct'){
        this.addProduct()
    }else if(title =='UpdateProduct'){
        this.updateProduct()
    }
  }
/*****************  Validation  *************/
ValidationRules = () => {
  let { productCategory, productSubCategory,productBrand,productTitle,productSize,
  productDes, noOfTimeUsed,productPrice} = this.state;
  let { lang } = this.props.screenProps.user;
  debugger;
  return [
    {
      field: productCategory.name,
      name: string('Category'),
      rules: "required",
      lang: lang
    },
    {
      field: productSubCategory.name,
      name: string('Sub Category'),
      rules: "required",
      lang: lang
    },
    {
      field: productBrand.name,
      name: string('Product Brand'),
      rules: "required",
      lang: lang
    },
    {
      field: productTitle,
      name: string('Product Title'),
      rules: "required|no_space",
      lang: lang
    },
    {
      field: productDes,
      name: string('Product Description'),
      rules: "required|no_space",
      lang: lang
    },
    {
      field: productSize.name,
      name: string('Product Size'),
      rules: "required",
      lang: lang
    },
    {
      field: noOfTimeUsed.name,
      name: string('Used time'),
      rules: "required",
      lang: lang
    },
    {
      field: productPrice,
      name: string('Product price'),
      rules: "required|numeric",
      lang: lang
    }
  ];
};
  renderButton = (title, transparent,action) => {
    return (
      <Button
        buttonStyle={{
          height: 48,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 0,
          backgroundColor: transparent ? "transparent" : colors.primary
        }}
        fontSize={18}
        color={transparent ? colors.primary : "#FFFFFF"}
        onPress={() => this.pressButton(action)}
        title={title.toUpperCase()}
      />
    );
  };

  renderTopSection = () => {
    return (
      <View style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 16 }}>
        <View style={[styles.rowWithSpaceBetween]}>
          <Text
            p
            textAlign
            style={{
              color: "#000",
              alignSelf: "flex-start",
              fontSize: normalize(18)
            }}
          >
            {string("Available for sale")}
          </Text>
          <ToggleSwitch
            isOn={this.state.isOnAvailSale}
            onColor="#96C50F"
            offColor="rgba(0,0,0,0.12)"
            size="medium"
            onToggle={isOnAvailSale => {
              this.setState({ isOnAvailSale });
            }}
          />
        </View>
        <View style={{ height: 24 }} />
        <View style={[styles.rowWithSpaceBetween]}>
          <Text
            p
            textAlign
            style={{
              color: "#000",
              alignSelf: "flex-start",
              fontSize: normalize(18)
            }}
          >
            {string("Sold out")}
          </Text>
          <ToggleSwitch
            isOn={this.state.isSoldOut}
            onColor="#96C50F"
            offColor="rgba(0,0,0,0.12)"
            size="medium"
            onToggle={isSoldOut => {
              this.setState({ isSoldOut });
            }}
          />
        </View>
      </View>
    );
  };
  renderLabel = title => {
    return (
      <View style={{ paddingVertical: 8 }}>
        <Text
          p
          textAlign
          style={{
            color: "#000000",
            alignSelf: "flex-start",
            fontSize: normalize(18)
          }}
        >
          {title}
        </Text>
      </View>
    );
  };
  renderImages = ({item,index}) => {
    if(item.type == 'add'){
      return (
        <TouchableOpacity
        onPress={() => this.setState({
          isModalVisible:true
        })}
          style={[
            styles.shadow,
            {
              height:72,
              width: screenDimensions.width/4-16,
              marginTop:16,
              marginLeft:index%4 == 0 ? 0:8,
              alignSelf:'center',
              justifyContent:'center',
              shadowColor: "rgba(0,0,0)",
              shadowOpacity: 0.19,
              shadowRadius: 0.1,
              backgroundColor:'rgba(255,255,255,0.12)',
              borderColor:'rgba(74,86,108,0.12)',
              borderWidth:1
            }
          ]}
        >
          <Image
            style={{ height: 24, width: 24, borderRadius: 4,alignSelf:'center',
          }}
            source={item.image}
          />
        </TouchableOpacity>
      );
    }else{
      return (
        <View
          style={[
            styles.shadow,
            {
              marginTop:16,
              height:72,
              marginLeft:index%4 == 0 ? 0:8,
              width:screenDimensions.width/4-16,
              shadowColor: "rgba(0,0,0)",
              shadowOpacity: 0.19,
              shadowRadius: 0.1
            }
          ]}
        >
          <Image
            style={{ 
            height: 72, 
            width:'100%',
            borderRadius: 4 
           }}
            source={{
              uri:item.uri
            }}
          />
        </View>
      );
    }
   
  };

renderProductImgaes = () => {
    return (
      <FlatList
        bounces={true}
        numColumns={4}
        extraData={this.state}
        showsVerticalScrollIndicator={false}
        data={this.state.productImages}
        keyExtractor={(item, index) => index + "images"}
        renderItem={this.renderImages}
      />
    );
  };


/***************** Camera Function  *************/
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
  openImageLibrary = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400, 
      compressImageMaxHeight: 400,
      mediaType: "photo",
      compressImageMaxWidth: 400, cropping: true, multiple: true
    }).then(response => {
      this.closeModal()
      let array
      if(response && response.length > 0){
        this.setImagesArray(response)
      }
         
      })
    }
    setImagesArray = (response) =>{
      response.forEach((item,index) => {
        let textOrder = "";
        let possible = "dhsfkhkdshfkhdksjfsdf" + "mangal" + '_qazwsxedcvfrtgbnhyujmkiolp';
        for (let i = 0; i < 60; i++) {
            textOrder += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        let finalTextOrder = textOrder.replace(/\s/g, '')
        let image = {
          uri:item.path,
          name: finalTextOrder + '.jpg',
          type: 'multipart/form-data',
          id:index
        }
        array = this.state.productImages
        array.unshift(image)
      })
      this.setState({
        productImages :array
       })
    }
    launchCamera = () => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        this.closeModal()
        this.setImagesArray([image])
        // this.setState({ avatarSource: image.path ,clickEdit:true})

      }).catch((err) =>{
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
/***************** Camera Function  *************/

  render() {
    let {toastRef} = this.props.screenProps
    let {setToastMessage} = this.props.screenProps.actions
    let {params} =this.props.navigation.state
   let  buttonTitle=string('Addaproduct')
    let action='AddProduct'
    if(params && params.selectedProduct){
      buttonTitle=string('UpdateaProduct')
       action='UpdateProduct'

    }
    return (
   
        <View style={{ flex: 1 }}>
          <Header
            isRightIcon={Images.close_g}
            hideLeftIcon={true}
            headerStyle={[
              styles.shadow,
              {
                backgroundColor: "#FFFFFF",
                shadowRadius: 0.1
              }
            ]}
            title={buttonTitle}
            onRightPress={() => this.props.navigation.goBack()}
          />
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
         <TouchableWithoutFeedback
        onPress={() =>
          this.setState({
            ...this.state,
            ...initalSetDropdownState
          })
        }
      >
        <View>
        <View style={{ height: 16 }} />
            {this.renderTopSection()}
            <View style={styles.borderSalesReport} />
            <View
              style={{ marginTop: 10, paddingHorizontal: 24, paddingBottom: 8 }}
            >
              {this.renderLabel(string("Product Details"))}
              <TextInputComponent
                 pointerEvents="none"

                user={this.props.user}
                onPress={() =>
                  this.setState({
                    openDropDownCat: !this.state.openDropDownCat
                  })
                }
                selectItem={(item)=> this.selectCategory(item)}
                openDropDown={this.state.openDropDownCat}
                label={string("Product category")}
                editable={false}
                inputMenthod={input => {
                  this.productCateRef = input;
                }}
                // placeholder={'6985 9685 9452 6623'}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#96C50F"
                returnKeyType="next"
                lists={this.state.categories}
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                textInputStyle={[styles.addProductTextInputStyle]}
                viewTextStyle={styles.addProductTextInputView}
                value={this.state.productCategory.name}
                underlineColorAndroid="transparent"
                isFocused={this.state.productCatFieldFocus}
                onFocus={() => this.setState({ productCatFieldFocus: true })}
                onBlur={() => this.setState({ productCatFieldFocus: false })}
                //   onChangeText={productTitle => this.setState({ productTitle })}
                rightIcon={rightIcon}
                onSubmitEditing={event => {
                  this.productSubCateRef.focus();
                }}
              />
              <View style={{ height: 10 }} />
              <TextInputComponent
                user={this.props.user}
                pointerEvents="none"

                label={string("Sub Category")}
                
                inputMenthod={input => {
                  this.productSubCateRef = input;
                }}
                onPress={() =>{
                  if(this.state.productCategory){
                    this.setState({
                      openDropDownSubCat: !this.state.openDropDownSubCat,
                    })
                  }else{
                    setToastMessage(true,colors.danger)
                    return toastRef.show(string('Please select first category'),colors.danger)
                  }
                }
                }
                lists={this.state.subcategories}
                selectItem={(item)=> this.setState({
                  productSubCategory:item,
                  openDropDownSubCat:false
                })}
                openDropDown={this.state.openDropDownSubCat}
                editable={false}
                // placeholder={'6985 9685 9452 6623'}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                textInputStyle={[styles.addProductTextInputStyle]}
                viewTextStyle={styles.addProductTextInputView}
                value={this.state.productSubCategory.name}
                underlineColorAndroid="transparent"
                isFocused={this.state.productSubCatFieldFocus}
                onFocus={() => this.setState({ productSubCatFieldFocus: true })}
                onBlur={() => this.setState({ productSubCatFieldFocus: false })}
                //   onChangeText={productTitle => this.setState({ productTitle })}
                rightIcon={rightIcon}
                onSubmitEditing={event => {
                  this.productBrandRef.focus();
                }}
              />
              <View style={{ height: 10 }} />

              <TextInputComponent
                 pointerEvents="none"
                user={this.props.user}
                onPress={() =>
                  this.setState({
                    openDropDownBrand: !this.state.openDropDownBrand
                  })
                }
                selectItem={(item)=> this.selectBrand(item)}
                openDropDown={this.state.openDropDownBrand}
                label={string("Brand")}
                editable={false}
                inputMenthod={input => {
                  this.productBrandRef = input;
                }}
                // placeholder={'6985 9685 9452 6623'}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#96C50F"
                returnKeyType="next"
                lists={this.state.brands}
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                textInputStyle={[styles.addProductTextInputStyle]}
                viewTextStyle={styles.addProductTextInputView}
                value={this.state.productBrand.name}
                underlineColorAndroid="transparent"
                isFocused={this.state.productCatFieldFocus}
                onFocus={() => this.setState({ productCatFieldFocus: true })}
                onBlur={() => this.setState({ productCatFieldFocus: false })}
                //   onChangeText={productTitle => this.setState({ productTitle })}
                rightIcon={rightIcon}
                onSubmitEditing={event => {
                  this.productTitleRef.focus();
                }}
              />
              <View style={{ height: 10 }} />



              <TextInputComponent
                user={this.props.user}
                label={string("Product Title")}
                inputMenthod={input => {
                  this.productTitleRef = input;
                }}
                // placeholder={'6985 9685 9452 6623'}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                textInputStyle={[styles.addProductTextInputStyle]}
                viewTextStyle={styles.addProductTextInputView}
                value={this.state.productTitle}
                underlineColorAndroid="transparent"
                isFocused={this.state.productTitleFieldFocus}
                onFocus={() => this.setState({ productTitleFieldFocus: true })}
                onBlur={() => this.setState({ productTitleFieldFocus: false })}
                onChangeText={productTitle => this.setState({ productTitle })}
                onSubmitEditing={event => {
                  this.productDesRef.focus();
                }}
                // textInputStyle={styles.textInputStyle}
              />
              <View style={{ height: 10 }} />
              <TextInputComponent
                label={string("Product Description")}
                inputMenthod={input => {
                  this.productDesRef = input;
                }}
                // placeholder={'Vikram Bawa'}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                textInputStyle={[
                  styles.addProductTextInputStyle,
                  { height: 100 }
                ]}
                blurOnSubmit={false}
                multiline
                viewTextStyle={[styles.addProductTextInputView, { height: 100 }]}
                value={this.state.productDes}
                underlineColorAndroid="transparent"
                isFocused={this.state.productDesFieldFocus}
                onFocus={() => this.setState({ productDesFieldFocus: true })}
                onBlur={() => this.setState({ productDesFieldFocus: false })}
                onChangeText={productDes => this.setState({ productDes })}
                onSubmitEditing={event => {
                  this.productSizeRef.focus();
                }}
              />
              <View style={{ height: 10 }} />
              <TextInputComponent
                user={this.props.user}
                label={string("Size")}
                inputMenthod={input => {
                  this.productSizeRef = input;
                }}
                selectItem={(item)=> this.setState({
                  productSize:item,
                  openDropDownProductSize:false
                })}
                lists={this.state.sizes}
                editable={false}
                // placeholder={'6985 9685 9452 6623'}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#96C50F"
                pointerEvents="none"

                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                textInputStyle={[styles.addProductTextInputStyle]}
                viewTextStyle={styles.addProductTextInputView}
                value={this.state.productSize.name}
                underlineColorAndroid="transparent"
                rightIcon={rightIcon}
                onPress={() =>
                  this.setState({
                    openDropDownProductSize: !this.state.openDropDownProductSize
                  })
                }
                openDropDown={this.state.openDropDownProductSize}
                isFocused={this.state.productSizeFieldFocus}
                onFocus={() => this.setState({ productSizeFieldFocus: true })}
                onBlur={() => this.setState({ productSizeFieldFocus: false })}
                //   onChangeText={productTitle => this.setState({ productTitle })}
                onSubmitEditing={event => {
                  this.productNameOfTimeRef.focus();
                }}
                // textInputStyle={styles.textInputStyle}
              />
              <View style={{ height: 10 }} />
              <TextInputComponent
                user={this.props.user}
                label={string("noOfTimes")}
                inputMenthod={input => {
                  this.productNameOfTimeRef = input;
                }}
                selectItem={(item)=> this.setState({
                  noOfTimeUsed:item,
                  openDropDownProductPrice:false
                })}
                pointerEvents="none"

                lists={this.state.noOfTimeUsedList}
                editable={false}
                placeholder={string("in used time")}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#96C50F"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                textInputStyle={[styles.addProductTextInputStyle]}
                viewTextStyle={styles.addProductTextInputView}
                value={this.state.noOfTimeUsed.name}
                onPress={() =>
                  this.setState({
                    openDropDownProductPrice: !this.state
                      .openDropDownProductPrice
                  })
                }
                openDropDown={this.state.openDropDownProductPrice}
                underlineColorAndroid="transparent"
                rightIcon={rightIcon}
                isFocused={this.state.productPriceFieldFocus}
                onFocus={() => this.setState({ productPriceFieldFocus: true })}
                onBlur={() => this.setState({ productPriceFieldFocus: false })}
                //   onChangeText={productTitle => this.setState({ productTitle })}
                onSubmitEditing={event => {
                  this.productPriceRef.focus();
                }}
                // textInputStyle={styles.textInputStyle}
              />
                <View style={{ height: 10 }} />
              <TextInputComponent
                user={this.props.user}
                label={string("Price")}
                inputMenthod={input => {
                  this.productPriceRef = input;
                }}
                placeholder={`${string('in')} AED`}
                placeholderTextColor="rgba(62,62,62,0.55)"
                selectionColor="#96C50F"
                returnKeyType="done"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                textInputStyle={[styles.addProductTextInputStyle]}
                viewTextStyle={styles.addProductTextInputView}
                value={this.state.productPrice}
                underlineColorAndroid="transparent"
                isFocused={this.state.productPriceFieldFocus}
                onFocus={() => this.setState({ productPriceFieldFocus: true })}
                onBlur={() => this.setState({ productPriceFieldFocus: false })}
                onChangeText={productPrice => this.setState({ productPrice})}
                onSubmitEditing={event => {
                  Keyboard.dismiss();
                }}
                // textInputStyle={styles.textInputStyle}
              />
            </View>
            <View style={styles.borderSalesReport} />
            <View style={{ paddingHorizontal: 24 }}>
              {this.renderLabel(string("Product Images"))}
              <View style={{ height: 10 }} />
              {this.renderProductImgaes()}
            </View>
            <View style={{ height: 35 }} />
        </View>
        </TouchableWithoutFeedback>
           
          </ScrollView>
          {this.renderButton(buttonTitle,false,action)}
          {this.state.isModalVisible ? this.renderBottomModal() : null}

        </View>
    
    );
  }
}
export default AddNewProduct;
