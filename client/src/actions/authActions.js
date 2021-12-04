import ACTION_TYPES from "./types";
import API from './API';

const url = "/user";

// Login user with data from login form
export const login = (data, history, onFail) => async (dispatch) => {
  await API.post(`${url}/signin`, data).then((res) => {
    dispatch({
      type: ACTION_TYPES.LOGIN,
      data: res.data
    });
    history.push('/');
  })
  .catch((err) => {
    console.log(err);
    onFail();
  });
}

// create a new user with data from sign up form
export const signUp = (data, history, onFail) => async (dispatch) => {
  await API.post(`${url}/signup`, data).then((res) => {
    dispatch({
      type: ACTION_TYPES.LOGIN,
      data: res.data
    });
    history.push('/');
  })
  .catch((err) => {
    console.log(err);
    onFail();
  });
}

// logout
export const logout = (history) => async (dispatch) => {
  dispatch({
    type: ACTION_TYPES.LOGOUT,
  });
  history.push('/');
}