import axiosInstance from '../../api/axiosInstance';
import {
  FETCH_POSTS_ERROR,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  REMOVE_POST,
} from '../constants/postContstants';

const PICSUM_API_URL = process.env.REACT_APP_PICSUM_BASE_URL

export const fetchPosts = () => async (dispatch) => {
  dispatch({ type: FETCH_POSTS_REQUEST });
  try {
    const response = await axiosInstance.get('/posts');

    const postsWithImages = response.data.map((post) => ({
      ...post,
      image: `${PICSUM_API_URL}${encodeURIComponent(post.title)}/1200/720`,
    }));

    dispatch({
      type: FETCH_POSTS_SUCCESS,
      payload: postsWithImages,
    });
  } catch (error) {
    dispatch({
      type: FETCH_POSTS_ERROR,
      payload: error.message,
    });
  }
};

export const removePost = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_POST,
    payload: id,
  });
};
