import "./heroBanner.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  // for background
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const keyChange = (e) => {
    if (e.key === "Enter") {
      fetchFromAPI();
    }
  };

  const fetchFromAPI = () => {
    if (input.length > 0) {
      navigate(`/search/${input}`);
    }
  };

  return (
    <div className="hero-banner">
      {!loading && (
        <div className="backdrop-image">
          <Img src={background ? background : ""} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="hero-banner-content">
          <span className="title">Welcome.</span>
          <span className="subtitle">
            Millions of Movies, TV shows to discover. Explore now.
          </span>
          <div className="search-input">
            <input
              type="text"
              placeholder="Enter a movie/tv show..."
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={keyChange}
            />
            <button onClick={fetchFromAPI}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
