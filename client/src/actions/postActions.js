import ACTION_TYPES from "./types";
import API from "./API";
const url = "/post";

export const fetchAllPosts = () => async (dispatch) => {
  await API.get(url)
    .then((res) =>
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const fetchPost = (id) => async (dispatch) => {
  await API.get(`${url}/${id}`)
    .then((res) =>
      dispatch({
        type: ACTION_TYPES.FETCH_POST,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

// paginate!
export const fetchPosts = (page, category, query) => async (dispatch) => {
  await API.get(`${url}?page=${page}&category=${category}&query=${query}`)
    .then((res) =>
      dispatch({
        type: ACTION_TYPES.FETCH_POSTS,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const createPost = (post, onSuccess) => async (dispatch) => {
  await API.post(url, post)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const likePost = (id) => async (dispatch) => {
  await API.put(`${url}/${id}/like`).then((res) => {
    dispatch({
      type: ACTION_TYPES.UPDATE,
      payload: res.data,
    });
  })
  .catch((err) => console.log(err));
};

export const commentPost = (id, comment) => async (dispatch) => {
  await API.put(`${url}/${id}/comment`, comment).then((res) => {
    dispatch({
      type: ACTION_TYPES.COMMENT,
      payload: res.data,
    });
  })
  .catch((err) => console.log(err));
};

export const updatePost = (id, post, onSuccess) => async (dispatch) => {
  await API.put(`${url}/${id}`, post)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const deletePost = (id, onSuccess) => async (dispatch) => {
  await API.delete(`${url}/${id}`).then((res) => {
    dispatch({
      type: ACTION_TYPES.DELETE,
      payload: id,
    });
    onSuccess();
  })
  .catch((err) => console.log(err));
};