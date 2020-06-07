import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  //
  LIKE_POST,
  UNLIKE_POST,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
  likes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
      };

    //
    case LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            user: state.profile.user,
            postId: action.payload._id,
          },
        ],
      };
    case UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter((like) => like.postId !== action.payload._id),
      };
    default:
      return state;
  }
}
