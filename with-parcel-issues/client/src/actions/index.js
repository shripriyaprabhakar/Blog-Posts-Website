import jsonPlaceholder from "../apis/jsonPlaceholder.js";
import "babel-polyfill";

import _ from "lodash";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

export const fetchPosts = () => {
  return async dispatch => {
    const response = await jsonPlaceholder.get("/posts");

    dispatch({ type: "FETCH_POSTS", payload: response.data });
  };
};

export const fetchUser = id => {
  return async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: "FETCH_USER", payload: response.data });
  };
};

// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: 'FETCH_USER', payload: response.data });
// });

// const config = {
//   headers: {
//     "Content-Type": "application/json;charset=UTF-8"
//   },
//   data: {}
// };

// export const fetchPosts = () => {
//   return async dispatch => {
//     //(dispatch)
//     const response = await jsonPlaceholder.get("/posts", {
//       headers: { "Content-Type": "application/json" }
//     });

//     dispatch({ type: "FETCH_POSTS", payload: response });
//   };
// };
