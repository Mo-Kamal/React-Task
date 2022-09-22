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
  console.log("12");
  const response = await DataReq.get("/posts");
  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const editPost = (updatedValues) => {
  console.log("12s");
  return { type: "EDIT_POST", payload: updatedValues };
  // const response = await DataReq.get("/posts");
  // dispatch({ type: "EDIT_POST", payload: response.data });
};

export const fetchUsers = () => async (dispatch) => {
  console.log("12");
  const response = await DataReq.get("/users");
  dispatch({ type: "FETCH_USERS", payload: response.data });
};
