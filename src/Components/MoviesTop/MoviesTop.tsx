import type { FC } from "react";
import "./MoviesTop.scss";
import type { MovieList } from "../../types/moviesTypes";
import { MovieCard } from "../UI/MovieCard/MovieCard";

interface moviesTopProps {
  moviesTop: MovieList;
}

export const MoviesTop: FC<moviesTopProps> = ({ moviesTop }) => {
  return (
    <section className="movies-top">
      <h2 className="movies-top__title">Топ 10 фильмов</h2>
      <ul className="movies-top__list">
        {moviesTop.map((film, index) => (
          <li key={film.id} className="movies-top__item">
            <MovieCard
              id={film.id}
              poster={film.posterUrl}
              classNameImg="movies-top__img"
              classNameLink="movies-top__picture"
            >
              <span className="movies-top__number">{index + 1}</span>
            </MovieCard>
          </li>
        ))}
      </ul>
    </section>
  );
};
