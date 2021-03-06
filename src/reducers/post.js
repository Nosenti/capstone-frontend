/* eslint-disable import/no-anonymous-default-export */
import {
  GET_POSTS, 
  POST_ERROR,
  UPDATE_AGREE,
  UPDATE_DISAGREE,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT, 
  REMOVE_COMMENT,
  GET_PENDING,
  GET_STATS,
  GET_STATS_TAGS,
  GET_STATS_DECLINED
} from '../actions/types';

const initialState = {
  posts: [],
  post: null, 
  loading: true, 
  error: {}
}

export default function (state = initialState, action) {
  const { type, payload} = action;

  switch(type){
    case GET_POSTS:
    case GET_PENDING:
    case GET_STATS:
    case GET_STATS_TAGS:
    case GET_STATS_DECLINED:
      return {
        ...state,
        posts: payload,
        loading: false
      }
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      }
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      }
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_AGREE:
      return {
        ...state,
        posts: state.posts.map( post => post._id === payload.postId ? { ...post, agree: payload.agree} : post),
        loading: false
      }
    case UPDATE_DISAGREE:
      return {
        ...state,
        posts: state.posts.map( post => post._id === payload.postId ? { ...post, disagree: payload.disagree} : post),
        loading: false
      }
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload},
        loading: false
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        post: { 
          ...state.post,
          comments: state.post.comments.filter(comment => comment._id !== payload),
          loading: false
        }
      }
    default:
      return state;
  }
}