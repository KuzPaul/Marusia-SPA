import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/api/queryKeys";
import { getGenreMovies } from "@/modules/movies/api/getMovies";
import { Loader } from "@/shared/ui/Loader";
import ExitIcon from "@/assets/icons/exitGenre.svg?react";
import { Button } from "@/shared/ui/Button";
import { Link, useParams } from "react-router-dom";
import { GENRE_TRANSLATIONS } from "@/shared/constants/genres";
import { MovieCard } from "@/shared/ui/MovieCard";
import { cn } from "@/shared/lib/cn";
import styles from "./MoviesGenreList.module.scss";

type GenreListInnerProps = {
  genre: string;
};

const GenreListInner = ({ genre }: GenreListInnerProps) => {
  const { data, isFetching, isPending, fetchNextPage } = useInfiniteQuery({
    queryKey: queryKeys.genre(genre),
    queryFn: ({ pageParam }) => getGenreMovies(genre, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length ? pages.length + 1 : undefined,
  });

  const allFilm = data?.pages.flat() ?? [];

  return (
    <>
      <ul className={styles["movies-genre__list"]}>
        {allFilm.map((item) => (
          <li key={item.id} className={styles["movies-genre__item"]}>
            <MovieCard
              id={item.id}
              poster={item.posterUrl}
              classNameImg={styles["movies-genre__img"]}
              classNameLink={styles["movies-genre__movie-link"]}
            />
          </li>
        ))}
      </ul>
      {isPending ? <Loader /> : ""}
      {data?.pages.at(-1)?.length ? (
        <Button
          className={cn("button", styles["movies-genre__button"])}
          aria-label="показать еще"
          onClick={() => fetchNextPage()}
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
    <section className={styles["movies-genre"]}>
      <Link
        className={styles["movies-genre__link"]}
        to={"/genres"}
        aria-label="Кнопка назад"
      >
        <ExitIcon className={styles["movies-genre__icon"]} />
        <h1 className={styles["movies-genre__title"]}>
          {GENRE_TRANSLATIONS[genre]}
        </h1>
      </Link>
      <GenreListInner key={genre} genre={genre} />
    </section>
  );
};
