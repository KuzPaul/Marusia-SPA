import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/api/queryKeys";
import { getMoviesTop, getRandomMovie } from "@/modules/movies/api/getMovies";
import { BannerHome, MoviesTop } from "@/modules/movies";
import { Loader } from "@/shared/ui/Loader";
import styles from "./MainPage.module.scss";

export const MainPage = () => {
  const { data, isFetching, isPending, isError, refetch } = useQuery({
    queryFn: () => getRandomMovie(),
    queryKey: queryKeys.randomMovie,
  });

  const {
    data: moviesTop,
    isPending: isTopPending,
    isError: isTopError,
    refetch: refetchTop,
  } = useQuery({
    queryKey: queryKeys.top10,
    queryFn: () => getMoviesTop(),
  });

  return (
    <>
      <section className={styles["main-page"]}>
        {isPending ? (
          <Loader />
        ) : isError || !data ? (
          <p className={styles["main-page__error"]} role="alert">
            Не удалось загрузить фильм.{" "}
            <button type="button" onClick={() => refetch()}>
              Повторить
            </button>
          </p>
        ) : (
          <BannerHome movie={data} isLoading={isFetching} componentHome />
        )}
      </section>
      {isTopPending ? (
        <Loader />
      ) : isTopError || !moviesTop ? (
        <p className={styles["main-page__error"]} role="alert">
          Не удалось загрузить топ-10.{" "}
          <button type="button" onClick={() => refetchTop()}>
            Повторить
          </button>
        </p>
      ) : (
        <MoviesTop moviesTop={moviesTop} />
      )}
    </>
  );
};
