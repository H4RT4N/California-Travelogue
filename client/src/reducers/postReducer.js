import ACTION_TYPES from "../actions/types";

const initialState = {
  posts: [],
  post: {}
};

export default function Reduce(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL:
    case ACTION_TYPES.FETCH_POSTS:
      return {
        ...state,
        posts: [...action.payload],
      };
    case ACTION_TYPES.FETCH_POST:
      return {
        ...state,
        post: action.payload,
      };
    case ACTION_TYPES.CREATE:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case ACTION_TYPES.UPDATE:
    case ACTION_TYPES.LIKE:
    case ACTION_TYPES.COMMENT:
      return {
        ...state,
        posts: state.posts.map((p) =>
          p._id == action.payload._id ? action.payload : p
        ),
      };
    case ACTION_TYPES.DELETE:
      return {
        ...state,
        posts: state.posts.filter((p) => p._id != action.payload),
      };
    default:
      return state;
  }
}
