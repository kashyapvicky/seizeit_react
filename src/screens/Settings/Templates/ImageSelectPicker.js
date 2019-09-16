import React from "react";
import { Image, View ,TouchableOpacity} from "react-native";
// Component
import colors from "../../../utilities/config/colors";
import styles from "../../../styles";
import Text from "../../../components/Text";
import { string } from "../../../utilities/languages/i18n";
import { normalize } from "../../../utilities/helpers/normalizeText";
import CustomModal from '../../../components/CustomModal'
export default ImageSelectPickerModal = ({isModalVisible,launchCamera,openImageLibrary,closeModal}) => {
    return (
        <CustomModal isModalVisible={isModalVisible} closeModal={() => closeModal()}>
            <View style={[styles.modalBottomContent, {
                borderRadius: 0,
                paddingHorizontal: 16,
                paddingVertical: 16,
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0
            }]}>
                <TouchableOpacity style={{ paddingVertical: 16 }} onPress={() => {
                    launchCamera()
                }}>
                    <Text h5 >Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingVertical: 8 }}
                    onPress={() => {
                        openImageLibrary()
                    }}
                >
                    <Text h5 >Choose Existing</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => closeModal()}
                    style={{
                        alignItems: 'center', justifyContent: 'center',
                        paddingTop: 36
                    }}>
                    <Text h5 style={{ fontSize: 18, color: '#939699' }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </CustomModal>
    )
     }
