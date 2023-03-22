import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

let TMDB_TOKEN = process.env.REACT_APP_TMDB_TOKEN;
TMDB_TOKEN = TMDB_TOKEN.substring(1, TMDB_TOKEN.length - 2);

const headers = {
  Authorization: `Bearer ${TMDB_TOKEN}`,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers: headers,
      params: params,
    });
    // 2nd argument is options or configuration
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
