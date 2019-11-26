import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    Image,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Platform,
    ImageBackground,
    ActivityIndicator

} from 'react-native';

import backButton from '../../assets/images/ic_back.png'
import Text from "../../components/Text";
import {getRequest, postRequest} from '../../redux/request/Service'

import styles from '../../styles';
import { screenDimensions } from '../../utilities/contsants'
// import HTML from 'react-native-render-html';
import Header from "../../components/Header";
import BlogItem from "./Templates/BlogItem";

import { string } from '../../utilities/languages/i18n'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'



class Blogs extends Component {
    static navigationOptions = {
        tabBarVisible: false,
    }
    constructor(props) {

        super(props);
        this.state = {
            refreshing: false,
            isModalVisible: false,
            isFlipped: true,
            allBlogs: [
               

            ],
            // allBlogs: [],
            visible: false,
            pageno: 1,
            pageoffset: 9,
            dataExist: false,
            isRefreshing: false,
        }
    }

    componentDidMount() {
        this.getBlogs()
    }

    getBlogs = () => {
        getRequest("user/blogs")
            .then(res => {
                if (res && res.data && res.data.length > 0) {
                    let { params } = this.props.navigation.state;
                    this.setState(
                        {
                            allBlogs: res.data,
                            isRefreshing: false
                        });
                } else {
                    this.setState({
                        allBlogs: [],
                        isRefreshing: false
                    });
                }
                setIndicator(false);
            })
            .catch(err => { });
    }

    _flip = () => {
        this.setState({ isFlipped: !this.state.isFlipped, isRefreshing: false, })
    };


    handleRefresh = () => {
        this.setState({
            pageno: 1,
            isRefreshing: true,
        }, () => {
            this.getBlogs()
        });
    }

    handleLoadMore = () => {
        debugger
        if (this.state.dataExist) {
            this.setState({
                pageno: this.state.pageno + 1
            }, () => {
                this.getBlogs()
            });
        }
    }
    renderFooter = () => {
        return (
            !this.state.isRefreshing && this.state.dataExist ?
                <View>
                    <ActivityIndicator animating size="large" color={'#F6871C'} />
                </View>
                :
                null
        )
    }



    _keyExtractor2 = (item, index) => index + 'flatlist2';
    _allBlogs = ({ item, index }) => {

        return (
            <TouchableOpacity
                style={[styles.shadow, {
                    flex: 1,
                    marginBottom: 16,
                    shadow: {
                        height: 14,
                        width: 0
                    },
                    elevation: 2,
                    borderRadius: 8,
                    shadowRadius: 4, backgroundColor: '#FFFFFF', shadowOpacity: 0.12
                }]}
                onPress={() => this.props.navigation.navigate('BlogDetail', { flip: this.props.flip,
                    blogItem: item })}>

                <View
                    style={[styles.listView, styles.shadow,
                    {
                        width: '100%', height: 150,
                        borderTopRightRadius: 8, borderTopLeftRadius: 8,
                        shadowRadius: 2, backgroundColor: 'white', shadowOpacity: 0.5,
                        marginBottom: 10, alignItems: 'center'
                    }]}>
                    <ImageBackground
                        imageStyle={{ borderTopRightRadius: 8, borderTopLeftRadius: 8 }}
                        source={{ uri:item.image
                        }}
                        resizeMode={'cover'}
                        style={{ width: '100%', height: undefined,flex:1 }}
                    //style={{ width: screenDimensions.width, height: screenDimensions.height / 3 }}
                    >
                        <LinearGradient
                            colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.1)', '#000000']} style={[styles.linearGradient]} >
                            <View style={[styles.listView, {
                                flex: 1,
                                paddingHorizontal: 16,
                                paddingBottom: 8,
                                justifyContent: 'flex-end',
                            }]}>
                                <Text style={styles.blog_title}>{item.title}</Text>
                            </View>
                        </LinearGradient>

                    </ImageBackground>
                </View>
                {/* <View style={ { width: screenDimensions.width - 40, height: 184, borderRadius: 8, marginBottom: 10, alignItems: 'center' }}>
                        <Image source={item.blog_image} style={{ width: screenDimensions.width - 40, height: 184, borderRadius: 8 }} />
                    </View> */}
                <BlogItem item={item} from={'mainBlog'} />
            </TouchableOpacity>

        )
    }
    goBack = () => {
        if (this.props && this.props.flip) {
            this.props.flip()
            this.props.navigation.navigate('Setting')
        }
        else {
            this.props.navigation.navigate('Setting')
        }

    }

    //empty list
    ListEmpty = () => {
        if (this.state.visible) {
            return <Spinner />
        }
        else {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 100000,
                    // justifyContent: 'center',
                    //backgroundColor: 'rgba(0,0,0,0.1)',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                }}>
                    <Text style={styles.productPrice}>
                        {string('nodatafound')}
                    </Text>
                </View>
            )
        }

    }
    goBack = () => {
        if (this.props && this.props.flip) {
            this.props.flip()
            this.props.navigation.navigate('Setting')
        }
        else {
            this.props.navigation.navigate('Setting')
        }

    }
    render() {

        return (
            <View style={[{ flex: 1 }]}>
                <Header
                    isRightIcon={false}
                    headerStyle={[
                        styles.shadow,
                        {
                            backgroundColor: "#FFFFFF",
                            shadowRadius: 0.1
                        }
                    ]}
                    title={"Blogs"}
                    backPress={() => this.goBack()}
                />

                <ScrollView style={{ flex: 1 }}>
                    <View style={{ paddingHorizontal: 24, paddingVertical: 24 }}>
                        <FlatList
                            bounces={true}
                            extraData={this.state}
                            // pagingEnabled={true}
                            scrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            data={this.state.allBlogs}
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.handleRefresh}
                            //onEndReached={this.handleLoadMore}
                            // onEndReachedThreshold={0.9}
                            //  ListFooterComponent={this.renderFooter}
                            // showsHorizontalScrollIndicator={false}
                            keyExtractor={this._keyExtractor2}
                            renderItem={this._allBlogs}
                        // ListEmptyComponent={()=> <ListEmptyComponent />}

                        />
                    </View>
                </ScrollView>

            </View>
        )

    }
}
export default Blogs