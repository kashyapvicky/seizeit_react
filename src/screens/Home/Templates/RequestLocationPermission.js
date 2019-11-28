import { PermissionsAndroid } from 'react-native';
import { string } from "../../../utilities/languages/i18n";
export async function requestLocationPermission() 
{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'SeizIt',
        'message': `SeizIt ${string('App access to your location for show your places')}`
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
            //alert("You can use the location");
    } else {
      return false
     // alert("Location permission denied");
    }
  } catch (err) {
    return false
    console.warn(err)
  }
}