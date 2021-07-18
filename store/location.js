import * as Location from "expo-location";

const GOT_LOCATION = 'GOT_LOCATION'


const gotLocation = (location) => ({
  type: GOT_LOCATION,
  location
})

export const getLocation = () => async (dispatch) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // dispatch(setErrorMsg("Permission to access location was denied"));
      console.log('location services not accepted')
    }
    let location = await Location.getCurrentPositionAsync({});
    dispatch(gotLocation(location));
  }

  export default function (state = {}, action) {
    switch (action.type) {
      case GOT_LOCATION:
        return action.location;
      default:
        return state;
    }
  }
