import {
  ALBUM_LIST_REQUEST,
  ALBUM_LIST_SUCCESS,
  ALBUM_LIST_FAIL,
  ALBUM_LIST_CLEANUP,
} from "../Constants/albumConstants";

const initialState = {
  loading: false,
  error: null,
  albums: [],
};

export const albumListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALBUM_LIST_REQUEST:
      return { ...state, loading: true };
    case ALBUM_LIST_SUCCESS:
      return { ...state, loading: false, albums: action.payload };
    case ALBUM_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ALBUM_LIST_CLEANUP:
      return { ...initialState };
    default:
      return state;
  }
};
