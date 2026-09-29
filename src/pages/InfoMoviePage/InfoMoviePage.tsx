import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/api/queryKeys";
import { getMovieIndex } from "@/modules/movies/api/getMovies";
import { BannerHome, InfoMovie } from "@/modules/movies";
import { Loader } from "@/shared/ui/Loader";
import { useParams } from "react-router-dom";
import styles from "./InfoMoviePage.module.scss";

export const InfoMoviePage = () => {
  const { id } = useParams();
  const idMovieUse = useQuery({
    queryKey: queryKeys.movie(id ?? ""),
    queryFn: () => getMovieIndex(Number(id)),
    enabled: !!id,
  });

  const movie = idMovieUse.data;
  if (idMovieUse.isLoading) return <Loader />;
  if (!movie) return <Loader text="Данные не найдены" />;

  return (
    <section className={styles["info-page"]}>
      <BannerHome movie={movie} componentHome={false} isLoading={false} />
      <InfoMovie movie={movie} />
    </section>
  );
};
