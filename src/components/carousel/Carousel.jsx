import "./carousel.scss";

import { useRef, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

const Carousel = ({ data, loading, endpoint, title }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigation = (direction) => {
    const container = carouselContainer.current;
    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skeletonItem = () => {
    return (
      <div className="skeleton-item">
        <div className="poster-block skeleton"></div>
        <div className="text-block">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  const navigateTo = (media, id) => {
    media = media ? media : endpoint;
    navigate(`/${media}/${id}`);
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carousel-title">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carousel-left-nav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carousel-right-nav arrow"
          onClick={() => navigation("right")}
        />
        {loading ? (
          <div className="loading-skeleton">
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
          </div>
        ) : (
          <div className="carousel-items" ref={carouselContainer}>
            {data?.map((item) => {
              const posterURL = item.poster_path
                ? url + item.poster_path
                : PosterFallback;
              return (
                <div
                  className="carousel-item"
                  key={item.id}
                  onClick={() => navigateTo(item.media_type, item.id)}
                >
                  <div className="poster-block">
                    <Img src={posterURL} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="text-block">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_Date).format("MMM d, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
