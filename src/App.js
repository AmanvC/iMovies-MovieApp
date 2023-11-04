import { getApiConfiguration, getGenres } from "./redux/homeSlice";
import { fetchDataFromApi } from "./utils/api";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import Login from "./components/login/Login";

import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import Loader from "./components/loader/Loader";
import User from "./pages/user/User";
import Register from "./components/register/Register";
import UserHome from "./components/userHome/UserHome";
import { AuthContext } from "./context/AuthContext";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {currentUser} = useContext(AuthContext);

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
      return genres.forEach((item) => {
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

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/user/login" />;
    }
    return children;
  };

  return (
    <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path=":mediaType/:id" element={<Details />} />
          <Route path="search/:query" element={<SearchResult />} />
          <Route path="explore/:mediaType" element={<Explore />} />
          <Route path="user" element={<User />}>
            <Route path="login" 
              element={
                currentUser ? (
                  <Navigate to="/user/home" />
                ) : (
                  <Login />
                )
              }
            />
            <Route path="register" 
              element={
                currentUser ? (
                  <Navigate to="/user/home" />
                ) : (
                  <Register />
                )
              }
            />
            <Route path="home" 
              element={
                <ProtectedRoute>
                  <UserHome />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {/* <Footer /> */}
    </div>
  );
}

export default App;
