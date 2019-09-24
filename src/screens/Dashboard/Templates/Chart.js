import React from "react";
import { ScrollView, View } from "react-native";

import { LineChart } from "react-native-chart-kit";
// Component
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../utilities/config/colors";
import styles from "../../../styles";
import Text from "../../../components/Text";
import { string } from "../../../utilities/languages/i18n";
import { screenDimensions } from "../../../utilities/contsants";

export default LineChartComponet = props => {
  return (
    <View style={{flex:1,}}>
      <View style={styles.totalprofitView}>
        <Text style={[styles.totalProfitOverSale]}>
          {'Sales report'}
        </Text>
      </View>
      <View style={[{height:50,marginVertical:10,marginHorizontal:16,backgroundColor:'rgba(150,197,15,0.07)'}]}>
       
      </View>

      <View style={[styles.totalProfitOverSales,{marginVertical:12}]}>
        <View>
          <Text style={[styles.totalProfitOverSale, { marginBottom: 15 }]}>
            {'Total Profit over Sales'}
          </Text>
          <Text
            style={[styles.profitAndSale, { fontSize: 26 }]}
            numberOfLines={1}
          >
            $00
          </Text>
          <Text style={[styles.totalProfitOverSale, { color: 'rgba(0,0,0,0.56)',fontSize:14 }]}>
            {'Total Sales'}
          </Text>
        </View>
      </View>

      <View style={styles.borderSalesReport} />

      <View style={[styles.totalProfitOverSales,{marginTop:10}]}>
        <View>
          <Text style={[styles.totalProfitOverSale, { marginBottom: 10 }]}>
            {'Total Revenue made'}
          </Text>
          <Text
            style={[styles.profitAndSale, { fontSize: 26 }]}
            numberOfLines={1}
          >
            $00
          </Text>
        </View>
      </View>

      <View style={{ marginHorizontal: 20, marginTop: 40 }}>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April"],
            datasets: [
              {
                data: [
                 Math.random() * 100,
                  // Math.random() * 100,
                  // Math.random() * 100,
                  // Math.random() * 100,
                ]
              }
            ]
          }}
          width={screenDimensions.width - 40} // from react-native
          height={220}
          yAxisLabel={"$"}
          chartConfig={{
            backgroundColor: "#FFFFFF",
            backgroundGradientFrom: "#FFFFFF",
            backgroundGradientTo: "#FFFFFF",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `#96C50F`,
            style: {
              borderRadius: 16
            }
          }}
          // bezier
          style={{
            marginVertical: 4,
            borderRadius: 5
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
