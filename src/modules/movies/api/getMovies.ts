import z from "zod";
import {
  MovieListSchema,
  MoviesSchema,
  type Movie,
  type MovieList,
} from "@/shared/types/moviesTypes";
import { validateResponse } from "@/shared/lib/validate";
import { apiUrl } from "@/shared/constants/api";

const GenresSchema = z.array(z.string());

//получение топ 10 фильмов
export const getMoviesTop = async (): Promise<MovieList> => {
  return fetch(apiUrl("/movie/top10"))
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => MovieListSchema.parse(data));
};

//получение рандомного фильма
export const getRandomMovie = async (): Promise<Movie> => {
  return fetch(apiUrl("/movie/random"))
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => MoviesSchema.parse(data));
};

//получение жанров
export const getGenres = async (): Promise<string[]> => {
  return fetch(apiUrl("/movie/genres"))
    .then(validateResponse)
    .then((data) => data.json())
    .then((genres) => GenresSchema.parse(genres));
};

//получение фильма по индексу
export const getMovieIndex = async (id: number): Promise<Movie> => {
  return fetch(apiUrl(`/movie/${id}`))
    .then(validateResponse)
    .then((data) => data.json())
    .then((movie) => MoviesSchema.parse(movie));
};

//получение фильмов по жанрам
export const getGenreMovies = async (
  genre: string,
  page: number,
): Promise<MovieList> => {
  return fetch(apiUrl(`/movie?count=10&page=${page}&genre=${genre}`))
    .then(validateResponse)
    .then((data) => data.json())
    .then((data) => MovieListSchema.parse(data));
};

//получения фильма из поля поиска
export const getSearchMovie = async (title: string): Promise<MovieList> => {
  return fetch(apiUrl(`/movie?count=5&title=${title}`))
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => MovieListSchema.parse(data));
};
