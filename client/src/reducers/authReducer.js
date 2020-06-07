import { SET_CURRENT_USER, LOADING, GET_ERRORS } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false,
      };
    case GET_ERRORS:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
