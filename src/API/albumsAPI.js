import * as axios from "axios";

const apiAlbumsURL = "https://jsonplaceholder.typicode.com/albums/";

const albumsAPI = axios.create({
  baseURL: apiAlbumsURL,
  responseType: "json",
});

export default albumsAPI;
