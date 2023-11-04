import axios from "axios";
import { getItemFromLocalStorage } from "./local-storage";
import { LOCALSTORAGE_TOKEN_KEY } from "./constants";

const BASE_URL = process.env.REACT_APP_PRODUCTION === 'true' ? process.env.REACT_APP_PRODUCTION_BACKEND_URL : process.env.REACT_APP_BACKEND_API_BASE_URL;
const iMoviesToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

const headers = {
  Authorization: `Bearer ${iMoviesToken}`,
};

export const fetchDataFromBackendApi = async(url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const postDataToBackendApi = async(url, params) => {
    try{
      const res = await axios.post(BASE_URL + url, {
          headers,
          params
      });
      return res;
    }catch(err){
      throw err.response.data.message;
    }
}
