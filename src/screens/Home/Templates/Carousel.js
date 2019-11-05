import React from "react";
import { TouchableOpacity,Dimensions, View, Image ,ImageBackground} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../utilities/config/colors";
import styles from "../../../styles";
import { Images } from "../../../utilities/contsants";
import Text from "../../../components/Text";
import { normalize } from "../../../utilities/helpers/normalizeText";
import {BannerPlaceholderComp} from "./BannerPlaceHolder";

const sliderWidth = Dimensions.get("window").width - 20;
const sliderHeight = Dimensions.get("window").height ;

const itemWidth = Dimensions.get("window").width - 24;
import Carousel, { Pagination } from 'react-native-snap-carousel';
export default class  BannerCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: 'Chandigarh',
            bannerImages: this.props.banners,
            imagewidth: '100%',
            imageheight: '100%',
            slider1ActiveSlide: 0,
           
        }
        this.loaderComponent = new Promise(resolve => {
            setTimeout(() => {
              resolve();
            }, 1000);
          });
    }
    
    bannerImagesData = ({ item, index }) => {
        return (
            <View index={index} style={[styles.shadow,{
               
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F5FCFF',
                position: 'relative',
                borderRadius:8,

            }]}>
                <ImageBackground
                    source={{uri:item.image}}
                    resizeMode={'stretch'}
                    imageStyle={{borderRadius:4}}
                    // style={[styles.bannerImages,{resizeMode:'cover'}]}
                    style={{
                        height: 176,
                        // borderRadius:4,
                        width:'100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                    }}
                >
                </ImageBackground>
            </View>
        )
    }
    render(){
        return <View style={styles.cardMainView}>
         <View
            style={[styles.cardViewStyle,styles.shadow,,{
                shadowRadius: 5,
                shadowOpacity:0.3,
                shadowOffset: {
                  width: 0,
                  height: 2
                },
                elevation:2,
            }]}>
                {
                    this.props.banners.length > 0 ? 
                    <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.props.banners}
                    renderItem={this.bannerImagesData}
                    autoplay={true}
                    loop={true}
                    autoplayInterval={3000}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
                /> : <BannerPlaceholderComp
                    loader={this.loaderComponent}
                 />
                }
         
        </View>
        <Pagination
            dotsLength={this.props.banners.length}
            activeDotIndex={this.state.slider1ActiveSlide}
            containerStyle={{ paddingTop: 20 }}
            dotColor={'#96C50F'}
            dotStyle={{ height: 12, width: 12, borderRadius: 12 / 2 }}
            inactiveDotColor={'black'}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.8}
    
        />
    </View>
    }
    
}