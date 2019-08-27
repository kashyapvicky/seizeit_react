import React from "react";
import { TouchableOpacity,Dimensions, View, Image ,ImageBackground} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../utilities/config/colors";
import styles from "../../../styles";
import { Images } from "../../../utilities/contsants";
import Text from "../../../components/Text";
import { normalize } from "../../../utilities/helpers/normalizeText";

const sliderWidth = Dimensions.get("window").width - 20;
const sliderHeight = Dimensions.get("window").height ;

const itemWidth = Dimensions.get("window").width - 24;
import Carousel, { Pagination } from 'react-native-snap-carousel';
export default class  BannerCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: 'Chandigarh',
            bannerImages: [
                { id: 1, image: 'http://subexyabhadel.com/wp-content/uploads/2019/01/main-qimg-7b543be853affc8d4993e2f9bb60cba1.png' },
                { id: 3, image: 'https://www.irreverentgent.com/wp-content/uploads/2018/11/Types-of-Sweaters-For-Guys-crew.jpg' },
                { id: 4, image: 'https://www.irreverentgent.com/wp-content/uploads/2018/11/Types-of-Sweaters-For-Guys-banner3-1068x712.jpg' }
            ],
            imagewidth: '100%',
            imageheight: '100%',
            slider1ActiveSlide: 0,
           
        }
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
                <Image
                    source={{uri:item.image}}
                    resizeMode={'stretch'}
                    // style={[styles.bannerImages,{resizeMode:'cover'}]}
                    style={{
                        height: 176,
                        borderRadius:8,
                        width:'100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                    }}
                >
                </Image>
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
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.state.bannerImages}
                renderItem={this.bannerImagesData}
                autoplay={true}
                loop={true}
                autoplayInterval={3000}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
            />
        </View>
        <Pagination
            dotsLength={this.state.bannerImages.length}
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