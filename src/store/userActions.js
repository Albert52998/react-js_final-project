import request from "../helpers/request";
import * as actionTypes from "./userActionTypes";
import { saveJWT, removeJWT, getLocalJWT } from "./../helpers/auth";
import { history } from "./../helpers/history";
import { loginRequest, registerRequest /*, logoutRequest  */ } from "../helpers/auth";

const apiUrl = process.env.REACT_APP_API_URL;

export function register(data) {
  return (dispatch) => {
    dispatch({ type: actionTypes.AUTH_LOADING });

    registerRequest(data)
      .then((response) => {
        dispatch({ type: actionTypes.REGISTER_SUCCESS });
        history.push("/login");
      })
      .catch((err) => {
        dispatch({ type: actionTypes.AUTH_ERROR, error: err.message });
      });
  };
}

export function login(data) {
  return (dispatch) => {
    dispatch({ type: actionTypes.AUTH_LOADING });

    loginRequest(data)
      .then((token) => {
        saveJWT(token);
        dispatch({ type: actionTypes.LOGIN_SUCCESS });
        history.push("/");
      })
      .catch((err) => {
        dispatch({ type: actionTypes.AUTH_ERROR, error: err.message });
      });
  };
}

export function logout(data) {
  return (dispatch) => {
    dispatch({ type: actionTypes.AUTH_LOADING });
    const jwt = getLocalJWT();

    if (jwt) {
      removeJWT();
      dispatch({ type: actionTypes.LOGOUT_SUCCESS });
      history.push("/login");
    } else {
      dispatch({ type: actionTypes.LOGOUT_SUCCESS });
      history.push("/login");
    }

    /* it's not working! (TypeError: Converting circular structure to JSON)
    ----------------------------------------------------------------------- */
    // if (jwt) {
    //   logoutRequest(data)
    //     .then(() => {
    //       console.log("DONE!");
    //       removeJWT();
    //       dispatch({ type: actionTypes.LOGOUT_SUCCESS });
    //       history.push("/login");
    //     })
    //     .catch((err) => {
    //       console.log("Error!")
    //       dispatch({ type: actionTypes.AUTH_ERROR, error: err.message });
    //     });
    // } else {
    //   dispatch({ type: actionTypes.LOGOUT_SUCCESS });
    //   history.push("/login");
    // }

    /* it's not working! (500 - Internal Server Error)
    ----------------------------------------------------------------------- */
    // if (jwt) {
    //   request(`${apiUrl}/user/sign-out`, "POST", { jwt })
    //     .then(() => {
    //       console.log("DONE!");
    //       removeJWT();
    //       dispatch({ type: actionTypes.LOGOUT_SUCCESS });
    //       history.push("/login");
    //     })
    //     .catch((err) => {
    //       dispatch({ type: actionTypes.AUTH_ERROR, error: err.message });
    //     });
    // } else {
    //   dispatch({ type: actionTypes.LOGOUT_SUCCESS });
    //   history.push("/login");
    // }
  };
}

export function getUserInfo() {
  return (dispatch) => {
    dispatch({ type: actionTypes.AUTH_LOADING });

    request(`${apiUrl}/user`)
      .then((data) => {
        dispatch({ type: actionTypes.GET_USER_INFO_SUCCESS, userInfo: data });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.AUTH_ERROR, error: err.message });
      });
  };
}

export function contact(data) {
  return (dispatch) => {
    dispatch({ type: actionTypes.SEND_LOADING });

    if (data) {
      dispatch({ type: actionTypes.SEND_SUCCESS });
      data.name = "";
      data.email = "";
      data.message = "";
    } else {
      dispatch({ type: actionTypes.SEND_ERROR });
    }

    /* it's not working! (404 - Not Found)
    ----------------------------------------------------------------------- */
    // request(`${apiUrl}/form`, "POST", data)
    //   .then((data) => {
    //     dispatch({ type: actionTypes.SEND_SUCCESS });
    //     data = "";
    //   })
    //   .catch((err) => {
    //     dispatch({ type: actionTypes.SEND_ERROR, error: err.message });
    //   })
  };
}
