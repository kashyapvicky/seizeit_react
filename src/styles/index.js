
import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native";
const { width, height } = Dimensions.get('window')
import { fonts, colors, lineHeight, fontSizes, fontWeights, screenDimensions } from '../utilities/contsants'
import fontsCustom from "../utilities/config/font";
import colorsCustom from "../utilities/config/colors";
import {normalize} from '../utilities/helpers/normalizeText'
export default container = StyleSheet.create({
    text: {
        ...Platform.select({
          android: {
            ...fontsCustom.android.regular
          },
          ios: {
            ...fontsCustom.ios.regular
          }
        }),
      },
      bold: {
        ...Platform.select({
          android: {
            ...fontsCustom.android.regular
          },
          ios: {
            ...fontsCustom.android.regular
          }
        }),
        color: colorsCustom.black,
        fontWeight: "bold",
        fontSize:normalize(16)
      
      },
      shadow: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.12,
        shadowRadius: 5,
        elevation:0.5
      },

    AndroidSafeArea: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    container: {
        flex: 1,
    },
    pLable :{
color:'rgba(0,0,0,0.56)',
fontSize:normalize(15),
lineHeight:24,

    },
    subLable :{
        color:'#000000',
        fontSize:normalize(16),
        lineHeight:24,
    },
    tabIcon: {
        height: 25,
        width: 25,
        // color: ''
    },
    searchProInput:{
        height: 40,
        textAlign: "left",
        fontFamily: fonts.sourcesanspro,
        color: "#000000",
        fontSize:normalize(18)
      },
    homeShadowView:{
        backgroundColor: "#FFFFFF",
        flex: 0.32,
        shadowRadius: 1,
        shadowOpacity:0.12,
        shadowOffset: {
          width: 0,
          height: 2
        },
        elevation:0.2,
        paddingTop:16,
         paddingBottom: 16
      },
    textInputStyle:{height:40,fontSize:normalize(16),color:'#000000'},
    rowWithSpaceBetween:{ flexDirection: "row",justifyContent:'space-between', },
    orderInfoLabel:{ color: "#000000", lineHeight: 24, fontSize: normalize(12),letterSpacing:0.5,fontWeight:'600' },
    totalProduct:{ color: "#6B7580", fontSize: normalize(14) },
    searchView:{flexDirection:'row',
    borderRadius:20,
    height:40,
    backgroundColor:'rgba(150,197,15,0.05)',marginHorizontal:16},
    sliderOne: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    homeLogo: { alignItems: 'center', flex:1,},
    homelogo2: { alignItems: 'center', marginTop: screenDimensions.height / 10, },
    hoemBottomView: { marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' },
    bottomStyle: {  justifyContent: 'flex-end', marginBottom: 20,marginTop:20 },
    backButtonImage: {
        // marginHorizontal: 20,
        paddingTop: 20
    },
    activityLevel: {
        color: 'white',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        fontWeight: 'bold',
        lineHeight: lineHeight.normal,
    },
    orderNumberStyle: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        fontWeight: 'bold',
        lineHeight: lineHeight.extraLarge,
        // textAlign: 'center'
    },

    orderNumberStyle2: {
        color: '#A7A9AC',
        fontFamily: fonts.sourcesanspro,
        fontSize: 14,
        // fontWeight:'bold',
        lineHeight: lineHeight.medium,
        // textAlign: 'center'
    },
    forgotPassView: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    forgotPassView2: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    orView: {
        flexDirection: 'row',
        // flex:1,
        // marginHorizontal: 20,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    dontHaveAnAccountView: {
        // marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    continueButton: {
        justifyContent: 'flex-end',
        marginBottom: 20
    },
    signInAgreeView: {
        // marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    unlock: {
        color: 'black',
        fontSize: 18,
        lineHeight: 24,
        fontFamily: fonts.sourcesanspro,
        fontWeight:'bold'
    },
    unlock2: {
        color: 'black',
        fontSize: 12,
        lineHeight: 20,
        textAlign:'center',
        fontFamily: fonts.sourcesanspro
    },
    firstNameLastNameView: { flexDirection: 'row', justifyContent: 'space-between' },
    mainModalView: {
        flex: 1,
        backgroundColor: 'white'
    },
    modalBottomContent: {
        backgroundColor: "#FFFFFF",
        // height: height / 640 * 195,
        // justifyContent: 'center',
        // alignItems: 'center',
        borderRadius: 4,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderColor: "rgba(0, 0, 0, 0.1)"
      },
      bottomModal: {
        backgroundColor: "rgba(52, 52, 52, 0.8)",
        justifyContent: "flex-end",
        margin: 0,
        zIndex: 100,
        shadowOffset: { width: 0, height: 1 },
        shadowColor: "rgba(0,0,0,0.11)",
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 1
      },
    buttonStyle: {
        marginHorizontal: 20,

        // borderColor: '#F6871C',
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        // alignItems: 'center',
        flexDirection: 'row',

    },
    buttonStyle4: {
        // marginHorizontal: 10,

        // borderColor: '#F6871C',
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        // alignItems: 'center',
        flexDirection: 'row',

    },

    buttonStylefacebok: {
        marginHorizontal: 20,
        // borderColor: '#F6871C',
        borderWidth: 1,
        borderRadius: 4,
        // justifyContent: 'center',
        // alignItems: 'center',
        flexDirection: 'row',
    },
    modalCloseView: {
        marginHorizontal: 20,
        marginTop: 30,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    modalIllustrationView: { paddingTop: 50, justifyContent: 'center', alignItems: 'center' },
    requestSubmittedView: {
        marginHorizontal: 20,
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    requestSubmittedViewMessage: { marginHorizontal: 40, paddingTop: 30, justifyContent: 'center', alignItems: 'center' },
    buttonStyle3: {
        marginHorizontal: 2,
        width: screenDimensions.width / 4 + 10,
        // borderColor: '#F6871C',
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

    },
    buttonStyle2: {
        marginHorizontal: 20,
        // borderColor: '#F6871C',
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    becomePartner: {
        color: colorsCustom.primary,
        fontSize:normalize(16)
    },
    whatisPetPartner: {
        color: colorsCustom.primary,
        fontSize:normalize(16)
    },
    loginText: {
        color: '#000000',
        fontSize:normalize(24)
    },
    viewTextStyle: {
        backgroundColor: 'white',

        // height:40,
        borderWidth: 1,
        borderRadius: 5

    },
    viewcardTextStyle : {
        backgroundColor: '#F9F8F8',
         height:40,
        borderWidth: 0,
        borderRadius: 4
    },
    addProductTextInputView:{
        backgroundColor: '#FFFFFF',
        height:48,
       borderWidth: 1,
       borderRadius: 4
    },
    addProductTextInputStyle :{
        height:48,
        fontSize:normalize(18)
    },
    requestSubmited: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.medium,
        lineHeight: lineHeight.extraLarge,
        fontWeight: fontWeights.bold
    },
    requestScreenMessage: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: lineHeight.large,
        textAlign: 'center'
        // fontWeight:fontWeights.bold
    },
    location: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: lineHeight.extraLarge,
        textAlign: 'center'
    },
    petDemand: {
        color: 'rgba(91,37,31,0.56)',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        lineHeight: lineHeight.extraLarge,
        // textAlign: 'center'
    },
    itemName: {
        color: colors.black,
        // fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        lineHeight: lineHeight.normal,
    },
    trending: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: lineHeight.extraLarge,
    },

    notificationTitle: {
        color:'#000000',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.medium,
        // lineHeight: lineHeight.extraLarge,
        fontWeight: fontWeights.bold
    },


    viewAll: {
        color: colors.appColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: 12,
        lineHeight: lineHeight.extraLarge,
        fontWeight: fontWeights.bold
    },
    clearAll: {
        color: '#FF4444',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        lineHeight: lineHeight.extraLarge,
        fontWeight: fontWeights.bold
    },
    productType: {
        color: colors.appColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: 12,
        lineHeight: lineHeight.normal,
        fontWeight: fontWeights.bold
    },
    briefInfo: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: lineHeight.extraLarge,
        // fontWeight:fontWeights.bold
    },
    title: {
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: lineHeight.extraLarge,
        textAlign: 'justify',
        fontWeight: fontWeights.bold
    },
    notificationMessage: {
        color: colors.black,
        fontFamily: fonts.sourcesanspro,
        fontSize: normalize(15),
        lineHeight: lineHeight.medium,
        textAlign: 'justify',

    },
    time: {
        color: 'rgba(0,0,0,0.56)',
        fontFamily: fonts.sourcesanspro,
        fontSize: normalize(13),
        lineHeight: lineHeight.normal,
        textAlign: 'right'
    },
    mobileNumberText: {
        color: '#000000',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        lineHeight: lineHeight.medium,

    },
    accountSetting: {
        color: '#000000',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.medium,
        lineHeight: lineHeight.extraLarge,
        fontWeight: fontWeights.bold
    },
    titleOneText: {
        color: 'rgba(0,0,0,0.56);',
        fontFamily: fonts.sourcesanspro,
        fontSize: 15,
        lineHeight: lineHeight.extraLarge,
        fontWeight: fontWeights.bold
    },


    titleTwoText: {
        color: '#000000',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: lineHeight.large,
        // fontWeight:fontWeights.bold
    },
    productTitle: {
        color: colors.black,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.medium,
        lineHeight: lineHeight.extraLarge,
    },
    productTitle2: {
        color: colors.lightfontColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        lineHeight: lineHeight.large,
    },
    resetTitle: {
        color:colorsCustom.primary,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        lineHeight: lineHeight.extraLarge,
        fontWeight: fontWeights.bold
    },
    labelTextStyle: {
        // fontFamily: fonts.sourcesanspro,
        fontSize: normalize(16),
        // fontFamily: ...fontsCustom.android.regular
        // lineHeight: lineHeight.extraLarge,
    },
    labelHeading:{
        color:'#000000',
        fontSize: normalize(16),
    },
    productPrice: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.medium,
        fontWeight: fontWeights.bold,
        lineHeight: lineHeight.extraLarge,
    },

    quantity: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        // fontWeight: fontWeights.bold,
        lineHeight: lineHeight.extraLarge,
    },

    filterButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: screenDimensions.height - 100,
        bottom: 0
    },
    filterButton2: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: screenDimensions.height - 120,
        bottom: 0
    },
    filterText: {
        color: '#455F6C',
        fontFamily: fonts.sourcesanspro,
        fontSize: 16,
        // fontWeight: fontWeights.bold,
        lineHeight: lineHeight.normal,
    },
    shortByPrice: {
        color: '#000000',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.medium,
        fontWeight: fontWeights.bold,
        lineHeight: lineHeight.extraLarge,
    },
    range: {
        color: '#000000',
        fontFamily: fonts.sourcesanspro,
        fontSize: normalize(16),
        lineHeight: 32,
    },
    quantityText: {
        color: '#4A4A4A',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        lineHeight: lineHeight.normal,
        fontWeight: fontWeights.bold,
    },
    previousText: {
        color: 'rgba(91,37,31,0.56)',
        fontFamily: fonts.sourcesanspro,
        fontSize: 15,
        lineHeight: lineHeight.extraLarge,
        fontWeight: fontWeights.bold,
    },
    plusMinus: { paddingHorizontal: 5, paddingVertical: 5, backgroundColor: colors.appColor, alignItems: 'center', justifyContent: 'center' },
    searchText: {
        color: '#5B251F',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.medium,
        lineHeight: lineHeight.extraLarge,
    },

    proceedTocheckOut: {
        color: '#FFFFFF',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: lineHeight.large,
        fontWeight: fontWeights.bold
    },
    placeOrder: {
        color: '#FFFFFF',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: 32,
        fontWeight: fontWeights.bold
    },
    change: {
        color: '#F6871C',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        lineHeight: 24,
        fontWeight: 'bold'
    },
    profileLabel: {
        color: 'rgba(0,0,0,0.56)',
        fontFamily: fonts.sourcesanspro,
        fontSize: 15,
        lineHeight: lineHeight.extraLarge,
        fontWeight: 'bold'
    },
    profileInfo: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: lineHeight.large,
        // fontWeight: 'bold'
    },
    notes: {
        color: 'rgba(91,37,31,0.56)',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        lineHeight: lineHeight.extraLarge,
    },
    amountMoney: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: lineHeight.large,
    },
    address: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: lineHeight.large,
    },
    inputField: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: lineHeight.extraLarge,
    },
    foodType: {
        color: colors.appColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: lineHeight.normal,
        fontWeight: fontWeights.bold
    },
    productDescription: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.large,
        lineHeight: lineHeight.extraLarge,

    },
    productCost: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.title,
        lineHeight: lineHeight.extraLarge,
        fontWeight: fontWeights.bold
    },
    freeDelivery: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: lineHeight.extraLarge,
        // fontWeight:fontWeights.bold 
    },
    description: {
        color: 'rgba(91,37,31,0.56)',
        fontFamily: fonts.sourcesanspro,
        fontSize: 15,
        lineHeight: lineHeight.extraLarge,
        fontWeight: fontWeights.bold
    },
    detailproductDescription: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: lineHeight.large,
        // fontWeight:fontWeights.bold 
    },
    similarProductTextTitle: {
        color: colors.appColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: 12,
        lineHeight: lineHeight.normal,
        fontWeight: fontWeights.bold
    },
    leaveMessage: {
        color: colors.black,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: 24,
        textAlign: 'center'
    },
    contactText: {
        color: colors.black,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.medium,
        lineHeight: lineHeight.extraLarge,
        textAlign: 'left'
    },
    petImageView: {
        height: 112,
        width: 112,
        // borderWidth: 1,
        borderColor:colorsCustom.primary,
        borderRadius: 8,
        backgroundColor: 'transparent'
    },
    addImage: {
        color: colors.appColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: 13,
        lineHeight: 17,
        textAlign: 'center'
    },
    petName: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.medium,
        lineHeight: lineHeight.extraLarge,
        fontWeight: 'bold'

    },
    petAge: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.medium,
        lineHeight: lineHeight.extraLarge,

    },
    petTypeBreed: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        lineHeight: lineHeight.extraLarge,
    },
    cardNumber: {
        color: '#212121',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        lineHeight: lineHeight.normal,
    },
    cardBank: {
        color: '#212121',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.large,
        lineHeight: 32,
    },
    cardHolderName: {
        flex:0.6,
        color: '#212121',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: lineHeight.extraLarge,
    },
    cardHolderNameLabel: {
        color: 'rgba(33,33,33,0.25)',
        fontFamily: fonts.sourcesanspro,
        fontSize: 10,
        lineHeight: lineHeight.normal,
    },
    enterCVV: {
        color: '#F5F5F5',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        lineHeight: lineHeight.extraLarge,
        textAlign: 'center',
        paddingHorizontal:16,
    },
    topTextAddNewCard: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: lineHeight.large,

    },
    blog_title: {
        color: 'white',
        fontFamily: fonts.sourcesanspro,
        fontSize: normalize(20),
        lineHeight: 28,
        fontWeight: 'bold'
    },
    linearGradient: {
        flex: 1,
        // paddingLeft: 15,
        // paddingRight: 15,
        borderRadius: 5
      },
    blog_date: {
        color: 'rgba(0,0,0,0.56)',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        lineHeight: lineHeight.extraLarge,
    },
    blog_desc: {
        color: colors.black,
        fontFamily: fonts.sourcesanspro,
        fontSize: normalize(14),
        lineHeight: lineHeight.large,
    },
    listView: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        flex: 1
    },
    productStatus: {
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        fontWeight: 'bold',
        lineHeight: lineHeight.extraLarge,
    },
    customerInfo: {
        color: 'rgba(91,37,31,0.56)',
        fontFamily: fonts.sourcesanspro,
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: lineHeight.extraLarge,
    },
    profileName: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        fontWeight: 'bold',
        lineHeight: lineHeight.extraLarge,
    },
    transist: {
        color: colors.appColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.medium,
        fontWeight: 'bold',
        lineHeight: lineHeight.extraLarge,
    },
    expectedTobeDelieved: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        // fontWeight: 'bold',
        lineHeight: lineHeight.extraLarge,
    },
    statusCreatedDate: {
        color: 'rgba(91,37,31,0.56)',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        fontWeight: 'bold',
        lineHeight: lineHeight.extraLarge,
    },
    statusCreatedTime: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        // fontWeight: 'bold',
        lineHeight: lineHeight.extraLarge,
    },
    deliveryStatusLocation: {
        color: 'rgba(91,37,31,0.56)',
        fontFamily: fonts.sourcesanspro,
        fontSize: 12,
        // fontWeight: 'bold',
        lineHeight: lineHeight.extraLarge,
    },
    searchField: {
        color: 'rgba(91,37,31,0.56)',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        // fontWeight: 'bold',
        lineHeight: lineHeight.extraLarge,
    },
    customerName: {
        color: '#5B251F',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        fontWeight: 'bold',
        lineHeight: lineHeight.extraLarge,
    },
    customerContact: {
        color: '#5B251F',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        // fontWeight: 'bold',
        lineHeight: lineHeight.extraLarge,
    },
    customerAddress: {
        color: '#5B251F',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        // fontWeight: 'bold',
        lineHeight: lineHeight.large,
    },
    notesForCustomer: {
        color: 'rgba(91,37,31,0.56)',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        // fontWeight: 'bold',
        textAlign: 'justify',
        lineHeight: lineHeight.medium,
    },
    refer: {
        color: '#5B251F',
        fontFamily: fonts.sourcesanspro,
        fontSize: 15,
        lineHeight: lineHeight.normal,
    },
    forWhom: {
        color: '#353E40',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        lineHeight: lineHeight.extraLarge,
    },
    customerOrslef: {
        color: '#353E40',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: 56,
        textAlign: 'center'
    },
    editdeletpet: {
        color: '#353E40',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.large,
        lineHeight: 56,
        // fontWeight:'bold',
        textAlign: 'center'
    },
    orderAsService: {
        color: '#5B251F',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.medium,
        fontWeight: 'bold',
        lineHeight: lineHeight.extraLarge,
    },
    customerName: {
        color: '#5B251F',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        fontWeight: 'bold',
        lineHeight: lineHeight.extraLarge,
    },
    totalProfitOverSale: {
        color: '#000000',
        fontFamily: fonts.sourcesanspro,
        fontSize: normalize(16),
        // lineHeight: lineHeight.normal,
    },
    profitAndSale: {
        color: '#233138',
        fontFamily: fonts.sourcesanspro,
        fontSize: normalize(26),
        // lineHeight: 32,
    },
    saleandprofittext: {
        color: '#000000',
        fontFamily: fonts.sourcesanspro,
        fontSize: 14,
        lineHeight: lineHeight.extraLarge,
    },
    productSoldOn: {
        color: 'rgba(91,37,31,0.56)',
        fontFamily: fonts.sourcesanspro,
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: lineHeight.extraLarge,
    },
    headingPrice: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: 13,
        lineHeight: lineHeight.normal,
    },
    headingPriceValue: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: 16,
        fontWeight: fontWeights.bold,
        lineHeight: lineHeight.extraLarge,
    },
    forgetPassMessage: {
        color: colorsCustom.textColor,
        fontSize:fontSizes.normal
    },
    requetSubmitted: {
        marginTop: 10,
        color: colors.black,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.medium,
        fontWeight: fontWeights.bold,
        lineHeight: lineHeight.extraLarge,
        textAlign: 'center'
    },
    requestSubmitedMessage: {
        color: colors.black,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: lineHeight.large,
        textAlign: 'center'
    },
    moreDetail: {
        color: '#455F6C',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: lineHeight.extraLarge,
        textAlign: 'center'
    },
    whentogetrefund: {
        color: colors.appColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        lineHeight: lineHeight.medium,
    },
    refundMessage: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.small,
        lineHeight: lineHeight.medium,
        // textAlign: 'center'
    },
    refundMessage2: {
        color: '#56840D',
        fontFamily: fonts.sourcesanspro,
        fontSize: fontSizes.normal,
        lineHeight: lineHeight.medium,
    },
    returnrecieved: {
        color: colors.titleColor,
        fontFamily: fonts.sourcesanspro,
        fontSize: 12,
        lineHeight: lineHeight.extraLarge,
    },
    modalView2: {
        flex: 1,
        paddingTop: Platform.OS == 'ios' ? 20 : 10,
    },
    modalViewInside: {
        marginTop: Platform.OS == 'ios' ? 20 : 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    resetView: { alignItems: 'center', justifyContent: 'center', },
    trendingProductsView: {
        paddingHorizontal: 20,
        marginTop: 60,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardViewStyle: {
        alignItems: 'center',
        height: 176,
        width: screenDimensions.width - 20
    },
    cardMainView: {
        alignItems: 'center',
        // paddingTop: 20,
        height: 176,
        paddingBottom: 5,
        paddingHorizontal:16,
        backgroundColor: 'white'
    },
    bottomLine: {
        // borderRadius: 1,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1.0,
        shadowRadius: 2,
        height: 1,
        elevation: 1,
    },
    petItemCategoryView: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        alignItems: 'center'

    },
    searchFieldView: {
        // paddingHorizontal: 20,
        // paddingBottom: 10,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // marginTop: 10,

    },
    locationView: { flexDirection: 'row', alignItems: 'center' },
    headerViewHome: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,

    },
    previousandRecentSearchline: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(91,37,31,0.12)',
        marginTop: 10
    },
    imageViewAllProducts: {
        height: screenDimensions.width / 2 - 30,
        width: screenDimensions.width / 2 - 30
    },

    cardViewAllProducts: { height: screenDimensions.width / 2 - 40, width: screenDimensions.width / 2 - 40 },

    mainViewAllProducts: { paddingHorizontal: 10, marginVertical: 10, width: screenDimensions.width / 2 - 20 },

    bannerImages: {
        width: screenDimensions.width, height: screenDimensions.height / 4
    },

    showAllPetProductsView: { flex: 1,  },

    topHeaderProductLiting: {
        marginTop: 15,
        paddingHorizontal: 20,
        marginBottom: 10,
        flexDirection: 'row',
    },
    titleView: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 20
    },

    titleSearchView: {
        alignItems: 'flex-end',
        // justifyContent: 'flex-end',
        // marginLeft: 20
    },

    cardViewFilters: {
        backgroundColor: 'white',
        height: 40,
        width: 104,
        alignItems: 'center',
        justifyContent: "center"
    },
    filterDotView: { marginLeft: 5, backgroundColor: '#F6871C', height: 6, width: 6, borderRadius: 3 },

    filtersView: { alignItems: 'center', justifyContent: 'center', marginLeft: 20 },

    filterModalView: {
        marginTop: Platform.OS == 'ios' ? 20 : 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    filterModalViewTop: { flex: 1, paddingTop: Platform.OS == 'ios' ? 20 : 10, },

    customButtonStyleApply: {
        marginHorizontal: screenDimensions.width / 3,
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    addToCart: {

        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: colors.appColor
    },
    noDataFoundCenter: { justifyContent: 'center', alignItems: 'center', flex: 1 },

    topOfProductDetail: { flex: 1, paddingTop: 10, backgroundColor: 'white' },

    bottomSpaceProfile: { height: 8, backgroundColor: 'white', marginVertical: 20, },

    bottomSpace2: { height: 8, backgroundColor: '#F5F8FA', marginVertical: 20, },

    profileView: { marginTop: 40, paddingHorizontal: 30, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' },

    contactUsView: { paddingVertical: 15, borderBottomColor: 'rgba(91,37,31,0.09)', borderBottomWidth: StyleSheet.hairlineWidth },

    selectAddresBtnView: {

        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: colors.appColor,
        marginHorizontal: 20,
        marginVertical: 20
    },
    submitView: { alignItems: 'center', justifyContent: 'center' },

    selectAddressForPickup: { justifyContent: 'space-between', flexDirection: 'row' },

    selectAddress: { alignItems: 'center', justifyContent: 'center', marginLeft: 20 },

    profitProducts: {
        flexDirection: 'row',
        marginVertical: 20,
        marginHorizontal: 20,
    },
    orderDetailView: { justifyContent: 'center', alignItems: 'center' },

    containerStyleforProfit: { width: screenDimensions.width / 3, paddingHorizontal: 5 },

    mainviewOrderDetail: { flexDirection: 'row', justifyContent: 'space-between' },

    totalProfitOverSales: { marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' },

    borderSalesReport: { height: 8, backgroundColor: '#F5F8FA', marginVertical: 5, marginVertical: 10 },

    totalProfiTotalSale: { marginTop: 20, 
        marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' },

    totalprofitView: { marginHorizontal: 20,paddingTop:10 },

    salesReportView: { alignItems: 'center', justifyContent: 'center', marginLeft: 20 },

    topHeaderSales: { marginTop: 15, paddingHorizontal: 30, marginBottom: 10, flexDirection: 'row', },

    requestViewMain: { flex: 1, paddingTop: 20, backgroundColor: 'white' },

    requestSubmittedView2: { marginHorizontal: 20, justifyContent: 'center', alignItems: 'center' },

    topViewCardSection: { marginTop: Platform.OS == 'ios' ? 20 : 20, paddingHorizontal: 20, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' },

    topViewCard: { flex: 1, paddingTop: Platform.OS == 'ios' ? 20 : 20, },

    cardTitileView: { alignItems: 'center', justifyContent: 'center', marginLeft: 20 },

    addNewView: { alignItems: 'center', justifyContent: 'center', },

    bottomLineCardScreen: { height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(91,37,31,0.12)' },

    flatliStCardView: { padding: 10, marginBottom: 20, borderColor: '#E7E7E7', borderRadius: 8, borderWidth: 1 },

    enterCVV: { flex: 0.3, paddingHorizontal: 10, backgroundColor: '#F5F5F5', borderRadius: 4, alignItems: 'center', justifyContent: 'center', },

    cardHolderAndCvvView: { flex: 1, justifyContent: 'space-between', flexDirection: 'row', marginTop: 30 },

    cardHolderName: { alignItems: 'flex-start', flex: 0.8, },

    bankInfoView: { flex:1, justifyContent: 'space-between', flexDirection: 'row',paddingHorizontal:8 },

    cardImage: { flex: 0.3, alignItems: 'center',},

    BanknamaAndNumber: { alignItems: 'flex-start', flex: 0.9, },

    cardImageView: { alignItems: 'center', flex: 0.1, justifyContent: 'center' },

    flatliStCardViewMain: {flex:1, flexDirection: 'row', justifyContent: 'space-between',marginTop:16 },

    OrderSuccessFullViewTitleMessge: {
        flex:1,
         marginHorizontal: 20, marginTop: 25, justifyContent: 'center', alignItems: 'center' },

    mainViewOrderSuccess: { flex: 1, paddingTop: 20, backgroundColor: 'white' },

    orderAsSaleView: { paddingHorizontal: 30, marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' },

    orderAsServiceView: { paddingHorizontal: 30, marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' },

    borderBottom: { height: 1, backgroundColor: '#F5F8FA', marginVertical: 5, },

    ordertitle: { alignItems: 'center', justifyContent: 'center', marginLeft: 20 },

    orderHeaderView: { marginTop: 15, paddingHorizontal: 30, marginBottom: 10, flexDirection: 'row', },

    orderForPetMainView: { flex: 1, paddingTop: 20, backgroundColor: 'white' },

    orderAsServiceViewFlat: {
        flexDirection: 'row',
        marginVertical: 20,
    },

    orderAsServiceViewFlatFirstSection: { flex: 0.3, paddingLeft: 2, flexWrap: 'wrap' },

    mainViewNotifications: { flex: 1, paddingTop: 20, paddingHorizontal: 20 },

    notificationHeaderView: { marginTop: 20, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' },

    cardViewNotification: {
        // borderWidth: 1,
        // borderRadius: 10,
        // borderColor: '#ddd',
        // shadowColor: '#000',
        // shadowOffset: { width: 3, height: 2 },
        // shadowOpacity: 0.20,
        // shadowRadius: 5,
        // elevation: 0.5,
        // marginLeft: 5,
        // marginRight: 5,
        // marginTop: 10,
    },

    cardViewMainForNotification: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    notificationTimeView: { justifyContent: 'flex-end', alignItems: 'flex-end' },

    mainTopViewPet: { flex: 1, paddingTop: 20, backgroundColor: 'white' },

    mainTopViewMyCutomersmargin: { marginTop: Platform.OS == 'ios' ? 20 : 20, paddingHorizontal: 20, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' },

    mainTopViewPetmargin: { marginTop: Platform.OS == 'ios' ? 20 : 10, paddingHorizontal: 20, marginBottom: 10, flexDirection: 'row', },

    myPetTextView: { alignItems: 'center', justifyContent: 'center', marginLeft: 20 },

    addNewPetButtonView: {

        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: colors.appColor,
        marginHorizontal: 20,
        marginVertical: 20
    },

    addNewpetTextView: { alignItems: 'center', justifyContent: 'center' },

    petImagebackground: { //flex: 1,
        width: screenDimensions.width / 2 - 30,
        height: 112,
        position: 'absolute'
        // zIndex: -1,
        // backgroundColor:"red",
        // alignItems: 'flex-start',
        // justifyContent: 'flex-end'
    },


    petImagebackground2: { //flex: 1,
        width: screenDimensions.width / 2 - 30,
        height: 112,
        // position:'absolute',
        // zIndex: -1,
        // backgroundColor:"red",
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    },


    petDetailView: { flexDirection: 'row', justifyContent: 'space-between' },

    allCustomersFlatlistView: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },

    imageViewCheckUncheck: { flex: 0.1, justifyContent: 'flex-end', alignItems: 'flex-end', },

    customersTextView: { alignItems: 'center', justifyContent: 'center', marginLeft: 20 },

    borderBottomMyCustomers: { height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(91,37,31,0.12)' },

    searchCustomerView: { backgroundColor: '#F9F8F8', borderRadius: 4, marginHorizontal: 10, marginTop: 20, flexDirection: 'row' },

    searchImageView: { flex: 0.1, justifyContent: 'center', alignItems: 'center' },

    selectAndProceddButton: {

        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: colors.appColor,
        marginHorizontal: 20,
        marginVertical: 20
    },

    topHeaderViewInTransist: { marginTop: 15, paddingHorizontal: 30, marginBottom: 10, flexDirection: 'row', },

    ordersTextView: { alignItems: 'center', justifyContent: 'center', marginLeft: 20 },

    borderBottomInTrans: { height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(91,37,31,0.12)' },

    customerInfoView: { marginTop: 20, justifyContent: 'space-between', flexDirection: 'row' },

    InTransistView: { height: 1, marginHorizontal: 20, backgroundColor: 'rgba(91,37,31,0.09)', marginTop: 10 },

    emailView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
        marginHorizontal: 20,
        backgroundColor:'white',
        borderColor: 'rgba(91,37,31,0.22)',
        // borderWidth: 1,
        borderRadius: 4,
        flex: 1,
    },

    emailViewImage: {
         flex: 0.2,
        bottom: 0,
        // left: -50,
        paddingTop:16,
        paddingLeft:8,
        paddingRight:24,
        paddingBottom:8,
        overflow:'hidden',
         backgroundColor: colorsCustom.primary,
         justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 120,
        borderBottomLeftRadius: 4,

        position: 'absolute',
        // zIndex:-1000
    },

    emailView2: { flex: 0.8, paddingLeft: 10, paddingVertical: 20, },

    phoneView: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
        marginHorizontal: 20,
        backgroundColor:'white',
        borderColor: 'rgba(91,37,31,0.22)',
        // borderWidth: 1,
        borderRadius: 4,
        flex: 1,
    },

    phoneViewImage: {
        flex: 0.2,
        bottom: 0,
        // left: -50,
        paddingTop:16,
        paddingLeft:8,
        paddingRight:32,
        paddingBottom:8,
        overflow:'hidden',
         backgroundColor: colorsCustom.primary,
         justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 120,
        position: 'absolute',
    },

    phoneView2: { flex: 0.8, paddingLeft: 10, paddingVertical: 20, },

    modal: {
        zIndex: 100,
        width: screenDimensions.width / 2,
        position: 'absolute',
        top: 20,
        marginHorizontal: 16,
        right: 0,
        borderRadius: 2,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
    },
    buttonText: {
        color: colors.black,
        fontSize: fontSizes.normal,
        fontWeight: 'bold',
        lineHeight: 24,
    },
    button: {
        // backgroundColor: 'green',
        alignItems: 'flex-start',
        marginHorizontal: 5,
        justifyContent: 'flex-start',
        paddingVertical: 5,

    },

    floatingActionsView: { justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' },
    floatingItemsText: { borderRadius: 5, backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 10 },

    floatingText: { color: 'black', fontFamily: fonts.sourcesanspro },
    floatingItemImageView: { height: 40, width: 40, borderRadius: 20, backgroundColor: '#E36C09', alignItems: 'center', marginLeft: 15, justifyContent: 'center' }










});