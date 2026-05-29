import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../api/queryKeys";
import { getMovieIndex } from "../../api/getMovies";
import { BannerHome } from "../../Components/BannerHome";
import { Loader } from "../../Components/UI/Loader";
import { InfoMovie } from "../../Components/InfoMovie";
import "./InfoMoviePage.scss";
import { useParams } from "react-router-dom";

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
    <section className="info-page">
      <BannerHome movie={movie} componentHome={false} isLoading={false} />
      <InfoMovie movie={movie} />
    </section>
  );
};
