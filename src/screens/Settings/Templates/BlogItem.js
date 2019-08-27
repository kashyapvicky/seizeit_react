import React from "react";
import { Image, View ,TouchableOpacity} from "react-native";
// Component
import colors from "../../../utilities/config/colors";
import styles from "../../../styles";
import Text from "../../../components/Text";
import { string } from "../../../utilities/languages/i18n";
import { normalize } from "../../../utilities/helpers/normalizeText";

export default (BlogItem = ({item}) => {
      return <View>
            <View style={{ marginBottom: 16 ,paddingHorizontal:8,paddingTop:16}}>
                        {/* <HTML html={item && item.description ? item.description : null} imagesMaxWidth={screenDimensions.width} /> */}
                        <Text style={styles.blog_desc}>{item && item.blog_desc ? item.blog_desc : null}</Text>
                    </View>
                    <View style={{ marginBottom: 10 ,paddingHorizontal:8}}>
                        {/* <HTML html={item && item.description ? item.description : null} imagesMaxWidth={screenDimensions.width} /> */}

                        <Text style={styles.blog_desc}>{'— Travis Farmer'}</Text>
                    </View>
                    <View style={{ marginBottom: 15,paddingHorizontal:8 ,paddingBottom:8}}>
                        <Text style={styles.blog_date}>{`${string('postedon')} ${item.blog_date}`}</Text>
                    </View>
          </View>
        })