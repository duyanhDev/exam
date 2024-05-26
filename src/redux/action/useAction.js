import { type } from "@testing-library/user-event/dist/type";

export const FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_LOGIN_SUCCESS";
export const FETCH_USER_LOGOUT_SUCCESS = "FETCH_USER_LOGOUT_SUCCESS";
export const doLogin = (res) => {
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: res,
  };
};

export const doLogout = () => {
  return {
    type: FETCH_USER_LOGOUT_SUCCESS,
  };
};
