const INTIAL_STATE = [];

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_POSTS":
      return (state = action.payload);
    case "EDIT_POST":
      return state.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );

    default:
      return state;
  }
};
