const INTIAL_STATE = [];

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return [...state, action.payload];
    //   case "SIGN_OUT":
    //     return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};
