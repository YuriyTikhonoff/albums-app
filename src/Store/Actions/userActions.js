import { checkCredentials } from "../../Api/usersAPI";

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../Constants/userConstants.js";

export const logIn = (values) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const loggedInUser = await checkCredentials(values);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: loggedInUser,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};

export const logOut = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
};
