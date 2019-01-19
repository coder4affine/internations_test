import * as types from "../../constants/actionTypes";

const initialState = null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_SEARCH + types.SUCCESS:
      return { ...state, ...payload };

    default:
      return state;
  }
};
