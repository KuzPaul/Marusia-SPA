import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../api/queryKeys";
import { getMoviesTop, getRandomMovie } from "../../api/getMovies";
import { BannerHome } from "../../Components/BannerHome";
import { MoviesTop } from "../../Components/MoviesTop";
import { Loader } from "../../Components/UI/Loader";
import "./MainPage.scss";

export const MainPage = () => {
  const {
    data,
    isFetching,
    isPending,
    isError,
    refetch,
  } = useQuery({
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
      <section className="main-page">
        {isPending ? (
          <Loader />
        ) : isError || !data ? (
          <p className="main-page__error" role="alert">
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
        <p className="main-page__error" role="alert">
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
