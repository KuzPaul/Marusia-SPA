import { lazy, Suspense, useMemo, useState, type FC } from "react";
import { Button } from "../UI/Button";
import { formatRuntime } from "../../utils/convertRunTime";
import "./BannerHome.scss";
import { colorRating } from "../../utils/colorRating";
import IconFill from "../../assets/icons/favoriteFilm.svg?react";
import IconBorder from "../../assets/icons/likeFilm.svg?react";
import RandomIcon from "../../assets/icons/randomFilm.svg?react";
import { queryKeys } from "../../api/queryKeys";
import { queryClient } from "../../utils/queryClient";
import { Loader } from "../UI/Loader";
import { Link } from "react-router-dom";
import type { Movie } from "../../types/moviesTypes";
import { useFavorite } from "../../hooks/useFavorite";
import { useUser } from "../../hooks/useUser";
import { getYouTubeId } from "../../utils/getYouTubeId";

const AuthForm = lazy(() => import("../AuthForm"));
const ModalTrailer = lazy(() => import("../UI/ModalTrailer"));

interface BannerProps {
  movie: Movie;
  isLoading: boolean;
  componentHome: boolean;
}

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

  //трейлер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const youTubeId = useMemo(
    () => getYouTubeId(movie.trailerYoutubeId || movie.trailerUrl),
    [movie.trailerYoutubeId],
  );

  const handlePlay = () => {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
  };

  if (isLoading || getMoviesFavorite.isLoading) return <Loader />;

  return (
    <div className="home-page">
      {statusAuth ? <div className="home-page__overlay"></div> : ""}
      <div className="home-page__info">
        <div className="home-page__main">
          <span
            className={`home-page__rating ${colorRating(movie.tmdbRating)}`}
          >
            <span className="home-page__rating-icon"></span>
            {movie.tmdbRating.toFixed(1)}
          </span>
          <span className="home-page__year">{movie.releaseYear}</span>
          <span className="home-page__genre">{movie.genres[0]}</span>
          <span className="home-page__timeWatch">
            {formatRuntime(movie.runtime)}
          </span>
        </div>
        <h1 className="home-page__title">{movie.title}</h1>
        <p className="home-page__description">{movie.plot}</p>
        <div className="home-page__interactive">
          <Button
            onClick={() => handlePlay()}
            className={`button home-page__trailer ${!componentHome ? "grid2" : ""}`}
            aria-label="включить трейлер"
          >
            Трейлер
          </Button>
          {componentHome ? (
            <Link
              to={`/movie/${movie.id}`}
              className={"button home-page__info-btn"}
              aria-label="информация о фильме"
            >
              О&nbsp;фильме
            </Link>
          ) : (
            ""
          )}
          <Button
            className={"button home-page__favorites-btn"}
            aria-label="добавить в избранное"
            onClick={handleFavorite}
            isLoading={loading}
          >
            {isFavorite ? (
              <IconFill className={"home-page__favorites-icon"} />
            ) : (
              <IconBorder className={"home-page__favorites-icon"} />
            )}
          </Button>
          {componentHome ? (
            <Button
              className={"button home-page__film-random"}
              aria-label="запросить случайный фильм"
              onClick={() => {
                queryClient.invalidateQueries({ queryKey: queryKeys.randomMovie });
              }}
            >
              <RandomIcon className={"button home-page__random-icon"} />
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="home-page__picture">
        <img
          className="home-page__img-home"
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
      <Suspense fallback={<Loader />}>
        <AuthForm isOpen={statusAuth} onClose={setAuth} />;
      </Suspense>
    </div>
  );
};
