import {
  FETCH_USER_LOGIN_SUCCESS,
  FETCH_USER_LOGOUT_SUCCESS,
} from "../action/useAction";

const INITIAL_STATE = {
  accout: {
    access_token: "",
    refresh_token: "",
    email: "",
    username: "",
    image: "",
    role: "",
  },
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        accout: {
          access_token: action?.payload?.DT?.access_token,
          refresh_token: action?.payload?.DT?.refresh_token,
          email: action?.payload?.DT?.email,
          username: action?.payload?.DT?.username,
          image: action?.payload?.DT?.image,
          role: action?.payload?.DT?.role,
        },
        isAuthenticated: true,
      };
    case FETCH_USER_LOGOUT_SUCCESS:
      return {
        ...state,
        accout: {
          access_token: "",
          refresh_token: "",
          email: "",
          username: "",
          image: "",
          role: "",
        },
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default userReducer;
