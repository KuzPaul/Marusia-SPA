import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../api/queryKeys";
import { getGenres } from "../../api/getMovies";
import { Loader } from "../../Components/UI/Loader/";
import "./GenresPage.scss";
import { Link } from "react-router-dom";
import { GENRE_IMAGES } from "../../constants/genres";
import { GENRE_TRANSLATIONS } from "../../constants/genres";

export const GenresPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.genres,
    queryFn: () => getGenres(),
  });

  if (isLoading) return <Loader />;
  if (!data) return <Loader text="Жанров нет" />;

  return (
    <section className="genres">
      <h1 className="genres__title">Жанры фильмов</h1>
      <ul className="genres__list">
        {data.map((genre, index) => (
          <li key={index} className="genres__item">
            <Link to={`/genre/${genre}`} className="genres__link">
              <img
                className="genres__img"
                src={GENRE_IMAGES[genre]}
                alt="Изображение жанра"
              />
              <span className="genres__name">{GENRE_TRANSLATIONS[genre]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
