import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3", //TMDB URL
});

export default instance;
