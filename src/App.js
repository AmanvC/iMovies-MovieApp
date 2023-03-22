import { getApiConfiguration, getGenres } from "./redux/homeSlice";
import { fetchDataFromApi } from "./utils/api";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import Loader from "./components/loader/Loader";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = async () => {
    const res = await fetchDataFromApi("/configuration");
    const url = res?.images?.secure_base_url + "original";
    dispatch(getApiConfiguration(url));
  };

  const genresCall = async () => {
    let promises = [];
    const endpoints = ["tv", "movie"];
    let allGenres = {};

    endpoints.forEach((endpoint) => {
      promises.push(fetchDataFromApi(`/genre/${endpoint}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => {
        allGenres[item.id] = item.name;
      });
    });
    dispatch(getGenres(allGenres));
  };

  let loading = true;
  const { data } = useFetch("/movie/upcoming");
  if (data) {
    loading = false;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
