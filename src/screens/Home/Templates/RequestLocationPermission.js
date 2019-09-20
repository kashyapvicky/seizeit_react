import { PermissionsAndroid } from 'react-native';

export async function requestLocationPermission() 
{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'SeizIt',
        'message': 'SeizIt App access to your location for show your places'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
            console.log("You can use the location")
            //alert("You can use the location");
    } else {
      console.log("location permission denied")
     // alert("Location permission denied");
    }
  } catch (err) {
    console.warn(err)
  }
}