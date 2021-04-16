import axios from 'axios';
import {setAlert} from './alert';
import {
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_AGREE,
  UPDATE_DISAGREE,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types';

const BASE_URL = "http://localhost:5000/api";

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get(`${BASE_URL}/posts`);

    dispatch({
      type: GET_POSTS, 
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR, 
      payload: { msg: err.response.message, status: err.response.status}
    })
  }
}

// Update agree
export const updateAgree = id => async dispatch => {
  try {
    const res = await axios.post(`${BASE_URL}/posts/${id}/agree`);

    dispatch({
      type: UPDATE_AGREE, 
      payload: {id, agree: res.data}
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR, 
      // payload: { msg: err.response.message, status: err.response.status}
    })
  }
}

// Update disagree
export const updateDisagree = id => async dispatch => {
  try {
    const res = await axios.post(`${BASE_URL}/posts/${id}/disagree`);

    dispatch({
      type: UPDATE_DISAGREE, 
      payload: {id, disagree: res.data}
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR, 
      payload: { msg: err.response.message, status: err.response.status}
    })
  }
}

// delete Post
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`${BASE_URL}/posts/${id}`);
    dispatch(setAlert('Post removed','success'));
    dispatch({
      type: DELETE_POST, 
      payload: id
    })
    
    
  } catch (err) {
    console.log(Object.keys('returned err response ',err.response))
    // setAlert(errors.message, 'danger')
    //dispatch(setAlert(errors, 'danger'));
    dispatch({
      type: POST_ERROR
    })
  }
}

// add Post
export const addPost = formData => async dispatch => {

  const config ={
    headers: {
      'Content-Type':'application/json'
    }
    
  }
  try {
    const res = await axios.post(`${BASE_URL}/posts`, formData, config);
    dispatch(setAlert('Post created','success'));
    dispatch({
      type: ADD_POST, 
      payload: res.data
    })
    
    
  } catch (err) {
    
    dispatch({
      type: POST_ERROR, 
      // payload: { msg: err.response.message, status: err.response.status}
    })
  }
}

// Get post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`${BASE_URL}/posts/${id}`);

    dispatch({
      type: GET_POST, 
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR, 
      payload: { msg: err.response.message, status: err.response.status}
    })
  }
}

// add Comment
export const addComment = (postId, formData) => async dispatch => {

  const config ={
    headers: {
      'Content-Type':'application/json'
    }
    
  }
  try {
    const res = await axios.post(`${BASE_URL}/posts/${postId}`, formData, config);

    dispatch({
      type: ADD_COMMENT, 
      payload: res.data
    })
    
    dispatch(setAlert('Comment added','success'));
  } catch (err) {
    // dispatch(setAlert('Failed to add comment','danger'));
    dispatch({
      type: POST_ERROR, 
      payload: { msg: err.response.message, status: err.response.status}
    })
  }
}

// delete Comment
export const deleteComment = (postId, commentId) => async dispatch => {

  try {
    await axios.delete(`${BASE_URL}/posts/${postId}/comment/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT, 
      payload: commentId
    })
    
    dispatch(setAlert('Comment removed','success'));
  } catch (err) {

    //const errors = err.response.statusText;
    // setAlert(errors.message, 'danger')
    dispatch(setAlert('Failed to delete the comment', 'danger'));
    dispatch({
      type: POST_ERROR
    })
  }
}