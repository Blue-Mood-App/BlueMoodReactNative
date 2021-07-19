import axios from "axios";
import location from "./serverInfo";
const GET_NEARBY = "GET_NEARBY";

const getNearbyUsers = (users) => ({
  type: GET_NEARBY,
  users,
});

export const fetchNearByUsers = (geo) => async (dispatch) => {
  const { data } = await axios.get(
    `${location}/api/users/nearby/?lat=${geo.coords.latitude}&long=${geo.coords.longitude}`
  );
  dispatch(getNearbyUsers(data));
};

export default function (state = {}, action) {
  switch (action.type) {
    case GET_NEARBY:
      return action.users;
    default:
      return state;
  }
}
