import React,{useState,useEffect} from "react";
import { ScrollView, View,StyleSheet,Image } from "react-native";
import Permissions from 'react-native-permissions'

export async function requestLocationPermission() {
    let {cameraPermission,setCameraPermission} = useState(null)
    let {photoPermission,setPhotoPermission} = useState(null)
    Permissions.checkMultiple(['camera', 'photo']).then(response => {
        //response is an object mapping type to permission
        setCameraPermission(response.camera)
        setPhotoPermission(response.photo)
    })

    return <> </>
}
