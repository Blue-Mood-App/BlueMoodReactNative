import axios from "axios";
import location from "./serverInfo";
const GET_NEARBY = "GET_NEARBY";

const getNearbyUsers = (users) => ({
  type: GET_NEARBY,
  users,
});

export const fetchNearByUsers = (geo) => async (dispatch) => {
  console.log(geo, "in redux location");
  const { data } = await axios.get(
    `${location}/api/users/nearby/?lat=${geo.coords.latitude}&long=${geo.coords.longitude}`
  );
  dispatch(getNearbyUsers(data));
};

export default function (state = {}, action) {
  switch (action.type) {
    case GET_NEARBY:
      console.log(action.users, "in redux");
      return action.users;
    default:
      return state;
  }
}
