import { createStore, combineReducers } from "redux";
import registration from "./registration";

const reducer = combineReducers({
  registration
});

const store = createStore(reducer);

export default store;