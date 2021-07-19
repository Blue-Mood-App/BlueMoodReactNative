import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import registration from "./registration";
import activities from "./activities";
import places from "./places";
import location from "./location";
import userActivities from "./userActivities";
import sortedActivities from "./sortedActivities";
import nearbyUsers from "./nearbyUsers";

const reducer = combineReducers({
  auth,
  registration,
  activities,
  userActivities,
  sortedActivities,
  places,
  location,
  nearbyUsers,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware /*, createLogger({ collapsed: true })*/)
);
const store = createStore(reducer, middleware);

export default store;
