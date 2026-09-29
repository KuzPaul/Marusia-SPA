import { lazy, Suspense, useMemo, useState, type FC } from "react";
import { Button } from "@/shared/ui/Button";
import { formatRuntime } from "@/shared/lib/convertRunTime";
import { colorRating } from "@/shared/lib/colorRating";
import IconFill from "@/assets/icons/favoriteFilm.svg?react";
import IconBorder from "@/assets/icons/likeFilm.svg?react";
import RandomIcon from "@/assets/icons/randomFilm.svg?react";
import { queryKeys } from "@/shared/api/queryKeys";
import { queryClient } from "@/shared/lib/queryClient";
import { Loader } from "@/shared/ui/Loader";
import { Link } from "react-router-dom";
import type { Movie } from "@/shared/types/moviesTypes";
import { useFavorite } from "../../hooks/useFavorite";
import { useUser } from "@/modules/auth/hooks/useUser";
import { getYouTubeId } from "@/shared/lib/getYouTubeId";
import { cn } from "@/shared/lib/cn";
import styles from "./BannerHome.module.scss";

const AuthForm = lazy(() => import("@/modules/auth"));
const ModalTrailer = lazy(() => import("@/shared/ui/ModalTrailer"));

interface BannerProps {
  movie: Movie;
  isLoading: boolean;
  componentHome: boolean;
}

const ratingToneClass = {
  red: styles["home-page__rating--red"],
  silver: styles["home-page__rating--silver"],
  green: styles["home-page__rating--green"],
  gold: styles["home-page__rating--gold"],
};

export const BannerHome: FC<BannerProps> = ({
  movie,
  isLoading,
  componentHome = true,
}) => {
  const { addMoviesFavorite, deleteMoviesFavorite, getMoviesFavorite } =
    useFavorite();
  const { userInfo } = useUser();
  const [statusAuth, setAuth] = useState<boolean>(false);

  const isFavorite = useMemo((): boolean => {
    return (
      getMoviesFavorite.data?.some((item) => item.id === movie.id) || false
    );
  }, [movie.id, getMoviesFavorite.data]);

  const handleFavorite = () => {
    if (!userInfo) {
      setAuth(true);
    }
    if (isFavorite) {
      deleteMoviesFavorite.mutate(movie.id);
    } else {
      addMoviesFavorite.mutate(movie.id);
    }
  };

  const loading = addMoviesFavorite.isPending || deleteMoviesFavorite.isPending;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const youTubeId = useMemo(
    () => getYouTubeId(movie.trailerYoutubeId || movie.trailerUrl),
    [movie.trailerYoutubeId, movie.trailerUrl],
  );

  const handlePlay = () => {
    setIsModalOpen((open) => !open);
  };

  if (isLoading || getMoviesFavorite.isLoading) return <Loader />;

  return (
    <div className={styles["home-page"]}>
      {statusAuth ? <div className={styles["home-page__overlay"]}></div> : ""}
      <div className={styles["home-page__info"]}>
        <div className={styles["home-page__main"]}>
          <span
            className={cn(
              styles["home-page__rating"],
              ratingToneClass[colorRating(movie.tmdbRating)],
            )}
          >
            <span className={styles["home-page__rating-icon"]}></span>
            {movie.tmdbRating.toFixed(1)}
          </span>
          <span className={styles["home-page__year"]}>{movie.releaseYear}</span>
          <span className={styles["home-page__genre"]}>{movie.genres[0]}</span>
          <span className={styles["home-page__timeWatch"]}>
            {formatRuntime(movie.runtime)}
          </span>
        </div>
        <h1 className={styles["home-page__title"]}>{movie.title}</h1>
        <p className={styles["home-page__description"]}>{movie.plot}</p>
        <div className={styles["home-page__interactive"]}>
          <Button
            onClick={handlePlay}
            className={cn(
              "button",
              styles["home-page__trailer"],
              !componentHome && styles.grid2,
            )}
            aria-label="включить трейлер"
          >
            Трейлер
          </Button>
          {componentHome ? (
            <Link
              to={`/movie/${movie.id}`}
              className={cn("button", styles["home-page__info-btn"])}
              aria-label="информация о фильме"
            >
              О&nbsp;фильме
            </Link>
          ) : (
            ""
          )}
          <Button
            className={cn("button", styles["home-page__favorites-btn"])}
            aria-label="добавить в избранное"
            onClick={handleFavorite}
            isLoading={loading}
          >
            {isFavorite ? (
              <IconFill className={styles["home-page__favorites-icon"]} />
            ) : (
              <IconBorder className={styles["home-page__favorites-icon"]} />
            )}
          </Button>
          {componentHome ? (
            <Button
              className={cn("button", styles["home-page__film-random"])}
              aria-label="запросить случайный фильм"
              onClick={() => {
                queryClient.invalidateQueries({
                  queryKey: queryKeys.randomMovie,
                });
              }}
            >
              <RandomIcon
                className={cn("button", styles["home-page__random-icon"])}
              />
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={styles["home-page__picture"]}>
        <img
          className={styles["home-page__img-home"]}
          src={movie?.posterUrl || ""}
          alt="Постер фильма"
          width={680}
          height={552}
        />
      </div>
      <Suspense fallback={<Loader />}>
        <ModalTrailer
          open={isModalOpen}
          onClose={handlePlay}
          videoId={youTubeId}
        />
      </Suspense>
      {statusAuth ? (
        <Suspense fallback={<Loader />}>
          <AuthForm isOpen={statusAuth} onClose={setAuth} />
        </Suspense>
      ) : null}
    </div>
  );
};
