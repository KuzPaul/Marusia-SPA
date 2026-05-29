import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import {
  addFavoriteMovie,
  deleteFavoriteMovie,
  getFavoriteMovies,
} from "../api/FavoriteMovies";
import { queryClient } from "../utils/queryClient";

export const useFavorite = () => {
  const addMoviesFavorite = useMutation({
    mutationFn: addFavoriteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.favorite });
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
    },
    onError: (err) => {
      console.error(err, " ошибка добавления");
    },
  });

  const deleteMoviesFavorite = useMutation({
    mutationFn: deleteFavoriteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.favorite });
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
    },
    onError: (err) => {
      console.error("ошибка удаления", err);
    },
  });

  const getMoviesFavorite = useQuery({
    queryFn: () => getFavoriteMovies(),
    queryKey: queryKeys.favorite,
    retry: false,
  });

  return { addMoviesFavorite, deleteMoviesFavorite, getMoviesFavorite };
};
