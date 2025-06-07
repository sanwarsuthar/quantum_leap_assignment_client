import {
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SIDEBAR_TOGGLE,
  LOADING,
} from "./actionTypes";

const storedUser = localStorage.getItem("user");
const initialState = storedUser
  ? JSON.parse(storedUser)
  : {
      id: null,
      email: null,
      name: null,
      loggedIn: false,
    };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        ...action.updates,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        loggedIn: false,
      };
    case SIDEBAR_TOGGLE:
      return {
        ...state,
        ...action.updates,
      };
    case LOADING:
      return {
        ...state,
        ...action.updates,
      };
    default:
      return state;
  }
};

export default authReducer;
