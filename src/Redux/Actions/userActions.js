//import axios from "axios";
import { checkCredentials } from "../../API/usersAPI";

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../Constants/userConstants.js";

export const login = (values) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    // const { data } = await axios.post(
    //   "/api/users/login",
    //   { email, password },
    //   config
    // );

    const loggedInUser = await checkCredentials(values);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: loggedInUser,
    });

    // localStorage.setItem("userInfo", JSON.stringify(data));
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

export const logout = () => (dispatch) => {
  //localStorage.removeItem("iserInfo");
  dispatch({
    type: USER_LOGOUT,
  });
};
