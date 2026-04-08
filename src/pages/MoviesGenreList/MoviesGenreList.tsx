import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../api/queryKeys";
import { getGenreMovies } from "../../api/getMovies";
import { Loader } from "../../Components/UI/Loader";
import ExitIcon from "../../assets/icons/exitGenre.svg?react";
import { Button } from "../../Components/UI/Button";
import { useEffect, useState } from "react";
import "./MoviesGenreList.scss";
import { Link, useParams } from "react-router-dom";
import { GENRE_TRANSLATIONS } from "../../constants/genres";
import type { MovieList } from "../../types/moviesTypes";
import { MovieCard } from "../../Components/UI/MovieCard/MovieCard";

type GenreListInnerProps = {
  genre: string;
};

const GenreListInner = ({ genre }: GenreListInnerProps) => {
  const [page, setPage] = useState(1);
  const [allFilm, setAllFilm] = useState<MovieList>([]);

  const { data, isFetching, isLoading } = useQuery({
    queryKey: queryKeys.genre(genre, page),
    queryFn: () => getGenreMovies(genre, page),
  });

  useEffect(() => {
    if (!data?.length) return;
    setAllFilm((prev) => (page === 1 ? data : [...prev, ...data]));
  }, [data, page]);

  return (
    <>
      <ul className="movies-genre__list">
        {allFilm.map((item) => (
          <li key={item.id} className="movies-genre__item">
            <MovieCard
              id={item.id}
              poster={item.posterUrl}
              classNameImg="movies-genre__img"
              classNameLink="movies-genre__movie-link"
            />
          </li>
        ))}
      </ul>
      {isLoading ? <Loader /> : ""}
      {data?.length ? (
        <Button
          className="button movies-genre__button"
          aria-label="показать еще"
          onClick={() => setPage((p) => p + 1)}
          disabled={isFetching}
        >
          Показать еще
        </Button>
      ) : (
        ""
      )}
    </>
  );
};

export const MoviesGenreList = () => {
  const { genreName } = useParams();
  const genre = genreName || "drama";

  return (
    <section className="movies-genre">
      <Link
        className="movies-genre__link"
        to={"/genres"}
        aria-label="Кнопка назад"
      >
        <ExitIcon className="movies-genre__icon" />
        <h1 className="movies-genre__title">{GENRE_TRANSLATIONS[genre]}</h1>
      </Link>
      <GenreListInner key={genre} genre={genre} />
    </section>
  );
};
