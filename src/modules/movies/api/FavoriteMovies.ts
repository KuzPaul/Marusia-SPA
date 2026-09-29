import { apiUrl } from "@/shared/constants/api";
import { MovieListSchema, type MovieList } from "@/shared/types/moviesTypes";
import { validateResponse } from "@/shared/lib/validate";

//получение избранных фильмов по id
export const getFavoriteMovies = async (): Promise<MovieList> => {
  return fetch(apiUrl("/favorites"), {
    credentials: "include",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => MovieListSchema.parse(data));
};

export const addFavoriteMovie = async (id: number) => {
  return fetch(apiUrl("/favorites"), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ id: String(id) }),
    credentials: "include",
  }).then(validateResponse);
};

//удаление избранного фильма
export const deleteFavoriteMovie = async (id: number) => {
  return fetch(apiUrl(`/favorites/${id}`), {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  }).then(validateResponse);
};
