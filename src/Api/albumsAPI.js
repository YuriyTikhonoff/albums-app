import * as axios from "axios";

const apiAlbumsURL = "https://jsonplaceholder.typicode.com/albums/";

const albumsAPI = axios.create({
  baseURL: apiAlbumsURL,
  responseType: "json",
});

export const getAlbumsOfUser = async (userId) => {
  const { data: albums } = await albumsAPI.get("", {
    params: { userId },
  });
  return albums;
};

export default albumsAPI;
