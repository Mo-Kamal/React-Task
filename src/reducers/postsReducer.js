const INTIAL_STATE = [];

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_POSTS":
      return (state = action.payload);
    case "EDIT_POST":
      const objIndex = state.findIndex((obj) => obj.id == action.payload.id);
      console.log(state[objIndex]);
      return state.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    // return [...state, (state[objIndex] = action.payload)];
    //   case "SIGN_OUT":
    //     return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};
