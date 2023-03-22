import "./details.scss";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data: movieData, loading: movieLoading } = useFetch(
    `/${mediaType}/${id}/videos`
  );
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <DetailsBanner
        video={
          movieData?.results?.filter(
            (vid) => vid.name === "Official Trailer"
          )[0] || movieData?.results?.[0]
        }
        crew={credits?.crew}
      />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={movieData} loading={movieLoading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
