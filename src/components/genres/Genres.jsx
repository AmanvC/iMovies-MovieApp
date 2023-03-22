import "./genres.scss";
import { useSelector } from "react-redux";

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);

  const arr = data?.map((x) => {
    return genres[x];
  });

  return (
    <div className="genres">
      {arr?.map((genre, index) => (
        <div className="genre" key={index}>
          {genre}
        </div>
      ))}
    </div>
  );
};

export default Genres;
