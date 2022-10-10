import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";

function Movie({ id, title, coverImage, genres, rating }) {
  return (
    <div className={styles.card_wrap}>
      <div className={styles.img_wrap}>
        <Link to={`/movie/${id}`}>
          <img src={coverImage} alt={title} />
        </Link>
      </div>
      <div className={styles.text_wrap}>
        <h2>
          <Link to={`/movie/${id}`}>
            {title.length > 20 ? `${title.slice(0, 24)}...` : title}
          </Link>
        </h2>
        <ul>
          {genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
        <p className={styles.rating}>&#9733; {rating} / 10</p>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  coverImage: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  rating: PropTypes.number,
};

export default Movie;
