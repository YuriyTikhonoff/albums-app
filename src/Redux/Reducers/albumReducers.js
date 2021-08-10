import {
  ALBUM_LIST_REQUEST,
  ALBUM_LIST_SUCCESS,
  ALBUM_LIST_FAIL,
} from "../Constants/albumConstants";

export const albumListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALBUM_LIST_REQUEST:
      return { loading: true, albumList: [] };
    case ALBUM_LIST_SUCCESS:
      return { loading: false, albumList: action.payload };
    case ALBUM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
