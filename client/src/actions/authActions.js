import { GET_ERRORS, SET_CURRENT_USER, LOADING } from "./types";
import axios from "axios";
import qs from "qs";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//Register user
export const registerUser = (userData, history) => (dispatch) => {
  dispatch(setLoading());
  console.log(userData);
  axios({
    method: "post",
    url: "/api/users/register",
    data: qs.stringify(userData),
  })
    .then((res) => {
      history.push("/login");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Login - Get User Token
export const loginUser = (userData) => (dispatch) => {
  axios({
    method: "post",
    url: "/api/users/login",
    data: qs.stringify(userData),
  })
    .then((res) => {
      //get token from the response
      const { token } = res.data;
      //Set token to local storage
      localStorage.setItem("jwtToken", token);
      //Set token to Auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  //
};

//Loading
export const setLoading = () => {
  return {
    type: LOADING,
  };
};
