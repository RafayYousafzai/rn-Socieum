import { combineReducers } from "redux";
import searchData from "./reducer";

const appReducer = combineReducers({
  searchData,
});

export default function rootReducer(state, action) {
  return appReducer(state, action);
}
