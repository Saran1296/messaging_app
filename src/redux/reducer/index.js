import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import setContent from "./setContent";

export default combineReducers({
  form,
  setContent,
});
