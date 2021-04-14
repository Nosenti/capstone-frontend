import axios from 'axios';
import {setAlert} from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';

const BASE_URL = "http://localhost:5000/api";
// Load user
export const loadUser = () => async dispatch => {
  if(localStorage.token){
    setAuthToken(localStorage.token)
  }

  try {

    const res = await axios.get(`${BASE_URL}/users/auth`);
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
    
  } catch (err) {
    console.log(err)
    dispatch({
      type: AUTH_ERROR
    })
  }
}

// Register user

export const register = ({name, email, password, passwordConfirm}) => async dispatch => {
  const config = {
    headers:{
      'Content-Type':'application/json'
    }
  }
  

  const body = JSON.stringify({name, email, password, passwordConfirm});
  console.log(body);

  try {
    const res =  await axios.post(`${BASE_URL}/users/signup`, body, config);
    console.log(res)
    

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
    const errors = err.response.data;
    dispatch(setAlert(errors.message, 'danger'));
    
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

// Login user

export const login = (email, password) => async dispatch => {
  const config = {
    headers:{
      'Content-Type':'application/json'
    }
  }
  

  const body = JSON.stringify({email, password});
  console.log(body);

  try {
    const res =  await axios.post(`${BASE_URL}/users/signin`, body, config);
    console.log(res)
    

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    console.log(err)
    const errors = err.response.data;
    dispatch(setAlert(errors.message, 'danger'));
    
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

// Logout / Clear Profile

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT})
}