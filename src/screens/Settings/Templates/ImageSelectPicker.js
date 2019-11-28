import React from "react";
import { Image, View ,Platform,TouchableOpacity,PermissionsAndroid} from "react-native";
// Component
import colors from "../../../utilities/config/colors";
import styles from "../../../styles";
import Text from "../../../components/Text";
import { string } from "../../../utilities/languages/i18n";
import { normalize } from "../../../utilities/helpers/normalizeText";
import CustomModal from '../../../components/CustomModal'
async function GetAllPermissions() {
    try {
      if (Platform.OS === "android") {
        const userResponse = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        return userResponse;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  }
export default ImageSelectPickerModal = ({isModalVisible,launchCamera,openImageLibrary,closeModal}) => {
    GetAllPermissions()
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
                    <Text h5 >{string("Take Photo")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingVertical: 8 }}
                    onPress={() => {
                        openImageLibrary()
                    }}
                >
                    <Text h5 >{string("Choose Existing")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => closeModal()}
                    style={{
                        alignItems: 'center', justifyContent: 'center',
                        paddingTop: 36
                    }}>
                    <Text h5 style={{ fontSize: 18, color: '#939699' }}>{string("Cancel")}</Text>
                </TouchableOpacity>
            </View>
        </CustomModal>
    )
     }
