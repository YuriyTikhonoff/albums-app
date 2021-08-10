import * as axios from "axios";

const apiPhotosURL = "https://jsonplaceholder.typicode.com/photos/";

const photosAPI = axios.create({
  baseURL: apiPhotosURL,
  responseType: "json",
});

export default photosAPI;
