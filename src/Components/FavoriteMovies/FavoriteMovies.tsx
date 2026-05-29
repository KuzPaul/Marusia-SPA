import type { FC } from "react";
import type { MovieList } from "../../types/moviesTypes";
import { Button } from "../UI/Button";
import IconDel from "../../assets/icons/btn__reset.svg?react";
import "./FavoriteMovies.scss";
import type { UseMutationResult } from "@tanstack/react-query";
import { queryKeys } from "../../api/queryKeys";
import { queryClient } from "../../utils/queryClient";
import { MovieCard } from "../UI/MovieCard/MovieCard";

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
    <ul className="favorite-list">
      {favorite?.map((movie) => (
        <li key={movie.id} className="favorite-list__item">
          <MovieCard
            id={movie.id}
            poster={movie.posterUrl}
            classNameImg="favorite-list__img"
            classNameLink="favorite-list__picture"
          />
          <Button
            className="favorite-list__btn-delete"
            onClick={() => handleDelete(movie.id)}
            aria-label="удалить фильм"
          >
            <IconDel />
          </Button>
        </li>
      ))}
    </ul>
  );
};
