
import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import moment from 'moment';
// import CalendarStrip from 'react-native-calendar-strip';
import Text from "../../../components/Text";
function getAbsoulteMonths(momentDate) {
    var months = Number(momentDate.format("MM"));
    var years = Number(momentDate.format("YYYY"));
    return months + (years * 12);
  }
  

  
export default class CalendarStripComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startMonth: moment().subtract(3, 'months'),
            endMonth: moment(),
        }
        
    }
    onPressRight = (date) => {
        this.setState({
            startMonth: moment(this.state.startMonth).add(3, 'months'),
            endMonth: moment(this.state.endMonth).add(3, 'months')
        },()=>{
            this.props.getStartEndDate(this.state.startMonth,this.state.endMonth)
        // let monthDiffs = monthDiff(moment().format('DD-MM-YYYY'),moment(this.state.startMonth).format('DD-MM-YYYY'))
        // debugger
        })
    }
    onPressLeft = () => {
        this.setState({
            startMonth: moment(this.state.startMonth).subtract(3, 'months'),
            endMonth: moment(this.state.endMonth).subtract(3, 'months')
        },()=>{
            // let startMonths = getAbsoulteMonths(this.state.startMonth);
            // let endMonths = getAbsoulteMonths(moment());
            // debugger
            // let monthDifference = endMonths - startMonths;
            this.props.getStartEndDate(this.state.startMonth,this.state.endMonth)

        })
    }
    render() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16 }}>
                <TouchableOpacity style={{ flex: 0.2 }}
                    onPress={() => this.onPressLeft()}
                >
                    <Image source={require('../../../assets/images/ic_previous.png')} />
                </TouchableOpacity>
                <View style={{ flex: 0.8, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <Text p>{moment(this.state.startMonth).format('MMMM')}-{moment(this.state.endMonth).format('MMMM')}</Text>
                </View>
                <TouchableOpacity style={{ flex: 0.2 }}
                    onPress={() => this.onPressRight()}
                >
                    <Image source={require('../../../assets/images/ic_next.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}