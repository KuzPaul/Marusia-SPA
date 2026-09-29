import type { FC } from "react";
import type { Movie } from "@/shared/types/moviesTypes";
import styles from "./InfoMovie.module.scss";

interface InfoMovieProps {
  movie: Movie;
}

export const InfoMovie: FC<InfoMovieProps> = ({ movie }) => {
  return (
    <div className={styles["info-movie"]}>
      <h2 className={styles["info-movie__title"]}>О фильме</h2>
      <ul className={styles["info-movie__list"]}>
        <li className={styles["info-movie__item"]}>
          <div className={styles["info-movie__block"]}>
            <span className={styles["info-movie__text"]}>Язык оригинала</span>
            <span className={styles["info-movie__border-bottom"]}></span>
            <span className={styles["info-movie__value"]}>
              {movie.language?.toUpperCase() || "—"}
            </span>
          </div>
        </li>
        <li className={styles["info-movie__item"]}>
          <div className={styles["info-movie__block"]}>
            <span className={styles["info-movie__text"]}>Бюджет</span>
            <span className={styles["info-movie__border-bottom"]}></span>
            <span className={styles["info-movie__value"]}>
              {movie.budget
                ? `${Number(movie.budget).toLocaleString()} $`
                : "Бюджет не известен"}
            </span>
          </div>
        </li>
        <li className={styles["info-movie__item"]}>
          <div className={styles["info-movie__block"]}>
            <span className={styles["info-movie__text"]}>Выручка</span>
            <span className={styles["info-movie__border-bottom"]}></span>
            <span className={styles["info-movie__value"]}>
              {movie.revenue
                ? `${Number(movie.revenue).toLocaleString()} $`
                : "Выручка неизвестна"}
            </span>
          </div>
        </li>
        <li className={styles["info-movie__item"]}>
          <div className={styles["info-movie__block"]}>
            <span className={styles["info-movie__text"]}>Режиссёр</span>
            <span className={styles["info-movie__border-bottom"]}></span>
            <span className={styles["info-movie__value"]}>
              {movie.director || "Неизвестный режисер"}
            </span>
          </div>
        </li>
        <li className={styles["info-movie__item"]}>
          <div className={styles["info-movie__block"]}>
            <span className={styles["info-movie__text"]}>Продакшен</span>
            <span className={styles["info-movie__border-bottom"]}></span>
            <span className={styles["info-movie__value"]}>
              {movie.production || "Неизвестно"}
            </span>
          </div>
        </li>
        <li className={styles["info-movie__item"]}>
          <div className={styles["info-movie__block"]}>
            <span className={styles["info-movie__text"]}>Награды</span>
            <span className={styles["info-movie__border-bottom"]}></span>
            <span className={styles["info-movie__value"]}>
              {movie.awardsSummary || "Наград нет"}
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};
