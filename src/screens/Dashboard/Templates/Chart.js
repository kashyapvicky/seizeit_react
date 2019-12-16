import React from "react";
import { ScrollView, I18nManager,View } from "react-native";

import { LineChart } from "react-native-chart-kit";
// Component
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../utilities/config/colors";
import styles from "../../../styles";
import Text from "../../../components/Text";
import { string } from "../../../utilities/languages/i18n";
import { screenDimensions } from "../../../utilities/contsants";
import moment from 'moment';
import CalendarStripComponent from './CalenderStripe';
export default LineChartComponet = props => {
  console.log(props.data ," props.data ")
  return (
    <View style={{flex:1,}}>
      <View style={[styles.totalprofitView,{alignItems:'flex-start'}]}>
        <Text style={[styles.totalProfitOverSale]}>
          {string('Sales report')}
        </Text>
      </View>
      <View style={[{marginVertical:10,marginHorizontal:16,backgroundColor:'rgba(150,197,15,0.07)'}]}>
        <CalendarStripComponent 
          {...props}
        
        />
      </View> 

      <View style={[styles.totalProfitOverSales,{marginVertical:12}]}>
        <View style={{alignItems:'flex-start'}}>
          <Text style={[styles.totalProfitOverSale, { marginBottom: 15 }]}>
            {string('Total Profit over Sales')}
          </Text>
          <Text
            style={[styles.profitAndSale, { fontSize: 26 }]}
            numberOfLines={1}
          >
            {String.currency} {props.total_sale}
          </Text>
          <Text style={[styles.totalProfitOverSale, { color: 'rgba(0,0,0,0.56)',fontSize:14 }]}>
            {string('Total Sales')}
          </Text>
        </View>
      </View>

      <View style={styles.borderSalesReport} />

      <View style={[styles.totalProfitOverSales,{marginTop:10}]}>
      <View style={{alignItems:'flex-start'}}>
          <Text style={[styles.totalProfitOverSale, { marginBottom: 10 }]}>
            {string('Total Revenue made')}
          </Text>
          <Text
            style={[styles.profitAndSale, { fontSize: 26 }]}
            numberOfLines={1}
          >
            {String.currency} {props.total_sale}
          </Text>
        </View>
      </View>

      <View style={{ 
        alignItems:'flex-start',
        marginHorizontal: 16, marginTop: 40,}}>
        <LineChart
          data={{
            labels: props.labels,
            datasets: [
              {
                data: props.data && props.data.length > 0 ? props.data : [0]
              }
            ]
          }}
          width={screenDimensions.width - 20} // from react-native
          height={220}
          isRTL={true}
          yAxisLabel={"AED "}
          chartConfig={{
         
            backgroundColor: "#FFFFFF",
            backgroundGradientFrom: "#FFFFFF",
            backgroundGradientTo: "#FFFFFF",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `#96C50F`,
            style: {
              borderRadius: 16
            }
          }}
          // bezier
          style={{
            marginVertical: 4,
            borderRadius: 5,
            // transform: [
            //   { scaleX: I18nManager.isRTL ?-1 :1}, 
            // ],
          }}
        />
      </View>
      <View style={styles.borderSalesReport} />


      {/* <View style={{ marginHorizontal: 20, marginTop: 40 }}>
    <View style={styles.mainviewOrderDetail}>
        <View style={styles.orderDetailView}>
            <Text style={styles.totalProfitOverSale}>{string('orderDetail')}</Text>
        </View>
        <View>
            <Dropdown
                containerStyle={styles.containerStyleforProfit}
                inputContainerStyle={{
                    borderBottomColor: 'transparent'
                }}
                itemTextStyle={[styles.inputField.alignContent, { color: colors.appColor, }]}
                style={{}}
                textColor={colors.appColor}
                value={this.state.selectedStatusProfit}
                baseColor={'black'}
                labelHeight={0}
                valueExtractor={({ value }) => value}
                data={this.state.allTypeStatusForProfit}
                onChangeText={(value, index, data) => this._selectedStatusProfit(value, index, data)}
            />

        </View>
    </View>
</View> */}

      {/* <View style={{ marginTop: 40 }}>
    <FlatList
        bounces={false}
        extraData={this.state}
        pagingEnabled={true}
        data={this.state.profitProducts}
        keyExtractor={this._keyExtractor2}
        renderItem={this._profitProducts}
        ListEmptyComponent={
            (this.state.profitProducts.length == 0) ?
                this.ListEmpty()
                :
                null
        }
    />
</View> */}
    </View>
  );
};
