import type { FC } from "react";
import type { MovieList } from "@/shared/types/moviesTypes";
import { MovieCard } from "@/shared/ui/MovieCard";
import styles from "./MoviesTop.module.scss";

interface moviesTopProps {
  moviesTop: MovieList;
}

export const MoviesTop: FC<moviesTopProps> = ({ moviesTop }) => {
  return (
    <section className={styles["movies-top"]}>
      <h2 className={styles["movies-top__title"]}>Топ 10 фильмов</h2>
      <ul className={styles["movies-top__list"]}>
        {moviesTop.map((film, index) => (
          <li key={film.id} className={styles["movies-top__item"]}>
            <MovieCard
              id={film.id}
              poster={film.posterUrl}
              classNameImg={styles["movies-top__img"]}
              classNameLink={styles["movies-top__picture"]}
            >
              <span className={styles["movies-top__number"]}>{index + 1}</span>
            </MovieCard>
          </li>
        ))}
      </ul>
    </section>
  );
};
