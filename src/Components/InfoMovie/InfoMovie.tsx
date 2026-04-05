import type { FC } from "react";
import "./InfoMovie.scss";
import type { Movie } from "../../types/moviesTypes";

interface InfoMovieProps {
  movie: Movie;
}

export const InfoMovie: FC<InfoMovieProps> = ({ movie }) => {
  return (
    <div className="info-movie">
      <h2 className="info-movie__title">О фильме</h2>
      <ul className="info-movie__list">
        <li className="info-movie__item">
          <div className="info-movie__block">
            <span className="info-movie__text">Язык оригинала</span>
            <span className="info-movie__border-bottom"></span>
            <span className="info-movie__value">
              {movie.language?.toUpperCase() || "—"}
            </span>
          </div>
        </li>
        <li className="info-movie__item">
          <div className="info-movie__block">
            <span className="info-movie__text">Бюджет</span>
            <span className="info-movie__border-bottom"></span>
            <span className="info-movie__value">
              {movie.budget
                ? `${Number(movie.budget).toLocaleString()} $`
                : "Бюджет не известен"}
            </span>
          </div>
        </li>
        <li className="info-movie__item">
          <div className="info-movie__block">
            <span className="info-movie__text">Выручка</span>
            <span className="info-movie__border-bottom"></span>
            <span className="info-movie__value">
              {movie.revenue
                ? `${Number(movie.revenue).toLocaleString()} $`
                : "Выручка неизвестна"}
            </span>
          </div>
        </li>
        <li className="info-movie__item">
          <div className="info-movie__block">
            <span className="info-movie__text">Режиссёр</span>
            <span className="info-movie__border-bottom"></span>
            <span className="info-movie__value">
              {movie.director || "Неизвестный режисер"}
            </span>
          </div>
        </li>
        <li className="info-movie__item">
          <div className="info-movie__block">
            <span className="info-movie__text">Продакшен</span>
            <span className="info-movie__border-bottom"></span>
            <span className="info-movie__value">
              {movie.production || "Неизвестно"}
            </span>
          </div>
        </li>
        <li className="info-movie__item">
          <div className="info-movie__block">
            <span className="info-movie__text">Награды</span>
            <span className="info-movie__border-bottom"></span>
            <span className="info-movie__value">
              {movie.awardsSummary || "Наград нет"}
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};
