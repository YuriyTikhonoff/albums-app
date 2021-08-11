import { getAlbumsOfUser } from "../../Api/albumsAPI";

import {
  ALBUM_LIST_REQUEST,
  ALBUM_LIST_SUCCESS,
  ALBUM_LIST_FAIL,
  ALBUM_LIST_CLEANUP,
} from "../Constants/albumConstants";

export const fetchAlbums = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: ALBUM_LIST_REQUEST,
    });

    const albums = await getAlbumsOfUser(userId);

    dispatch({
      type: ALBUM_LIST_SUCCESS,
      payload: albums,
    });
  } catch (error) {
    dispatch({
      type: ALBUM_LIST_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};

export const cleanUp = () => (dispatch) => {
  dispatch({
    type: ALBUM_LIST_CLEANUP,
  });
};
