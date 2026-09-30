import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { queryKeys } from "@/shared/api/queryKeys";
import { getSearchMovie } from "@/modules/movies/api/getMovies";
import { colorRating } from "@/shared/lib/colorRating";
import { formatRuntime } from "@/shared/lib/convertRunTime";
import { useNavigate } from "react-router-dom";
import { cn } from "@/shared/lib/cn";
import styles from "./WidgetSearch.module.scss";

interface titleProps {
  title: string;
  onSelect: () => void;
}

const ratingToneClass = {
  red: styles["header-search__rating--red"],
  silver: styles["header-search__rating--silver"],
  green: styles["header-search__rating--green"],
  gold: styles["header-search__rating--gold"],
};

export const WidgetSearch: FC<titleProps> = ({ title, onSelect }) => {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: queryKeys.search(title),
    queryFn: () => getSearchMovie(title),
  });

  const movies = data;
  const handelNavigate = (id: number) => {
    onSelect();
    navigate(`/movie/${id}`);
  };

  return (
    <ul className={styles["header-search__list"]}>
      {movies?.map((movie) => (
        <li
          key={movie.id}
          className={styles["header-search__item"]}
          onClick={() => handelNavigate(movie.id)}
        >
          <img
            className={styles["header-search__img-home"]}
            src={movie?.posterUrl || ""}
            alt="Постер фильма"
            width={40}
            height={52}
            loading="lazy"
          />
          <div className={styles["header-search__block"]}>
            <div className={styles["header-search__main"]}>
              <span
                className={cn(
                  styles["header-search__rating"],
                  ratingToneClass[colorRating(movie.tmdbRating)],
                )}
              >
                <span className={styles["header-search__rating-icon"]}></span>
                {movie.tmdbRating.toFixed(1)}
              </span>
              <span className={styles["header-search__year"]}>
                {movie.releaseYear}
              </span>
              <span className={styles["header-search__genre"]}>
                {movie.genres[0]}
              </span>
              <span className={styles["header-search__timeWatch"]}>
                {formatRuntime(movie.runtime)}
              </span>
            </div>
            <h3 className={styles["header-search__title"]}>{movie.title}</h3>
          </div>
        </li>
      ))}
    </ul>
  );
};
