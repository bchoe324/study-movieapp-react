import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import styles from "../components/Detail.module.css";

function Trailer({ trCode, setShowing }) {
  const onClose = () => {
    setShowing((prev) => !prev);
  };
  return (
    <div className={styles.trailer}>
      <div onClick={onClose} className={styles.overlay}></div>
      <button onClick={onClose} className={styles.close} title="close">
        close
      </button>
      <iframe
        src={`https://www.youtube.com/embed/${trCode}?rel=0&wmode=transparent&border=0&autoplay=1&iv_load_policy=3`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [showing, setShowing] = useState(false);
  const onClick = (event) => {
    event.preventDefault();
    setShowing((prev) => !prev);
  };
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div className={styles.movie}>
      <Header />
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="movie_wrap">
          <div className={styles.bg_wrap}>
            <div
              className={styles.bg}
              style={{
                background: `url(${movie.background_image_original})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              alt="background"
            ></div>
            <div className={styles.bg_blur}></div>
          </div>
          <div className={styles.content_wrap}>
            <div className={styles.title_row}>
              <h2 className={styles.title}>{movie.title}</h2>
            </div>
            <div className={styles.info_row}>
              <p className={styles.year}>{`${movie.year}`}</p>
              <ul>
                {movie.genres.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>
            <div className={styles.img_wrap}>
              <img
                className={styles.poster}
                src={movie.medium_cover_image}
                alt={movie.title}
              />
            </div>
            <div className={styles.rating_row}>
              <p>&#9733; {movie.rating} / 10</p>
            </div>
            <div className={styles.plot_row}>
              <h3 className={styles.h3}>Plot</h3>
              <p>{movie.description_full}</p>
            </div>
            <div className={styles.trailer_row}>
              <h3 className={styles.h3}>Trailer</h3>
              <div className={styles.trailer_wrap}>
                <a
                  onClick={onClick}
                  href={`https://www.youtube.com/embed/${movie.yt_trailer_code}?rel=0&wmode=transparent&border=0&autoplay=1&iv_load_policy=3`}
                >
                  <img
                    alt="Trailer"
                    src={`https://img.youtube.com/vi/${movie.yt_trailer_code}/mqdefault.jpg`}
                  />
                  <span className={styles.play_icon}></span>
                </a>
              </div>
            </div>
          </div>
          {showing ? (
            <Trailer trCode={movie.yt_trailer_code} setShowing={setShowing} />
          ) : null}
        </div>
      )}
    </div>
  );
}
export default Detail;
