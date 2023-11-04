import { useEffect, useState } from "react";
import { fetchDataFromBackendApi, postDataToBackendApi } from "../utils/backend-api";

const useFetchBackend = (url, payload, type) => { //type = GET, POST
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    if(type === 'GET'){
			fetchDataFromBackendApi(url, payload)
				.then((res) => {
					setLoading(false);
					setData(res);
				})
				.catch((err) => {
					setLoading(false);
					setError("Something went wrong!");
				});
    }else if(type === 'POST'){
			postDataToBackendApi(url, payload)
				.then((res) => {
					setLoading(false);
					setData(res);
				})
				.catch((err) => {
					setLoading(false);
					setError("Something went wrong!");
				});
		}

  }, [url]);

  return { data, loading, error };
};

export default useFetchBackend;
