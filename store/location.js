import * as Location from "expo-location";
import axios from "axios";
import location from "./serverInfo";
import * as SecureStore from "expo-secure-store";
import me from "./auth";

const GOT_LOCATION = "GOT_LOCATION";
const TOKEN = "token";

const gotLocation = (location) => ({
  type: GOT_LOCATION,
  location,
});

export const getLocation = () => async (dispatch) => {
  const token = await SecureStore.getItemAsync(TOKEN);
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    // dispatch(setErrorMsg("Permission to access location was denied"));
    console.log("location services not accepted");
  }
  let geo = await Location.getCurrentPositionAsync({});
  if (token) {
    await axios.put(
      `${location}/api/users/?lat=${geo.coords.latitude}&long=${geo.coords.longitude}`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(me());
  }

  dispatch(gotLocation(geo));
};

export default function (state = {}, action) {
  switch (action.type) {
    case GOT_LOCATION:
      return action.location;
    default:
      return state;
  }
}
