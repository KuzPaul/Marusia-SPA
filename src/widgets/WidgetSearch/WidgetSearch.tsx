import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { queryKeys } from "../../api/queryKeys";
import { getSearchMovie } from "../../api/getMovies";
import { colorRating } from "../../utils/colorRating";
import { formatRuntime } from "../../utils/convertRunTime";
import "./WidgetSearch.scss";
import { useNavigate } from "react-router-dom";

interface titleProps {
  title: string;
  setTitle: (title: string) => void;
}

export const WidgetSearch: FC<titleProps> = ({ title, setTitle }) => {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: queryKeys.search(title),
    queryFn: () => getSearchMovie(title),
  });

  const movies = data;
  const handelNavigate = (id: number) => {
    setTitle("");
    navigate(`/movie/${id}`);
  };

  return (
    <ul className="header-search__list">
      {movies?.map((movie) => (
        <li
          key={movie.id}
          className="header-search__item"
          onClick={() => handelNavigate(movie.id)}
        >
          <img
            className="header-search__img-home"
            src={movie?.posterUrl || ""}
            alt="Постер фильма"
            width={40}
            height={52}
            loading="lazy"
          />
          <div className="header-search__block">
            <div className="header-search__main">
              <span
                className={`header-search__rating ${colorRating(movie.tmdbRating)}`}
              >
                <span className="header-search__rating-icon"></span>
                {movie.tmdbRating.toFixed(1)}
              </span>
              <span className="header-search__year">{movie.releaseYear}</span>
              <span className="header-search__genre">{movie.genres[0]}</span>
              <span className="header-search__timeWatch">
                {formatRuntime(movie.runtime)}
              </span>
            </div>
            <h3 className="header-search__title">{movie.title}</h3>
          </div>
        </li>
      ))}
    </ul>
  );
};
