import { combineReducers } from "redux";
import adminConfigReducer from "./adminConfigReducer";
import currenciesReducer from "./currenciesReducer";

const rootReducer = combineReducers({
  adminConfigReducer,
  currenciesReducer
});

export default rootReducer;