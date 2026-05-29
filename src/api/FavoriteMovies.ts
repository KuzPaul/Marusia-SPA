import { API } from "../constants/api";
import { MovieListSchema, type MovieList } from "../types/moviesTypes";
import { validateResponse } from "../utils/validate";

//получение избранных фильмов по id
export const getFavoriteMovies = async (): Promise<MovieList> => {
  return fetch(`${API}/favorites`, {
    credentials: "include",
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => MovieListSchema.parse(data));
};

//добавление фильма
export const addFavoriteMovie = async (id: number) => {
  return fetch(`${API}/favorites`, {
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
  return fetch(`${API}/favorites/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  }).then(validateResponse);
};
