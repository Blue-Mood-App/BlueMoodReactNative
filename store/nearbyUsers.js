import axios from "axios";
import location from "./serverInfo";
import me from "./auth";
import * as SecureStore from "expo-secure-store";

const TOKEN = "token";
const GET_NEARBY = "GET_NEARBY";

const getNearbyUsers = (users) => ({
  type: GET_NEARBY,
  users,
});

export const fetchNearByUsers = () => async (dispatch) => {
  const token = await SecureStore.getItemAsync(TOKEN);
  //console.log(geo, "in redux location");
  const { data } = await axios.get(`${location}/api/users/nearby/`, {
    headers: {
      authorization: token,
    },
  });
  dispatch(getNearbyUsers(data));
};

export default function (state = {}, action) {
  switch (action.type) {
    case GET_NEARBY:
      //console.log(action.users, "in redux");
      return action.users;
    default:
      return state;
  }
}
