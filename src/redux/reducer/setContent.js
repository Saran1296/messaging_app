import { set } from "lodash";
import { SET_CONTENT } from "../actions";

const setContent = (state = {}, action) => {
  switch (action.type) {
    case SET_CONTENT:
      return set({ ...state }, action.target, action.data);
    default:
      return state;
  }
};

export default setContent;
