import type { FC } from "react";
import type { MovieList } from "@/shared/types/moviesTypes";
import { Button } from "@/shared/ui/Button";
import IconDel from "@/assets/icons/btn__reset.svg?react";
import type { UseMutationResult } from "@tanstack/react-query";
import { queryKeys } from "@/shared/api/queryKeys";
import { queryClient } from "@/shared/lib/queryClient";
import { MovieCard } from "@/shared/ui/MovieCard";
import styles from "./FavoriteMovies.module.scss";

interface propsFavorite {
  del: UseMutationResult<Response, Error, number, unknown>;
  favorite: MovieList | undefined;
}

export const FavoriteMovies: FC<propsFavorite> = ({ del, favorite }) => {
  const handleDelete = (id: number) => {
    queryClient.setQueryData(queryKeys.favorite, (old: MovieList | undefined) => {
      return old?.filter((movie) => movie.id !== id);
    });
    del.mutate(id, {
      onError: () =>
        queryClient.invalidateQueries({ queryKey: queryKeys.favorite }),
    });
  };

  return (
    <ul className={styles["favorite-list"]}>
      {favorite?.map((movie) => (
        <li key={movie.id} className={styles["favorite-list__item"]}>
          <MovieCard
            id={movie.id}
            poster={movie.posterUrl}
            classNameImg={styles["favorite-list__img"]}
            classNameLink={styles["favorite-list__picture"]}
          />
          <Button
            className={styles["favorite-list__btn-delete"]}
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              handleDelete(movie.id);
            }}
            aria-label="удалить фильм"
          >
            <IconDel />
          </Button>
        </li>
      ))}
    </ul>
  );
};
