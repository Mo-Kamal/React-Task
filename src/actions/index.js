import DataReq from "../api/DataReq";

export const signIn = (userData) => {
  return {
    type: "SIGN_IN",
    payload: userData,
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const fetchPosts = () => async (dispatch) => {
  const response = await DataReq.get("/posts");
  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const editPost = (updatedValues) => {
  return { type: "EDIT_POST", payload: updatedValues };
};

export const fetchUsers = () => async (dispatch) => {
  const response = await DataReq.get("/users");
  dispatch({ type: "FETCH_USERS", payload: response.data });
};
