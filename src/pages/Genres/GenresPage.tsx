import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/api/queryKeys";
import { getGenres } from "@/modules/movies/api/getMovies";
import { Loader } from "@/shared/ui/Loader";
import { Link } from "react-router-dom";
import { GENRE_IMAGES, GENRE_TRANSLATIONS } from "@/shared/constants/genres";
import styles from "./GenresPage.module.scss";

export const GenresPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.genres,
    queryFn: () => getGenres(),
  });

  if (isLoading) return <Loader />;
  if (!data) return <Loader text="Жанров нет" />;

  return (
    <section className={styles.genres}>
      <h1 className={styles.genres__title}>Жанры фильмов</h1>
      <ul className={styles.genres__list}>
        {data.map((genre, index) => (
          <li key={index} className={styles.genres__item}>
            <Link to={`/genre/${genre}`} className={styles.genres__link}>
              <img
                className={styles.genres__img}
                src={GENRE_IMAGES[genre]}
                alt={GENRE_TRANSLATIONS[genre] ?? genre}
              />
              <span className={styles.genres__name}>
                {GENRE_TRANSLATIONS[genre]}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
