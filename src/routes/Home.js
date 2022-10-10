import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import Header from "../components/Header";
import styles from "../components/Home.module.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    // const response = await fetch(
    //   `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.2&sort_by=year`
    // );
    // const json = await response.json();
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.2&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      <Header />
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className={styles.movies_wrap}>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              coverImage={movie.large_cover_image}
              genres={movie.genres}
              rating={movie.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
