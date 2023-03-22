import "./header.scss";

import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ContentWrapper from "../contentWrapper/ContentWrapper";

const Header = () => {
  const [show, setShow] = useState("transparent");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileView, setMobileView] = useState(false);
  const [input, setInput] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  //When we change the page, we are setting scroll to zero
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 300) {
      if (window.scrollY > lastScrollY && !mobileView) {
        setShow("hide");
      } else {
        setShow("solid");
      }
    } else {
      setShow("transparent");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const navigationHandler = (type) => {
    navigate(`/explore/${type}`);
    setMobileView(false);
    setShowSearch(false);
  };

  const toggleMobileView = () => {
    setMobileView(!mobileView);
    setShowSearch(false);
  };

  const toggleShowSearch = () => {
    setShowSearch(!showSearch);
    setMobileView(false);
  };

  const keyChange = (e) => {
    if (e.key === "Enter" && input.length > 0) {
      navigate(`/search/${input}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const goHome = () => {
    navigate("/");
    setShowSearch(false);
    setMobileView(false);
  };

  return (
    <header className={`header ${mobileView ? "mobile-view" : ""} ${show}`}>
      <ContentWrapper className="content-wrapper">
        <div className="logo" onClick={goHome}>
          <h2>iMovies</h2>
        </div>
        <ul className="menu-items">
          <li className="menu-item" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menu-item" onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>
          <li className="menu-item search-icon">
            <HiOutlineSearch onClick={toggleShowSearch} />
          </li>
        </ul>
        <div className="mobile-menu-items">
          <HiOutlineSearch onClick={toggleShowSearch} />
          {mobileView ? (
            <VscChromeClose onClick={toggleMobileView} />
          ) : (
            <SlMenu onClick={toggleMobileView} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="search-bar">
          <ContentWrapper>
            <div className="search-input">
              <input
                type="text"
                placeholder="Enter a movie/tv show..."
                onChange={(e) => setInput(e.target.value)}
                onKeyUp={keyChange}
              />
              <VscChromeClose
                style={{ color: "black" }}
                onClick={toggleShowSearch}
              />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
